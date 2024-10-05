package dev.rockyj.todopro.repositories

import dev.rockyj.todopro.domain.entities.User
import org.springframework.stereotype.Repository
import org.springframework.data.repository.CrudRepository
import java.util.*

@Repository
interface UsersRepository : CrudRepository<User, UUID> {
}