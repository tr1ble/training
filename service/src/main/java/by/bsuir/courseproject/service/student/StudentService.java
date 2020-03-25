package by.bsuir.courseproject.service.student;

import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.service.Service;

import java.util.Optional;

public interface StudentService extends Service<Student> {
    Optional<Student> findCurrentStudentByLogin(String login);
    void removeStudentByCourseId(int id);
    Optional<Student> getTrainerByFio(String surname, String firstname, String secname);
}
