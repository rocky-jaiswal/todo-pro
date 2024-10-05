package dev.rockyj.todopro.domain.entities

import jakarta.persistence.*
import org.hibernate.Hibernate
import java.util.*

@Entity
@Table(name = "users")
class User {

    @Id
    @Column(name="id", nullable = false)
    lateinit var id: UUID

    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    var taskLists: List<TaskList> = emptyList()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as User

        return id == other.id
    }

    override fun hashCode(): Int = id.hashCode()
}
