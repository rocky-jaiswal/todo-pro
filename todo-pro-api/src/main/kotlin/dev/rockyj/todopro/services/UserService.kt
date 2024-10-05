package dev.rockyj.todopro.services

import dev.rockyj.todopro.domain.dtos.UserDTO
import dev.rockyj.todopro.domain.entities.User
import dev.rockyj.todopro.repositories.UsersRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(val usersRepository: UsersRepository) {

    fun findUserById(userId: UUID): UserDTO? {
        val user = usersRepository.findById(userId)

        return if (user.isEmpty) {
            null
        } else {
            UserDTO(user.get().id!!)
        }
    }

    fun createUser(userId: UUID): UserDTO {
        val user = User().apply {
            id = userId
        }

        val userRecord = usersRepository.save(user)
        return UserDTO(userRecord.id!!)
    }
}