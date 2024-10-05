package dev.rockyj.todopro.domain.dtos

import java.time.LocalDateTime
import java.util.*

data class TaskDTO(
    val id: UUID,
    val name: String,
    val description: String?,
    val completed: Boolean,
    val dueBy: LocalDateTime?,
    val user: UserDTO,
    val taskList: TaskListDTO)
