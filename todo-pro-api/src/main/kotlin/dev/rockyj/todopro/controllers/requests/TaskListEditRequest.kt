package dev.rockyj.todopro.controllers.requests

import jakarta.validation.constraints.NotBlank

data class TaskListEditRequest(@NotBlank val name: String,
                               val description: String?)
