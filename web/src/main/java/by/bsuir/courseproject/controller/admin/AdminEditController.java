package by.bsuir.courseproject.controller.admin;

import by.training.project.entities.Course;
import by.training.project.entities.Trainer;
import by.training.project.entities.User;
import by.training.project.service.course.CourseService;
import by.training.project.service.trainer.TrainerService;
import by.training.project.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Controller
public class AdminEditController {

    private final static Logger LOG = LoggerFactory.getLogger(AdminEditController.class.getName());

    private static final String PARAMETER_COURSE= "courseId";
    private static final String PARAMETER_TRAINER= "trainer";
    private static final String PARAMETER_TITLE = "title";
    private static final String PARAMETER_START_DATE = "startDate";
    private static final String PARAMETER_END_DATE = "endDate";
    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String COURSES_PAGE = "courses-page";
    private static final String OLD_TRAINER = "oldTrainer";

    private static final String TRAINER_ID = "trainerId";
    private static final String TRAINERS_PAGE = "trainers";
    private static final String PARAMETER_SURNAME = "surname";
    private static final String PARAMETER_FIRSTNAME = "firstname";
    private static final String PARAMETER_SECONDNAME = "secondname";
    private static final String PARAMETER_IS_BUSY = "busy";
    private static final String USER_LOGIN = "userLogin";
    private static final String TRAINERS_LIST = "trainers-list";

    private static final String TRAINERS_URL = "trainers";
    private static final String TASKS_URL = "training";
    private static final String COURSES_URL = "courses";


    private TrainerService trainerService;
    private CourseService courseService;
    private UserService userService;


    @Autowired
    public AdminEditController(TrainerService trainerService, CourseService courseServiceImpl, UserService userService) {
        this.trainerService = trainerService;
        this.courseService = courseServiceImpl;
        this.userService = userService;
    }

    @RequestMapping(value = {"/editCourse"}, method = RequestMethod.PUT)
    public String editCourse(@ModelAttribute(PARAMETER_COURSE) int courseId, @RequestParam(PARAMETER_TRAINER) String trainerData, @RequestParam(PARAMETER_TITLE) String title, @RequestParam(PARAMETER_START_DATE) String parameterStartDate, @RequestParam(PARAMETER_END_DATE) String parameterEndDate, @RequestParam(OLD_TRAINER) String old,  Model model) throws IOException, ParseException {
        String[] fio = trainerData.split(" ");
        Optional<Trainer> trainer = trainerService.getTrainerByFio(fio[0], fio[1], fio[2]);
            if(trainer.isPresent()) {

                Date startDate = new SimpleDateFormat(DATE_PATTERN).parse(parameterStartDate);
                Date endDate = new SimpleDateFormat(DATE_PATTERN).parse(parameterEndDate);
                Integer trainerId = trainer.get().getId();


                courseService.update(new Course(courseId,trainer.get(), title, startDate, endDate));

                String[] oldFio = old.split(" ");;
                Optional<Trainer> oldTrainer = trainerService.getTrainerByFio(oldFio[0], oldFio[1], oldFio[2]);
                oldTrainer.ifPresent(value -> trainerService.changeTrainerBusy(value.getId(), false));
                trainerService.changeTrainerBusy(trainerId, true);

            }


        List<Course> courseList = courseService.getAll();
        model.addAttribute(courseList);

        return "redirect:/"+COURSES_URL;
    }


    @RequestMapping(value = {"/editTrainer"}, method = RequestMethod.PUT)
    public String editTrainer(@RequestParam(TRAINER_ID) int id,@RequestParam(PARAMETER_SURNAME) String surname,  @RequestParam(PARAMETER_FIRSTNAME) String firstname, @RequestParam(PARAMETER_SECONDNAME) String secondname, @RequestParam(PARAMETER_IS_BUSY) boolean isBusy, @RequestParam(USER_LOGIN) String userLogin, Model model) throws IOException, ParseException {

        User user = userService.getUser(userLogin);
        trainerService.update(new Trainer(firstname, surname, secondname, id, isBusy, user));
        List<Trainer> trainerList = trainerService.getAll();
        model.addAttribute(TRAINERS_LIST, trainerList);

        return "redirect:/"+TRAINERS_URL;
    }

}
