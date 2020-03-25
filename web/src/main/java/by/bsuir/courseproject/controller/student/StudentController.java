package by.bsuir.courseproject.controller.student;


import by.training.project.entities.Course;
import by.training.project.entities.Role;
import by.training.project.entities.Student;
import by.training.project.entities.User;
import by.training.project.exceptions.RepositoryException;
import by.training.project.service.course.CourseService;
import by.training.project.service.student.StudentService;
import by.training.project.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Controller
public class StudentController {

    private static final String COURSE_ID = "courseId";
    private static final String REGISTRATION_JSP = "registration";

    private static final String COURSES_PAGE = "courses-page";
    private static final String SURNAME = "surname";
    private static final String FIRSTNAME = "firstname";
    private static final String SECONDNAME = "secondname";
    private static final String ROLE = "role";

    private static final String CURRENT_STUDENT = "current-student";
    
    private StudentService studentService;
    private CourseService courseService;
    private UserService userService;

    @Autowired
    public StudentController(StudentService studentService, CourseService courseService, UserService userService) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.userService = userService;
    }

    @RequestMapping(value = {"/registration"}, method = RequestMethod.PUT)
    public String registration(@ModelAttribute @RequestParam(COURSE_ID) int courseId, @RequestParam(SURNAME) String surname, @RequestParam(FIRSTNAME) String firstname, @RequestParam(SECONDNAME) String secondname, Authentication authentication) throws IOException {
        String userLogin = authentication.getName();
        User user = userService.getUser(userLogin);
        Optional<Course> courseOptional = courseService.findCourseById(courseId);
        courseOptional.ifPresent(course -> studentService.add(new Student(firstname, surname, secondname, user, course)));
        return COURSES_PAGE;
    }

    @RequestMapping(value = {"/registration"}, method = RequestMethod.GET)
    public String registrationPage(@RequestParam(COURSE_ID) int courseId, Model model)  {
        model.addAttribute(COURSE_ID, courseId);
        return REGISTRATION_JSP;
    }

    @RequestMapping(value = {"/unregister"}, method = RequestMethod.POST)
    public String unregister(@RequestParam(COURSE_ID) int courseId, Model model, HttpSession session, Authentication authentication) throws RepositoryException, IllegalArgumentException, IllegalArgumentException {
        studentService.removeStudentByCourseId(courseId);
        session.setAttribute(CURRENT_STUDENT, null);

        List<Course> courseList = courseService.getAll();
        model.addAttribute(courseList);

        String role = (String) session.getAttribute(ROLE);
        if(role.equals(Role.ROLE_STUDENT.getValue())) {
            Optional<Student> student = studentService.findCurrentStudentByLogin(authentication.getName());
            student.ifPresent(student1 -> session.setAttribute(CURRENT_STUDENT, student1));
            if(!student.isPresent()) {
                session.setAttribute(CURRENT_STUDENT, null);
            }
        }

        return COURSES_PAGE;
    }

   

}
