package dev.rockyj.todopro.repositories

import dev.rockyj.todopro.TestcontainersConfiguration
import dev.rockyj.todopro.domain.entities.User
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import java.util.*
import kotlin.jvm.optionals.getOrNull
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@Import(TestcontainersConfiguration::class)
@SpringBootTest
class UsersRepositoryTest(@Autowired val usersRepository: UsersRepository) {

    @BeforeEach
    fun dbCleanUp() {
        usersRepository.deleteAll()
    }

    @Test
    fun shouldCreateUser() {
        val user = User().apply {
            id = UUID.randomUUID()
        }
        usersRepository.save(user)

        val records = usersRepository.findAll().toList()
        assertTrue(records.size == 1)
        assertTrue(records.first().id is UUID)
    }

    @Test
    fun shouldFindUserById() {
        val user = usersRepository.save(User().apply {
            id = UUID.randomUUID()
        })

        val record = usersRepository.findById(user.id)
        assertTrue(record.isPresent)
    }

    @Test
    fun shouldHaveAnId() {
        val user = usersRepository.save(User().apply {
            id = UUID.randomUUID()
        })

        val record = usersRepository.findById(user.id).get()
        assertTrue(record.id != null)
    }

    @Test
    fun shouldNotGenerateAnIdIfProvided() {
        val randomId = UUID.randomUUID()
        usersRepository.save(User().apply { id = randomId })

        val record = usersRepository.findById(randomId).getOrNull()
        assertEquals(randomId, record?.id)
    }
}