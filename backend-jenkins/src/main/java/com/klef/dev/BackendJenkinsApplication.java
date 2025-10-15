package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BackendJenkinsApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(BackendJenkinsApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendJenkinsApplication.class, args);
        System.out.println("Backend Jenkins Application is Running...");
    }
}