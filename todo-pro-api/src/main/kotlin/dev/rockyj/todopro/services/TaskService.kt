package dev.rockyj.todopro.services

import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.TaskRequestDTO
import dev.rockyj.todopro.domain.entities.Task
import dev.rockyj.todopro.repositories.TaskListsRepository
import dev.rockyj.todopro.repositories.TasksRepository
import dev.rockyj.todopro.repositories.UsersRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskService(
    val usersRepository: UsersRepository,
    val taskListsRepository: TaskListsRepository,
    val tasksRepository: TasksRepository
) {

    fun findByUserIdAndListId(userId: UUID, listId: UUID): List<TaskDTO> {
        val user = usersRepository.findById(userId)
        val list = taskListsRepository.findByIdAndUserId(listId, userId)

        if (user.isEmpty) {
            throw RuntimeException("user not found while listing tasks")
        }

        if (list.isEmpty) {
            throw RuntimeException("list not found while listing tasks")
        }

        val tasks = tasksRepository.findAllByUserAndTaskList(user.get(), list.get())

        return tasks.map { it.toDTO() }
    }

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
            dueBy = taskRequestDTO.dueBy
            completed = false
            taskList = list.get()
            user = usr.get()
        }

        val record = tasksRepository.save(task)
        return record.toDTO()
    }
}