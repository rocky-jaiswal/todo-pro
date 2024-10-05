package dev.rockyj.todopro.controllers.requests

import jakarta.validation.constraints.NotBlank
import java.util.UUID

data class UserRequest(@NotBlank var userId: UUID) {
}
