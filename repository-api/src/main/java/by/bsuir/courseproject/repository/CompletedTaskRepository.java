package by.bsuir.courseproject.repository;


import by.bsuir.courseproject.entites.CompletedTask;
import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CompletedTaskRepository extends CrudRepository<CompletedTask, Integer> {
    List<CompletedTask> findByCourse(Course course);
    List<CompletedTask> findAll();
    List<CompletedTask> findByStudent(Student student);
    List<CompletedTask> findByMark(double mark);
}
