package dev.rockyj.todopro.domain.entities

import dev.rockyj.todopro.domain.dtos.UserDTO
import jakarta.persistence.*
import org.hibernate.Hibernate
import java.io.Serializable
import java.util.*

@Entity
@Table(name = "users")
class User: Serializable {

    @Id
    @Column(name="id", nullable = false)
    lateinit var id: UUID

    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    var taskLists: List<TaskList> = emptyList()

    fun toDTO(): UserDTO {
        return UserDTO(this.id)
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as User

        return id == other.id
    }

    override fun hashCode(): Int = id.hashCode()
}
