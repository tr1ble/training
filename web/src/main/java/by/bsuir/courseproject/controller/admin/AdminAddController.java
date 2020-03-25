package by.bsuir.courseproject.controller.admin;

import by.training.project.entities.Course;
import by.training.project.entities.Task;
import by.training.project.entities.Trainer;
import by.training.project.entities.User;
import by.training.project.exceptions.RepositoryException;
import by.training.project.service.course.CourseService;
import by.training.project.service.task.TaskService;
import by.training.project.service.trainer.TrainerService;
import by.training.project.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Controller
public class AdminAddController {


    private final static Logger LOG = LoggerFactory.getLogger(AdminAddController.class.getName());

    private static final String PARAMETER_TRAINER= "trainer";
    private static final String PARAMETER_TITLE = "title";
    private static final String PARAMETER_START_DATE = "startDate";
    private static final String PARAMETER_END_DATE = "endDate";
    private static final String DATE_PATTERN = "yyyy-MM-dd";

    private static final String PARAMETER_DESCRIPTION = "description";
    private static final String PARAMETER_COURSE_ID  = "courseId";
    private static final String TASKS_LIST = "tasks-list";

    private static final String PARAMETER_SURNAME = "surname";
    private static final String PARAMETER_FIRSTNAME = "firstname";
    private static final String PARAMETER_SECONDNAME = "secondname";
    private static final String USER_LOGIN = "userLogin";
    private static final String TRAINERS_LIST = "trainers-list";

    private static final String TRAINERS_URL = "trainers";
    private static final String TASKS_URL = "training";
    private static final String COURSES_URL = "courses";

    @Autowired
    private TrainerService trainerService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;


    @RequestMapping(value = {"/addCourse"}, method = RequestMethod.POST)
    public String addCoursePage(@RequestParam(PARAMETER_TRAINER) String trainerData, @RequestParam(PARAMETER_TITLE) String title, @RequestParam(PARAMETER_START_DATE) String parameterStartDate, @RequestParam(PARAMETER_END_DATE) String parameterEndDate, HttpServletRequest request, Model model) throws IOException, ParseException {

        String[] fio = trainerData.split(" ");

        Optional<Trainer> trainer = trainerService.getTrainerByFio(fio[0], fio[1], fio[2]);


            if(trainer.isPresent()) {
                Date startDate = new SimpleDateFormat(DATE_PATTERN).parse(parameterStartDate);
                Date endDate = new SimpleDateFormat(DATE_PATTERN).parse(parameterEndDate);

                Integer id = trainer.get().getId();

                Optional<Trainer> trainerOptional = trainerService.getTrainerByID(id);
                if(trainerOptional.isPresent()) {
                    courseService.add(new Course(trainerOptional.get(), title, startDate, endDate));
                    trainerService.changeTrainerBusy(id, true);
                }
            }


        List<Course> courseList = courseService.getAll();
        model.addAttribute(courseList);

        return "redirect:/" + COURSES_URL;
    }

    @RequestMapping(value = {"/addTask"}, method = RequestMethod.POST)
    public String addTaskPage(@RequestParam(PARAMETER_TITLE) String title,@RequestParam(PARAMETER_DESCRIPTION) String description, HttpSession session, Model model) throws RepositoryException {

        Object attribute = session.getAttribute(PARAMETER_COURSE_ID);
        String courseIdAttribute = String.valueOf(attribute);

        int courseId = Integer.parseInt(String.valueOf(courseIdAttribute));
        Optional<Course> courseOptional = courseService.findCourseById(courseId);
        courseOptional.ifPresent(course -> taskService.add(new Task(title, course, description)));

        List<Task> taskList= taskService.getAll();
        model.addAttribute(TASKS_LIST, taskList);

        return "redirect:/" + TASKS_URL;
    }

    @RequestMapping(value = {"/addTrainer"}, method = RequestMethod.POST)
    public String addTrainerPage(@RequestParam(PARAMETER_SURNAME) String surname, @RequestParam(USER_LOGIN) String userLogin, @RequestParam(PARAMETER_FIRSTNAME) String firstname, @RequestParam(PARAMETER_SECONDNAME) String secondname,HttpServletRequest request, Model model) throws RepositoryException {

        User user = userService.getUser(userLogin);

        trainerService.add(new Trainer(firstname, surname, secondname, user));
        List<Trainer> trainerList= trainerService.getAll();
        model.addAttribute(TRAINERS_LIST, trainerList);

        return "redirect:/"+TRAINERS_URL;
    }



}
