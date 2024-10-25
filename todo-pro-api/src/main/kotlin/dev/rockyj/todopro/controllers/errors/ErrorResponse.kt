package dev.rockyj.todopro.controllers.errors

import java.time.LocalDateTime


class ErrorResponse(
    val message: String,
    val error: String,
    val status: Int,
    val path: String
) {
    private val timestamp: LocalDateTime = LocalDateTime.now()
}