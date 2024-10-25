package dev.rockyj.todopro.configuration

import java.util.UUID

object MDCConstants {
    const val CORRELATION_ID: String = "correlationId"
    const val REQUEST_METHOD: String = "requestMethod"
    const val REQUEST_URI: String = "requestUri"
    const val REQUEST_REMOTE_HOST: String = "remoteHost"
    const val REQUEST_USER_AGENT: String = "userAgent"
    const val USER: String = "user"

    fun generateCorrelationId(): String {
        return UUID.randomUUID().toString()
    }
}