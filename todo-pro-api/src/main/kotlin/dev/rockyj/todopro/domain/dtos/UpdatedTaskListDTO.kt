package dev.rockyj.todopro.domain.dtos

import java.util.*

data class UpdatedTaskListDTO(val listId: UUID,
                              val name: String,
                              val description: String?)
