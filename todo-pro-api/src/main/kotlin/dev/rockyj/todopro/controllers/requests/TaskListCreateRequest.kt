package dev.rockyj.todopro.controllers.requests

import jakarta.validation.constraints.NotBlank

data class TaskListCreateRequest(@NotBlank var name: String, var description: String?) {
}