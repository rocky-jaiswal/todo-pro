package dev.rockyj.todopro.commands

import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.TaskListDTO
import dev.rockyj.todopro.services.TaskListService
import dev.rockyj.todopro.services.TaskService

import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskListCommand (val listService: TaskListService, val taskService: TaskService) {

    fun findAllTaskListsForUser(userId: UUID): List<TaskListDTO> {
        return listService.findByUserId(userId)
    }

    fun createTaskList(userId: UUID, listName: String, listDescription: String?): TaskListDTO {
        val dto = listService.createTaskList(userId, listName, listDescription)
        return dto
    }

    fun findTaskListByIdAndUserId(userId: UUID, listId: UUID): TaskListDTO {
        val tasks = listService.findByUserIdAndId(userId, listId)
        return tasks
    }

    fun findAllTasksForUserAndList(userId: UUID, listId: UUID): List<TaskDTO> {
        val tasks = taskService.findByUserIdAndListId(userId, listId)
        return tasks
    }

    fun deleteTaskListByUserIdAndId(userId: UUID, listId: UUID) {
        listService.deleteTaskListByUserIdAndId(userId, listId)
    }
}