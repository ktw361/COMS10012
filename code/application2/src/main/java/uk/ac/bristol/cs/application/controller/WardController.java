package uk.ac.bristol.cs.application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import uk.ac.bristol.cs.application.model.Ward;
import uk.ac.bristol.cs.application.model.ModelClass;
import uk.ac.bristol.cs.application.repository.WardRepository;

@RestController
public class WardController {

    private final WardRepository repository;

    WardController(WardRepository repository) {
        System.out.println("WardController initailized");
        this.repository = repository;
    }

    @GetMapping("/api/wards")
    List<Ward> getAllWards() {
        System.out.println("/api/wards");
        return repository.findAll();
    }
    
    // @GetMapping(path = "/api/ward/{id}", produces = "application/json")
    // String getWardById(@PathVariable String id) {
    //     System.out.println("WardController.getWardById()");
    //     Ward w = repository.getWithChildren(id);
    //     return ModelClass.renderJSON(w, Ward.class, id);
    // }   
}
