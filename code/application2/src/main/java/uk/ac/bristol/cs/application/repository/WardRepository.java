package uk.ac.bristol.cs.application.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import uk.ac.bristol.cs.application.model.Ward;

public interface WardRepository extends JpaRepository<Ward, String> {

    @Query("FROM Ward w")
    List<Ward> fetchAllFull();
}
