package by.bsuir.courseproject.service.student;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;


    public StudentServiceImpl() throws IllegalArgumentException {
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void remove(int id)  {
        studentRepository.deleteById(id);
    }

    @Override
    public void update(Student student) {
        studentRepository.save(student);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Student add(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> findCurrentStudentByLogin(String login) throws IllegalArgumentException{
        return studentRepository.findByLogin(login);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void removeStudentByCourseId(int id) {
        studentRepository.deleteByCourse(String.valueOf(id));
    }

    @Override
    public Optional<Student> getTrainerByFio(String surname, String firstname, String secname) {
        return studentRepository.findBySurnameAndNameAndSecname(surname, firstname, secname);
    }
}
