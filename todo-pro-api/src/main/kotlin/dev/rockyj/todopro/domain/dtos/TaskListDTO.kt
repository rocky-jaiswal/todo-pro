package dev.rockyj.todopro.domain.dtos

import java.util.UUID

data class TaskListDTO(
    val id: UUID?,
    val name: String,
    val description: String?,
    val user: UserDTO)
