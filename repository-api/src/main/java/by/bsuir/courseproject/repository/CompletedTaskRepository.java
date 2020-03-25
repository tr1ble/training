package by.bsuir.courseproject.repository;


import by.bsuir.courseproject.entites.CompletedTask;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CompletedTaskRepository extends CrudRepository<CompletedTask, Integer> {
    List<CompletedTask> findByCourse(String course);
    List<CompletedTask> findAll();
}
