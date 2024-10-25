package dev.rockyj.todopro.controllers.errors

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.ServletWebRequest
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler


@RestControllerAdvice
class GlobalExceptionHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(IllegalAccessException::class)
    fun handleIllegalAccessException(
        ex: IllegalAccessException, request: WebRequest
    ): ResponseEntity<ErrorResponse> {
        val error = ErrorResponse(
            ex.message!!,
            "Illegal Access",
            HttpStatus.BAD_REQUEST.value(),
            (request as ServletWebRequest).request.requestURI
        )
        return ResponseEntity(error, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleResourceNotFoundException(
        ex: ResourceNotFoundException, request: WebRequest
    ): ResponseEntity<ErrorResponse> {
        val error = ErrorResponse(
            ex.message!!,
            "Not Found",
            HttpStatus.NOT_FOUND.value(),
            (request as ServletWebRequest).request.requestURI
        )
        return ResponseEntity(error, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(Exception::class)
    fun handleAllUncaughtException(
        ex: Exception, request: WebRequest
    ): ResponseEntity<ErrorResponse> {
        val error = ErrorResponse(
            "An unexpected error occurred",
            ex.message!!,
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            (request as ServletWebRequest).request.requestURI
        )
        return ResponseEntity(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
