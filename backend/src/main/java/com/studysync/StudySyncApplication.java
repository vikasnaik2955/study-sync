package com.studysync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * StudySync — Study Group &amp; Notes Sharing Platform.
 *
 * <p>API-first: every bit of business logic lives behind the REST + STOMP API so a future
 * Android client reuses this backend unchanged. No web-only coupling lives server-side.
 */
@SpringBootApplication
@ConfigurationPropertiesScan          // picks up the @ConfigurationProperties records (jwt, storage, ...)
@EnableJpaAuditing                    // drives createdAt / updatedAt on BaseEntity
public class StudySyncApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudySyncApplication.class, args);
    }
}
