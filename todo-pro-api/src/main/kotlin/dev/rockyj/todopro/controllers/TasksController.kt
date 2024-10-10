package dev.rockyj.todopro.controllers

import dev.rockyj.todopro.commands.TaskCommand
import dev.rockyj.todopro.controllers.requests.TaskCreateRequest
import dev.rockyj.todopro.controllers.requests.TaskIndexRequest
import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.TaskRequestDTO

import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
@RequestMapping("/v1/tasks")
class TasksController(val command: TaskCommand) {

    private val log = LoggerFactory.getLogger(TasksController::class.java)

    private fun getUserIdFromSecurityContext(): UUID {
        val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
        return UUID.fromString(jwt.subject)
    }

    @GetMapping("/")
    fun findAll(@Valid @RequestBody taskIndexRequest: TaskIndexRequest): List<TaskDTO> {
        val userId = getUserIdFromSecurityContext()

        return command.findAllTasksForUserAndList(userId, taskIndexRequest.listId)
    }

    @PostMapping("/")
    fun createTask(@Valid @RequestBody taskCreateRequest: TaskCreateRequest): Map<String, String> {
        val userId = getUserIdFromSecurityContext()

        val task = command.createTask(
            TaskRequestDTO(
                userId,
                taskCreateRequest.listId,
                taskCreateRequest.name,
                taskCreateRequest.description,
                taskCreateRequest.dueBy
            )
        )

        return mapOf(Pair("id", task.id!!.toString()))
    }
}