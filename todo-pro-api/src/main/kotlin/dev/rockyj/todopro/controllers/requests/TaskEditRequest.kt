package dev.rockyj.todopro.controllers.requests

import jakarta.validation.constraints.NotBlank

data class TaskEditRequest(@NotBlank val name: String,
                           val description: String?,
                           val dueBy: String?)
