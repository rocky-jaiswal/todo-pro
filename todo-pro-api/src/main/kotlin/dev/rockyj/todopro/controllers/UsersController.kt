package dev.rockyj.todopro.controllers

import dev.rockyj.todopro.commands.UserCommand
import dev.rockyj.todopro.controllers.requests.UserRequest
import dev.rockyj.todopro.domain.dtos.UserDTO

import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.security.authorization.AuthorizationDeniedException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/v1/users")
class UsersController(val command: UserCommand) {

    private val log = LoggerFactory.getLogger(UsersController::class.java)

    private fun getUserIdFromSecurityContext(): UUID {
        val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
        return UUID.fromString(jwt.subject)
    }

    @PostMapping("/")
    // can also inject - @AuthenticationPrincipal jwt: Jwt
    fun findOrCreateUser(@Valid @RequestBody userRequest: UserRequest): UserDTO {
        if (getUserIdFromSecurityContext().toString() != userRequest.userId.toString()) {
            throw AuthorizationDeniedException("not allowed") { false }
        }

        log.info("request to find or create user - $userRequest")

        val user = command.findOrCreateUser(userRequest.userId)
        return user
    }
}