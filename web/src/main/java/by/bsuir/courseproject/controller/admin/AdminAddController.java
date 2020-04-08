package by.bsuir.courseproject.controller.admin;

import by.bsuir.courseproject.entites.*;
import by.bsuir.courseproject.exceptions.RepositoryException;
import by.bsuir.courseproject.service.completedtask.CompletedTaskService;
import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.student.StudentService;
import by.bsuir.courseproject.service.task.TaskService;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.bsuir.courseproject.service.user.UserService;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
public class AdminAddController {

    private TrainerService trainerService;
    private CourseService courseService;
    private TaskService taskService;
    private UserService userService;
    private CompletedTaskService completedTaskService;
    private StudentService studentService;

    @Autowired
    public AdminAddController(TrainerService trainerService, CourseService courseService, TaskService taskService, UserService userService, CompletedTaskService completedTaskService, StudentService studentService) {
        this.completedTaskService = completedTaskService;
        this.trainerService = trainerService;
        this.courseService = courseService;
        this.taskService = taskService;
        this.userService = userService;
        this.studentService = studentService;
    }


    @RequestMapping(value = {"/course"}, method = RequestMethod.POST)
    @Transactional
    public Course addCourse(@RequestBody(required = false) Course course) {
        return courseService.add(course);
    }

    @RequestMapping(value = {"/task"}, method = RequestMethod.POST)
    @Transactional
    public Task addTask(@RequestBody(required = false) Task task) {

        return taskService.add(task);

    }

    @RequestMapping(value = {"/trainer"}, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<Trainer> addTrainer(@RequestBody(required = false) Trainer trainer) {
        return new ResponseEntity<>(trainerService.add(trainer), HttpStatus.OK);
    }


    @RequestMapping(value = {"/user"}, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<User> addUser(@RequestBody(required = false) User user) {
        return new ResponseEntity<>(userService.add(user), HttpStatus.OK);

    }

    @RequestMapping(value = {"/completedtask"}, method = RequestMethod.POST)
    @Transactional
    public CompletedTask addCompletedTask(@RequestBody(required = false) CompletedTask completedTask) {
        return completedTaskService.add(completedTask);

    }

    @RequestMapping(value = {"/student"}, method = RequestMethod.POST)
    @Transactional
    public Student addStudent(@RequestBody(required = false) Student student) {
        return studentService.add(student);

    }
}
