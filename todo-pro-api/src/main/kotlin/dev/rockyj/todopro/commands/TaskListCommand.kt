package dev.rockyj.todopro.commands

import dev.rockyj.todopro.domain.dtos.TaskListDTO
import dev.rockyj.todopro.services.TaskListService
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskListCommand (val listService: TaskListService) {

    fun findAllTaskListsForUser(userId: UUID): List<TaskListDTO> {
        return listService.findByUserId(userId)
    }

    fun createTaskList(userId: UUID, listName: String, listDescription: String?): TaskListDTO {
        val dto = listService.createTaskList(userId, listName, listDescription)
        return dto
    }
}