package dev.rockyj.todopro.domain.dtos

import java.util.UUID

data class TaskRequestDTO(val userId: UUID,
                          val listId: UUID,
                          val name: String,
                          val description: String?,
                          val dueBy: String?)