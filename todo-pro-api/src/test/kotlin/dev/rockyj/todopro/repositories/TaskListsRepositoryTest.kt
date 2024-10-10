package dev.rockyj.todopro.repositories

import dev.rockyj.todopro.TestcontainersConfiguration
import dev.rockyj.todopro.domain.entities.TaskList
import dev.rockyj.todopro.domain.entities.User
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import java.util.*
import kotlin.test.assertTrue

@Import(TestcontainersConfiguration::class)
@SpringBootTest
class TaskListsRepositoryTest(
    @Autowired val taskListRepository: TaskListsRepository,
    @Autowired val usersRepository: UsersRepository
) {

    @BeforeEach
    fun dbCleanUp() {
        usersRepository.deleteAll()
        taskListRepository.deleteAll()
    }

    @Test
    fun shouldFindByUserId() {
        val userId = UUID.randomUUID()

        val user = usersRepository.save(User().apply {
            id = userId
        })

        val list = taskListRepository.findAllByUser(user)
        assertTrue { list.isEmpty() }
    }

    @Test
    fun shouldFindByUserIdAndListId() {
        val userId = UUID.randomUUID()

        val usr = usersRepository.save(User().apply {
            id = userId
        })

        val list = taskListRepository.save(TaskList().apply {
            name = "dummy list"
            user = usr
        })

        assertTrue { list.id != null }

        val record = taskListRepository.findByIdAndUserId(list.id, userId)
        assertTrue { record.isPresent }
        assertTrue { record.get().name == "dummy list" }
    }
}