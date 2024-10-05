package dev.rockyj.todopro.commands

import dev.rockyj.todopro.domain.dtos.UserDTO
import dev.rockyj.todopro.services.UserService
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class UserCommand(val userService: UserService) {

    fun findOrCreateUser(userId: UUID): UserDTO {
        return userService.findUserById(userId) ?: userService.createUser(userId)
    }
}