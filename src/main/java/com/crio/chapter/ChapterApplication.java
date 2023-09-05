package com.crio.chapter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class ChapterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChapterApplication.class, args);
	}

	@Bean
	RestTemplate getRestTemplate(){
		return new RestTemplate();
	}
	@Bean
	ObjectMapper getObjectMapper(){
		return new ObjectMapper();
	}
}
