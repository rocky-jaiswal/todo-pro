package dev.rockyj.todopro.repositories

import dev.rockyj.todopro.TestcontainersConfiguration
import dev.rockyj.todopro.domain.entities.Task
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
class TaskRepositoryTest(
    @Autowired val taskListRepository: TaskListsRepository,
    @Autowired val usersRepository: UsersRepository,
    @Autowired val tasksRepository: TasksRepository
) {

    @BeforeEach
    fun dbCleanUp() {
        usersRepository.deleteAll()
        taskListRepository.deleteAll()
        tasksRepository.deleteAll()
    }

    @Test
    fun shouldFindByUserIdAndListId_Empty() {
        val userId = UUID.randomUUID()

        val usr = usersRepository.save(User().apply {
            id = userId
        })

        val list = taskListRepository.save(TaskList().apply {
            name = "dummy list"
            user = usr
        })

        val records = tasksRepository.findAllByUserAndTaskList(usr, list)
        assertTrue { records.isEmpty() }
    }

    @Test
    fun shouldFindByUserIdAndListId_NotEmpty() {
        val userId = UUID.randomUUID()

        val usr = usersRepository.save(User().apply {
            id = userId
        })

        val list = taskListRepository.save(TaskList().apply {
            name = "dummy list"
            user = usr
        })

        tasksRepository.save(Task().apply {
            name = "foo"
            user = usr
            taskList = list
        })

        val records = tasksRepository.findAllByUserAndTaskList(usr, list)
        assertTrue { records.size == 1 }
    }
}