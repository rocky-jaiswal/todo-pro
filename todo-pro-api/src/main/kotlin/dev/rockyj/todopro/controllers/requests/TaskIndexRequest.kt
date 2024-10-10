package dev.rockyj.todopro.controllers.requests

import jakarta.validation.constraints.NotBlank
import java.util.UUID

data class TaskIndexRequest(@NotBlank var listId: UUID) {
}