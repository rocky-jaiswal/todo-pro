package dev.rockyj.todopro.controllers

import dev.rockyj.todopro.commands.TaskListCommand
import dev.rockyj.todopro.controllers.requests.TaskListCreateRequest
import dev.rockyj.todopro.controllers.requests.TaskListEditRequest
import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.TaskListDTO
import dev.rockyj.todopro.domain.dtos.UpdatedTaskListDTO

import jakarta.validation.Valid
import jakarta.validation.constraints.NotNull
import org.slf4j.LoggerFactory
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import java.util.*

@Validated
@RestController
@RequestMapping("/v1/task-lists")
class TaskListsController(val command: TaskListCommand) {

    private val log = LoggerFactory.getLogger(TaskListsController::class.java)

    private fun getUserIdFromSecurityContext(): UUID {
        val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
        return UUID.fromString(jwt.subject)
    }

    @GetMapping("/")
    fun findAll(): List<TaskListDTO> {
        val userId = getUserIdFromSecurityContext()
        return command.findAllTaskListsForUser(userId)
    }

    @GetMapping("/{id}")
    fun findList(@PathVariable("id") @NotNull listId: UUID): TaskListDTO {
        val userId = getUserIdFromSecurityContext()
        return command.findTaskListByIdAndUserId(userId, listId)
    }

    @GetMapping("/{id}/tasks/")
    fun findAllTasksForList(@PathVariable("id") @NotNull listId: UUID): List<TaskDTO> {
        val userId = getUserIdFromSecurityContext()
        return command.findAllTasksForUserAndList(userId, listId)
    }

    @PostMapping("/")
    fun createTaskList(@Valid @RequestBody taskListCreateRequest: TaskListCreateRequest): Map<String, String> {
        val userId = getUserIdFromSecurityContext()

        val list = command.createTaskList(userId, taskListCreateRequest.name, taskListCreateRequest.description)
        return mapOf(Pair("id", list.id!!.toString()))
    }

    @PutMapping("/{id}/")
    fun editTaskList(@PathVariable("id") @NotNull listId: UUID, @Valid @RequestBody taskListEditRequest: TaskListEditRequest): TaskListDTO {
        val userId = getUserIdFromSecurityContext()

        return command.editTaskList(
            userId,
            UpdatedTaskListDTO(listId, taskListEditRequest.name, taskListEditRequest.description)
        )
    }

    @DeleteMapping("/{id}/")
    fun deleteList(@PathVariable("id") @NotNull listId: UUID): Map<String, String> {
        val userId = getUserIdFromSecurityContext()
        command.deleteTaskListByUserIdAndId(userId, listId)
        return mapOf(Pair("id", listId.toString()))
    }
}
