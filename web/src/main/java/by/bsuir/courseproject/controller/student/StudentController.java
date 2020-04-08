package by.bsuir.courseproject.controller.student;

import by.bsuir.courseproject.entites.Student;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
public class StudentController {

    private static final String STUDENT_ID = "studentId";
    
    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @RequestMapping(value = {"/registration"}, method = RequestMethod.PUT)
    public Student registration(@RequestBody Student student) throws IOException {
        return studentService.add(student);
    }

    @RequestMapping(value = {"/unregister"}, method = RequestMethod.POST)
    public void unregister(@RequestParam(STUDENT_ID) int studentId)  {
        studentService.remove(studentId);
    }

   

}
