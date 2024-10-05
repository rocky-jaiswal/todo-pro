package dev.rockyj.todopro.domain.entities

import jakarta.persistence.*
import org.hibernate.Hibernate
import java.util.*

@Entity
@Table(name = "task_lists")
class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    lateinit var id: UUID

    @Column(columnDefinition = "TEXT")
    var name: String? = null

    @Column(columnDefinition = "TEXT")
    var description: String? = null

    @Column
    var completed: Boolean? = false

    @OneToMany(mappedBy = "taskList", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    var tasks: List<Task> = emptyList()

    @ManyToOne
    @JoinColumn(name = "user_id")
    var user: User? = null

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as TaskList

        return id == other.id
    }

    override fun hashCode(): Int = id.hashCode()
}
