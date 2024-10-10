package dev.rockyj.todopro.controllers

import dev.rockyj.todopro.commands.TaskListCommand
import dev.rockyj.todopro.controllers.requests.TaskListCreateRequest
import dev.rockyj.todopro.domain.dtos.TaskListDTO
import jakarta.validation.Valid

import org.slf4j.LoggerFactory
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

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

    @PostMapping("/")
    fun createTaskList(@Valid @RequestBody taskListCreateRequest: TaskListCreateRequest): Map<String, String> {
        val userId = getUserIdFromSecurityContext()

        val list = command.createTaskList(userId, taskListCreateRequest.name, taskListCreateRequest.description)
        return mapOf(Pair("id", list.id!!.toString()))
    }
}
