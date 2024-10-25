package dev.rockyj.todopro.services

import dev.rockyj.todopro.configuration.CheckOwnership
import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.TaskRequestDTO
import dev.rockyj.todopro.domain.entities.Task
import dev.rockyj.todopro.repositories.TaskListsRepository
import dev.rockyj.todopro.repositories.TasksRepository
import dev.rockyj.todopro.repositories.UsersRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

@Service
class TaskService(
    val usersRepository: UsersRepository,
    val taskListsRepository: TaskListsRepository,
    val tasksRepository: TasksRepository
) {

    fun createTask(taskRequestDTO: TaskRequestDTO): TaskDTO {
        val usr = usersRepository.findById(taskRequestDTO.userId)
        val list = taskListsRepository.findByIdAndUserId(taskRequestDTO.listId, taskRequestDTO.userId)

        if (usr.isEmpty) {
            throw RuntimeException("user not found while creating task")
        }

        if (list.isEmpty) {
            throw RuntimeException("list not found while creating task")
        }

        val task = Task().apply {
            name = taskRequestDTO.name
            description = taskRequestDTO.description
            dueBy = if (taskRequestDTO.dueBy != null)
                LocalDate.parse(taskRequestDTO.dueBy, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                else null
            completed = false
            taskList = list.get()
            user = usr.get()
        }

        val record = tasksRepository.save(task)
        return record.toDTO()
    }

    @CheckOwnership(resoourceName = "taskList")
    fun findByUserIdAndListId(userId: UUID, listId: UUID): List<TaskDTO> {
        val tasks = tasksRepository.findAllByUserIdAndTaskListId(userId, listId)

        return tasks.map { it.toDTO() }
    }

    @CheckOwnership(resoourceName = "task")
    fun deleteTaskByUserIdAndId(userId: UUID, taskId: UUID) {
        val task = tasksRepository.findByIdAndUserId(taskId, userId)

        tasksRepository.delete(task.get())
    }

    @CheckOwnership(resoourceName = "task")
    fun markTaskAsCompelete(userId: UUID, taskId: UUID): TaskDTO {
        val task = tasksRepository.findByIdAndUserId(taskId, userId)

        val updatedTask = task.get().apply {
            completed = true
        }

        val record = tasksRepository.save(updatedTask)
        return record.toDTO()
    }
}