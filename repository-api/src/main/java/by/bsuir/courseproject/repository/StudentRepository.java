package by.bsuir.courseproject.repository;

import by.bsuir.courseproject.entites.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends CrudRepository<Student, Integer> {
    List<Student> findAll();
    Optional<Student> findByLogin(String login);
    Optional<Student> findBySurnameAndNameAndSecname(String surname, String firstname, String secname);
    int deleteByCourse(String course);
}
