package dev.rockyj.todopro.controllers

import dev.rockyj.todopro.commands.UserCommand
import dev.rockyj.todopro.controllers.requests.UserRequest
import dev.rockyj.todopro.domain.dtos.UserDTO
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1/users")
class UsersController(val command: UserCommand) {

    private val log = LoggerFactory.getLogger(UsersController::class.java)

    @PostMapping("/")
    fun findOrCreateUser(@Valid @RequestBody userRequest: UserRequest): UserDTO {
        log.info("request to find or create user - $userRequest")
        val user = command.findOrCreateUser(userRequest.userId)
        return user
    }
}