package dev.rockyj.todopro.domain.dtos

import java.util.*

data class UpdatedTaskDTO(
    val taskId: UUID,
    val name: String,
    val description: String?,
    val dueBy: String?)
