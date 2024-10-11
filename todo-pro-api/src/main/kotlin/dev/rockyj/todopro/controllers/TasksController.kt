package dev.rockyj.todopro.controllers

import dev.rockyj.todopro.commands.TaskCommand
import dev.rockyj.todopro.controllers.requests.TaskCreateRequest
import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.TaskRequestDTO

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
@RequestMapping("/v1/tasks")
class TasksController(val command: TaskCommand) {

    private val log = LoggerFactory.getLogger(TasksController::class.java)

    private fun getUserIdFromSecurityContext(): UUID {
        val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
        return UUID.fromString(jwt.subject)
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

    @PostMapping("/{id}/completion/")
    fun markTaskAsComplete(@PathVariable("id") @NotNull taskId: UUID): TaskDTO {
        val userId = getUserIdFromSecurityContext()
        return command.markTaskAsComplete(userId, taskId)
    }

    @DeleteMapping("/{id}/")
    fun deleteList(@PathVariable("id") @NotNull taskId: UUID) {
        val userId = getUserIdFromSecurityContext()
        command.deleteTaskByUserIdAndId(userId, taskId)
    }
}