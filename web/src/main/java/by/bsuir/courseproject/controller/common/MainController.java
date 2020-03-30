package by.bsuir.courseproject.controller.common;

import by.training.project.entities.*;
import by.training.project.service.completedtask.CompletedTaskService;
import by.training.project.service.course.CourseService;
import by.training.project.service.student.StudentService;
import by.training.project.service.task.TaskService;
import by.training.project.service.trainer.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
public class MainController {

    private static final String BUSY_TRAINER_LIST = "busy-trainer-list";
    private static final String ROLE = "role";
    private static final String COURSES_PAGE = "courses-page";
    private static final String CURRENT_STUDENT = "current-student";
    private static final String TRAINING_PAGE = "training-page";
    private static final String TASKS_LIST = "tasks-list";
    private static final String COMPLETED_TASKS_LIST = "completed-tasks-list";
    private static final String CURRENT_TRAINER = "current-trainer";

    private TrainerService trainerService;
    private CourseService courseService;
    private StudentService studentService;
    private TaskService taskService;
    private CompletedTaskService completedTaskService;


    @Autowired
    public MainController(TrainerService trainerService, CourseService courseService, StudentService studentService, TaskService taskService, CompletedTaskService completedTaskService) {
        this.trainerService = trainerService;
        this.courseService = courseService;
        this.completedTaskService = completedTaskService;
        this.taskService = taskService;
        this.studentService = studentService;
    }

    @RequestMapping(value = "/courses")
    public String coursesPage(HttpSession session, Model model, Authentication authentication) throws IOException {

        model.addAttribute(BUSY_TRAINER_LIST, trainerService.getTrainerByBusy(true));
        System.out.println(authentication.getName());
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

    @RequestMapping(value = {"/studying"})
    public String trainingPage(HttpSession session, Model model, Authentication authentication) throws IOException {

        List<Task> taskList= taskService.getAll();
        model.addAttribute(TASKS_LIST, taskList);

        List<Course> courseList = courseService.getAll();
        model.addAttribute(courseList);

        List<CompletedTask> completedTaskList= completedTaskService.getAll();
        model.addAttribute(COMPLETED_TASKS_LIST, completedTaskList);

        String role = (String) session.getAttribute(ROLE);
        if(role.equals(Role.ROLE_STUDENT.getValue())) {
            Optional<Student> student = studentService.findCurrentStudentByLogin(authentication.getName());
            student.ifPresent(student1 -> session.setAttribute(CURRENT_STUDENT, student1));
            if(!student.isPresent()) {
                session.setAttribute(CURRENT_STUDENT, null);
            }
        }

        if(role.equals(Role.ROLE_TRAINER.getValue())) {
            Optional<Trainer> trainer = trainerService.findCurrentTrainerByUserLogin(authentication.getName());
            trainer.ifPresent(trainer1 -> session.setAttribute(CURRENT_TRAINER, trainer1));
        }

        return TRAINING_PAGE;
    }

}
