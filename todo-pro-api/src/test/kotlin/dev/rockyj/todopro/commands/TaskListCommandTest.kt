package dev.rockyj.todopro.commands

import dev.rockyj.todopro.TestcontainersConfiguration
import dev.rockyj.todopro.domain.dtos.UpdatedTaskListDTO
import dev.rockyj.todopro.domain.entities.TaskList
import dev.rockyj.todopro.domain.entities.User
import dev.rockyj.todopro.repositories.TaskListsRepository
import dev.rockyj.todopro.repositories.UsersRepository
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import java.util.*
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

@Import(TestcontainersConfiguration::class)
@SpringBootTest
class TaskListCommandTest(@Autowired val taskListRepository: TaskListsRepository,
                          @Autowired val usersRepository: UsersRepository,
                          @Autowired val taskListCommand: TaskListCommand
) {
    @BeforeEach
    fun dbCleanUp() {
        usersRepository.deleteAll()
        taskListRepository.deleteAll()
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

        assertNotNull(list.id)

        val record = taskListCommand.findAllTaskListsForUser(userId)
        assertTrue { record.size == 1 }
    }

    @Test
    fun shouldRaiseErrorIfAccessNotAllowed() {
        val userId = UUID.randomUUID()

        val usr = usersRepository.save(User().apply {
            id = userId
        })

        val list = taskListRepository.save(TaskList().apply {
            name = "dummy list"
            user = usr
        })

        assertThrows<IllegalAccessException> { taskListCommand.findTaskListByIdAndUserId(list.id, UUID.randomUUID()) }
    }

    @Test
    fun shouldRaiseErrorIfListIsNotOwned_List() {
        val userId = UUID.randomUUID()
        val userId2 = UUID.randomUUID()

        val usr = usersRepository.save(User().apply {
            id = userId
        })

        usersRepository.save(User().apply {
            id = userId2
        })

        val list = taskListRepository.save(TaskList().apply {
            name = "dummy list"
            user = usr
        })

        assertThrows<IllegalAccessException> { taskListCommand.findTaskListByIdAndUserId(userId2, list.id) }
    }

    @Test
    fun shouldRaiseErrorIfListIsNotOwned_Edit() {
        val userId = UUID.randomUUID()
        val userId2 = UUID.randomUUID()

        val usr = usersRepository.save(User().apply {
            id = userId
        })

        usersRepository.save(User().apply {
            id = userId2
        })

        val list = taskListRepository.save(TaskList().apply {
            name = "dummy list"
            user = usr
        })

        assertThrows<IllegalAccessException> {
            taskListCommand.editTaskList(userId2, UpdatedTaskListDTO(list.id, "new name", "new desc"))
        }
    }
}