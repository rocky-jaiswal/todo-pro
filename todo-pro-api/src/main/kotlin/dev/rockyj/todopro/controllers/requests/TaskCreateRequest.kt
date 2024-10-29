package dev.rockyj.todopro.controllers.requests

import jakarta.validation.constraints.NotBlank
import java.util.UUID

data class TaskCreateRequest(@NotBlank val listId: UUID,
                             @NotBlank var name: String,
                             var description: String?,
                             var dueBy: String?) {}