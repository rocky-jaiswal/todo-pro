package dev.rockyj.todopro.repositories

import dev.rockyj.todopro.domain.entities.Task
import dev.rockyj.todopro.domain.entities.TaskList
import dev.rockyj.todopro.domain.entities.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TasksRepository : CrudRepository<Task, UUID> {
    fun findAllByUserAndTaskList(user: User, list: TaskList): List<Task>

    fun findAllByUserIdAndTaskListIdOrderByCreatedAt(userId: UUID, listId: UUID): List<Task>

    fun findByIdAndUserId(taskId: UUID, userId: UUID): Optional<Task>
}