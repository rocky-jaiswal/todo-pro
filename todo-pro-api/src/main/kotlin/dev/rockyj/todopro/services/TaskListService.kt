package dev.rockyj.todopro.services

import dev.rockyj.todopro.configuration.CheckOwnership
import dev.rockyj.todopro.domain.dtos.TaskListDTO
import dev.rockyj.todopro.domain.dtos.UpdatedTaskListDTO
import dev.rockyj.todopro.domain.dtos.UserDTO
import dev.rockyj.todopro.domain.entities.TaskList
import dev.rockyj.todopro.repositories.TaskListsRepository
import dev.rockyj.todopro.repositories.UsersRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskListService(val taskListsRepository: TaskListsRepository, val usersRepository: UsersRepository) {

    fun findByUserId(userId: UUID): List<TaskListDTO> {
        val user = usersRepository.findById(userId)

        if (user.isEmpty) {
            throw RuntimeException("user not found while finding list")
        }

        val taskLists = taskListsRepository.findAllByUser(user.get())

        return taskLists.map {
            TaskListDTO(
                it.id,
                it.name!!,
                it.description,
                UserDTO(it.user!!.id))
        }
    }

    fun createTaskList(userId: UUID, listName: String, listDescription: String?): TaskListDTO {
        val usr = usersRepository.findById(userId)

        if (usr.isEmpty) {
            throw IllegalAccessException("user not found while creating list")
        }

        val taskList = TaskList().apply {
            name = listName
            description = listDescription
            user = usr.get()
        }

        val savedList = taskListsRepository.save(taskList)

        return TaskListDTO(
            savedList.id,
            savedList.name!!,
            savedList.description,
            UserDTO(savedList.user!!.id)
        )
    }

    @CheckOwnership(resourceName = "taskList")
    fun findByUserIdAndId(userId: UUID, listId: UUID): TaskListDTO {
        val list = taskListsRepository.findByIdAndUserId(listId, userId)

        return list.get().toDTO()
    }

    @CheckOwnership(resourceName = "taskList")
    fun deleteTaskListByUserIdAndId(userId: UUID, listId: UUID): Map<String, String> {
        val list = taskListsRepository.findByIdAndUserId(listId, userId)

        taskListsRepository.delete(list.get())

        return mapOf(Pair("id", listId.toString()))
    }

    @CheckOwnership(resourceName = "taskList")
    fun editTaskList(userId: UUID, listId: UUID, updatedTaskListDTO: UpdatedTaskListDTO): TaskListDTO {
        val list = taskListsRepository.findByIdAndUserId(listId, userId)

        val updatedList = list.get().apply {
            name = updatedTaskListDTO.name
            description = updatedTaskListDTO.description
        }

        val record = taskListsRepository.save(updatedList)

        return record.toDTO()
    }
}