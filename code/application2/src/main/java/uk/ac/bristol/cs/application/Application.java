package uk.ac.bristol.cs.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        System.out.println("Reach Application.main()");
        SpringApplication.run(Application.class, args);
    }
}
