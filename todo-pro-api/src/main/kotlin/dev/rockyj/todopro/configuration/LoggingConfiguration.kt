package dev.rockyj.todopro.configuration

import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class LoggingConfiguration {
    @Bean
    fun loggingFilter(): FilterRegistrationBean<RequestLoggingFilter> {
        val registrationBean =
            FilterRegistrationBean<RequestLoggingFilter>()
        registrationBean.filter = RequestLoggingFilter()
        registrationBean.addUrlPatterns("/api/*") // Configure URL patterns to log
        return registrationBean
    }
}