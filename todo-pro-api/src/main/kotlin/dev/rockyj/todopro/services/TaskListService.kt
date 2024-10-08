package dev.rockyj.todopro.services

import dev.rockyj.todopro.domain.dtos.TaskListDTO
import dev.rockyj.todopro.domain.dtos.UserDTO
import dev.rockyj.todopro.domain.entities.TaskList
import dev.rockyj.todopro.repositories.TaskListsRepository
import dev.rockyj.todopro.repositories.UsersRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskListService(val taskListRepository: TaskListsRepository, val usersRepository: UsersRepository) {

    fun findByUserId(userId: UUID): List<TaskListDTO> {
        val user = usersRepository.findById(userId)

        if (user.isEmpty) {
            throw RuntimeException("user not found while finding list")
        }

        val taskLists = taskListRepository.findAllByUser(user.get())

        return taskLists.map {
            TaskListDTO(it.id, it.name!!, it.description, it.completed ?: false, UserDTO(it.user!!.id))
        }
    }

    fun createTaskList(userId: UUID, listName: String, listDescription: String?): TaskListDTO {
        val usr = usersRepository.findById(userId)

        if (usr.isEmpty) {
            throw RuntimeException("user not found while creating list")
        }

        val taskList = TaskList().apply {
            name = listName
            description = listDescription
            user = usr.get()
        }

        val savedList = taskListRepository.save(taskList)

        return TaskListDTO(
            savedList.id,
            savedList.name!!,
            savedList.description,
            savedList.completed,
            UserDTO(savedList.user!!.id)
        )
    }
}