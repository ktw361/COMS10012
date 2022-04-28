package uk.ac.bristol.cs.application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import uk.ac.bristol.cs.application.model.Country;
import uk.ac.bristol.cs.application.model.ModelClass;
import uk.ac.bristol.cs.application.repository.CountryRepository;

@RestController
public class CountryController {

    private final CountryRepository repository;

    CountryController(CountryRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/countries")
    List<Country> getAllCountries() {
        System.out.println("/api/countries");
        return repository.findAll();
    }
    
    @GetMapping(path = "/api/country/{id}", produces = "application/json")
    String getCountryById(@PathVariable String id) {
        System.out.println("CountryController.getCountryById()");
        Country c = repository.getWithChildren(id);
        return ModelClass.renderJSON(c, Country.class, id);
    }   
}
