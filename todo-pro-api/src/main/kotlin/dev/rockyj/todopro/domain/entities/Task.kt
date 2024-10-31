package dev.rockyj.todopro.domain.entities

import dev.rockyj.todopro.domain.dtos.TaskDTO
import dev.rockyj.todopro.domain.dtos.UserDTO
import jakarta.persistence.*
import org.hibernate.Hibernate
import java.io.Serializable
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "tasks")
class Task: Serializable {
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

    @Column(name = "due_by")
    var dueBy: LocalDate? = null

    @Column(name = "created_at")
    var createdAt: LocalDateTime? = null

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime? = null

    @ManyToOne
    @JoinColumn(name = "tasklist_id")
    var taskList: TaskList? = null

    @ManyToOne
    @JoinColumn(name = "user_id")
    var user: User? = null

    fun toDTO(): TaskDTO {
        return TaskDTO(
            this.id,
            this.name!!,
            this.description,
            this.completed ?: false,
            this.dueBy)
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Task

        return id == other.id
    }

    override fun hashCode(): Int = id.hashCode()
}
