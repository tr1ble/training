package by.bsuir.courseproject.repository;

import by.bsuir.courseproject.entites.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends CrudRepository<Course, Integer> {
    List<Course> findAll();
}
