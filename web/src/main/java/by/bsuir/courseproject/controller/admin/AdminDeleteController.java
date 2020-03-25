package by.bsuir.courseproject.controller.admin;

import by.training.project.entities.Course;
import by.training.project.entities.Task;
import by.training.project.entities.Trainer;
import by.training.project.service.course.CourseService;
import by.training.project.service.task.TaskService;
import by.training.project.service.trainer.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;


@Controller
public class AdminDeleteController {

    private static final String COURSE_ID = "courseId";
    private static final String TRAINER_ID = "trainerId";
    private static final String TASK_ID = "taskId";
    private static final String TRAINERS_LIST = "trainers-list";
    private static final String TASKS_LIST = "tasks-list";

    private static final String TRAINERS_URL = "trainers";
    private static final String TASKS_URL = "training";
    private static final String COURSES_URL = "courses";

    private TrainerService trainerService;
    private CourseService courseService;
    private TaskService taskService;


    @Autowired
    public AdminDeleteController(TrainerService trainerService, CourseService courseService, TaskService taskService) {
        this.trainerService = trainerService;
        this.courseService = courseService;
        this.taskService = taskService;
    }

    @RequestMapping(value = {"/Course/{courseId}"}, method = RequestMethod.DELETE)
    public String deleteCourse(@PathVariable(COURSE_ID) int courseId, @RequestParam(TRAINER_ID) int trainerId, Model model) throws IOException, ParseException {
        courseService.remove(courseId);

        trainerService.changeTrainerBusy(trainerId, false);

        List<Course> courseList = courseService.getAll();
        model.addAttribute(courseList);

        return "redirect:/"+COURSES_URL;
    }

    @RequestMapping(value = {"/Task/{taskId}"}, method = RequestMethod.DELETE)
    public String deleteTask(@PathVariable(TASK_ID) int taskId, Model model) throws IOException, ParseException {

        taskService.remove(taskId);

        List<Trainer> trainerList = trainerService.getAll();
        model.addAttribute(TRAINERS_LIST, trainerList);

        List<Task> taskList = taskService.getAll();
        model.addAttribute(TASKS_LIST, taskList);

        return "redirect:/"+TASKS_URL;
    }

    @RequestMapping(value = {"/Trainer/{trainerId}"}, method = RequestMethod.DELETE)
    public String deleteTrainer(@PathVariable(TRAINER_ID) int trainerId, HttpServletRequest request, Model model) throws IOException, ParseException {
        trainerService.remove(trainerId);

        List<Trainer> trainerList = trainerService.getAll();
        model.addAttribute(TRAINERS_LIST, trainerList);

        return "redirect:/"+TRAINERS_URL;
    }

}
