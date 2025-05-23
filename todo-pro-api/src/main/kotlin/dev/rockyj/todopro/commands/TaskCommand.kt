package dev.rockyj.todopro.commands

import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.TaskRequestDTO
import dev.rockyj.todopro.domain.dtos.UpdatedTaskDTO
import dev.rockyj.todopro.services.TaskService
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskCommand(val taskService: TaskService) {

    fun createTask(taskRequestDTO: TaskRequestDTO): TaskDTO {
        val task = taskService.createTask(taskRequestDTO)
        return task
    }

    fun deleteTaskByUserIdAndId(userId: UUID, taskId: UUID) {
        taskService.deleteTaskByUserIdAndId(userId, taskId)
    }

    fun markTaskAsComplete(userId: UUID, taskId: UUID): TaskDTO {
        val dto = taskService.markTaskAsCompelete(userId, taskId)
        return dto
    }

    fun editTask(userId: UUID, updatedTask: UpdatedTaskDTO): TaskDTO {
        val dto = taskService.editTask(userId, updatedTask.taskId, updatedTask)
        return dto
    }

}