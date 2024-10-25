package dev.rockyj.todopro.configuration

import dev.rockyj.todopro.repositories.TaskListsRepository
import dev.rockyj.todopro.repositories.TasksRepository
import dev.rockyj.todopro.repositories.UsersRepository
import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.reflect.MethodSignature
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.*

@Aspect
@Component
class OwnershipAspect {

    @Autowired
    private val usersRepository: UsersRepository? = null

    @Autowired
    private val taskListsRepository: TaskListsRepository? = null

    @Autowired
    private val taskRepository: TasksRepository? = null

    @Around("@annotation(checkOwnership)")
    @Throws(Throwable::class)
    fun checkUserItemOwnership(joinPoint: ProceedingJoinPoint, checkOwnership: CheckOwnership): Any {
        val signature = joinPoint.signature as MethodSignature
        val parameterNames = signature.parameterNames
        val args = joinPoint.args

        var userId: UUID? = null

        if (checkOwnership.resoourceName == "taskList") {
            var listId: UUID? = null

            for (i in parameterNames.indices) {
                if ("userId" == parameterNames[i] && args[i] is UUID) {
                    userId = args[i] as UUID
                } else if ("listId" == parameterNames[i] && args[i] is UUID) {
                    listId = args[i] as UUID
                }
            }

            require(userId != null || listId != null) { "Method must have userId and listId parameters" }

            val user = usersRepository!!.findById(userId!!)

            if (user.isEmpty) {
                throw IllegalAccessException("user not found")
            }

            val record = taskListsRepository!!.findByIdAndUserId(listId!!, userId)

            if (record.isEmpty) {
                throw IllegalAccessException("resource does not belong to the user")
            }
        }

        if (checkOwnership.resoourceName == "task") {
            var taskId: UUID? = null

            for (i in parameterNames.indices) {
                if ("userId" == parameterNames[i] && args[i] is UUID) {
                    userId = args[i] as UUID
                } else if ("taskId" == parameterNames[i] && args[i] is UUID) {
                    taskId = args[i] as UUID
                }
            }

            require(userId != null || taskId != null) { "Method must have userId and taskId parameters" }

            val user = usersRepository!!.findById(userId!!)

            if (user.isEmpty) {
                throw IllegalAccessException("user not found")
            }

            val record = taskRepository!!.findByIdAndUserId(taskId!!, userId)

            if (record.isEmpty) {
                throw IllegalAccessException("resource does not belong to the user")
            }
        }

        return joinPoint.proceed()
    }
}

@Target(AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY_GETTER, AnnotationTarget.PROPERTY_SETTER)
@Retention(
    AnnotationRetention.RUNTIME
)
annotation class CheckOwnership(val resoourceName: String)