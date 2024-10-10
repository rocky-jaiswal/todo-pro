package dev.rockyj.todopro.commands

import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.TaskRequestDTO
import dev.rockyj.todopro.services.TaskService
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class TaskCommand(val taskService: TaskService) {

    fun findAllTasksForUserAndList(userId: UUID, listId: UUID): List<TaskDTO> {
        val tasks = taskService.findByUserIdAndListId(userId, listId)
        return tasks
    }

    fun createTask(taskRequestDTO: TaskRequestDTO): TaskDTO {
        val task = taskService.createTask(taskRequestDTO)
        return task
    }

}