package com.letsson.letsson;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.PropertySource;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.TimeZone;


@SpringBootApplication
public class LetssonApplication{
	public static final String APPLICATION_LOCATIONS = "spring.config.location="
			+ "classpath:application.yml";

	/*@PostConstruct
	public void started()
	{
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		System.out.println("현재시각: "+ new Date());
	}*/
	public static void main(String[] args) {
		new SpringApplicationBuilder(LetssonApplication.class)
				.properties(APPLICATION_LOCATIONS)
				.run(args);
	}



}
