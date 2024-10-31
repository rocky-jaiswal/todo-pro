package dev.rockyj.todopro.repositories

import dev.rockyj.todopro.domain.entities.TaskList
import dev.rockyj.todopro.domain.entities.User
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskListsRepository : CrudRepository<TaskList, UUID> {
    @Query("select t from TaskList t where t.user = :user order by t.createdAt")
    fun findAllByUser(@Param("user") user: User): List<TaskList>

    fun findByIdAndUserId(listId: UUID, userId: UUID): Optional<TaskList>
}