package dev.rockyj.todopro

import org.springframework.boot.fromApplication
import org.springframework.boot.with


fun main(args: Array<String>) {
	fromApplication<TodoproApplication>().with(TestcontainersConfiguration::class).run(*args)
}
