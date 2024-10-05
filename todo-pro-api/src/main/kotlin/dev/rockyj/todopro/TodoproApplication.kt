package dev.rockyj.todopro

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TodoproApplication

fun main(args: Array<String>) {
	runApplication<TodoproApplication>(*args)
}
