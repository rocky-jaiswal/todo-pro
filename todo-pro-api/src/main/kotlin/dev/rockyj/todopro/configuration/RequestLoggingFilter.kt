package dev.rockyj.todopro.configuration

import dev.rockyj.todopro.configuration.MDCConstants.generateCorrelationId
import jakarta.servlet.FilterChain
import jakarta.servlet.ReadListener
import jakarta.servlet.ServletException
import jakarta.servlet.ServletInputStream
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletRequestWrapper
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.util.StreamUtils
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.util.ContentCachingResponseWrapper
import java.io.*
import java.nio.charset.StandardCharsets
import java.util.*


internal class CachedBodyServletInputStream(cachedBody: ByteArray?) : ServletInputStream() {
    private val cachedBodyInputStream: InputStream = ByteArrayInputStream(cachedBody)

    override fun isFinished(): Boolean {
        try {
            return cachedBodyInputStream.available() == 0
        } catch (e: IOException) {
            LoggerFactory.getLogger(CachedBodyServletInputStream::class.java).debug("{}", e.message)
            throw IllegalStateException(e)
        }
    }

    override fun isReady(): Boolean {
        return true
    }

    override fun setReadListener(readListener: ReadListener) {
    }

    @Throws(IOException::class)
    override fun read(): Int {
        return cachedBodyInputStream.read()
    }
}

internal class CachedBodyHttpServletRequest(request: HttpServletRequest) :
    HttpServletRequestWrapper(request) {
    private val cachedBody: ByteArray

    init {
        val requestInputStream: InputStream = request.inputStream
        this.cachedBody = StreamUtils.copyToByteArray(requestInputStream)
    }

    override fun getInputStream(): ServletInputStream {
        return CachedBodyServletInputStream(this.cachedBody)
    }

    override fun getReader(): BufferedReader {
        val byteArrayInputStream = ByteArrayInputStream(this.cachedBody)
        return BufferedReader(InputStreamReader(byteArrayInputStream))
    }
}


// Filter for logging requests and responses
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class RequestLoggingFilter : OncePerRequestFilter() {
    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(
        httpRequest: HttpServletRequest,
        response: HttpServletResponse,
        chain: FilterChain
    ){
        try {
            setupMDC(httpRequest)

            // Skip logging for specific endpoints (like actuator)
            if (shouldSkipLogging(httpRequest)) {
                chain.doFilter(httpRequest, response)
                return
            }

            // Wrap the request to make it re-readable
            val cachedRequest = CachedBodyHttpServletRequest(httpRequest)

            // Create response wrapper to capture response body
            val responseWrapper = ContentCachingResponseWrapper(response)

            val startTime = System.currentTimeMillis()
            val requestBody = getRequestBody(cachedRequest)

            // Log request with MDC context
            log.info("Incoming Request - Body: {}", requestBody)

            // Process request
            chain.doFilter(cachedRequest, responseWrapper)

            // Calculate duration and add to MDC
            val duration = System.currentTimeMillis() - startTime
            MDC.put("duration", duration.toString())

            // Get and log response
            val responseBody = getResponseBody(responseWrapper)
            log.info(
                "Outgoing Response - Duration: {}ms - Body: {}",
                duration, responseBody
            )

            // Copy content to original response
            responseWrapper.copyBodyToResponse()
        } finally {
            MDC.clear()
        }

    }

    private fun setupMDC(request: HttpServletRequest) {
        // Get or generate correlation ID
        val correlationId: String = Optional.ofNullable(request.getHeader("x-correlation-id"))
            .orElse(generateCorrelationId())

        // Setup MDC context
        MDC.put(MDCConstants.CORRELATION_ID, correlationId)
        MDC.put(MDCConstants.REQUEST_METHOD, request.method)
        MDC.put(MDCConstants.REQUEST_URI, request.requestURI)
        MDC.put(MDCConstants.REQUEST_REMOTE_HOST, request.remoteHost)
        MDC.put(MDCConstants.REQUEST_USER_AGENT, request.getHeader("User-Agent"))


        // Add authenticated user if available
        Optional.ofNullable(SecurityContextHolder.getContext().authentication)
            .ifPresent { auth -> MDC.put(MDCConstants.USER, auth.getName()) }
    }

    private fun shouldSkipLogging(request: HttpServletRequest): Boolean {
        val path = request.requestURI
        return path.contains("/actuator") ||
                path.contains("/swagger") ||
                path.contains("/v3/api-docs")
    }

    private fun getRequestBody(request: CachedBodyHttpServletRequest): String {
        try {
            return StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8)
        } catch (e: IOException) {
            log.error("Error reading request body", e)
            return "Error reading request body"
        }
    }

    private fun getResponseBody(response: ContentCachingResponseWrapper): String {
        try {
            val responseBody = response.contentAsByteArray
            return String(responseBody, StandardCharsets.UTF_8)
        } catch (e: Exception) {
            log.error("Error reading response body", e)
            return "Error reading response body"
        }
    }

    companion object {
        private val log: Logger = LoggerFactory.getLogger(RequestLoggingFilter::class.java)
    }
}