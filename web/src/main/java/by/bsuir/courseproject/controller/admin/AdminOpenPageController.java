package by.bsuir.courseproject.controller.admin;

import by.training.project.entities.Course;
import by.training.project.entities.Trainer;
import by.training.project.entities.User;
import by.training.project.exceptions.RepositoryException;
import by.training.project.service.course.CourseService;
import by.training.project.service.trainer.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
public class AdminOpenPageController {


    private static final String ADD_COURSE_PAGE = "add-course";
    private static final String TRAINERS_LIST = "trainers-list";
    private static final String ADD_TASK_PAGE = "add-task";
    private static final String COURSE_ID = "courseId";
    private static final String ADD_TRAINER_PAGE = "add-trainer";

    private static final String EDIT_COURSE_PAGE = "edit-course";
    private static final String TITLE= "title";
    private static final String TRAINER_ID = "trainerId";
    private static final String TRAINER_SURNAME = "surname";
    private static final String TRAINER_NAME = "firstname";
    private static final String TRAINER_SECNAME = "secondname";
    private static final String START_DATE= "startDate";
    private static final String END_DATE = "endDate";

    private static final String EDIT_TRAINER_PAGE = "edit-trainer";
    private static final String TRAINER_LOGIN = "userLogin";
    private static final String IS_BUSY = "busy";

    private TrainerService trainerService;
    private CourseService courseService;

    @Autowired
    public AdminOpenPageController(TrainerService trainerService, CourseService courseService) {
        this.trainerService = trainerService;
        this.courseService = courseService;
    }

    @RequestMapping(value = {"/addCourse"}, method = RequestMethod.GET)
    public String addCoursePage(Model model) throws IOException {
        List<Trainer> trainerList= trainerService.getAll();
        model.addAttribute(TRAINERS_LIST, trainerList);
        return ADD_COURSE_PAGE;
    }

    @RequestMapping(value = {"/addTask"}, method = RequestMethod.GET)
    public String addTaskPage(@RequestParam(COURSE_ID) int courseId, Model model)  {
        model.addAttribute(COURSE_ID, courseId);
        return ADD_TASK_PAGE;
    }

    @RequestMapping(value = {"/addTrainer"}, method = RequestMethod.GET)
    public String addTrainerPage() {
        return ADD_TRAINER_PAGE;
    }

    @RequestMapping(value = {"/editCourse/{courseId}"}, method = RequestMethod.POST)
    public String editCoursePage(@PathVariable(COURSE_ID) int courseId, Model model) throws RepositoryException {
        List<Trainer> trainerList= trainerService.getAll();
        model.addAttribute(TRAINERS_LIST, trainerList);

        model.addAttribute(COURSE_ID, courseId);

        Optional<Course> course = courseService.findCourseById(courseId);
        if(course.isPresent()) {
            Trainer trainer = course.get().getTrainer();
            model.addAttribute(TRAINER_ID, trainer.getId());
            model.addAttribute(TITLE, course.get().getTitle());
            model.addAttribute(START_DATE, course.get().getStartDate());
            model.addAttribute(END_DATE, course.get().getEndDate());

            Optional<Trainer> trainerOp= trainerService.getTrainerByID(trainer.getId());
            trainerOp.ifPresent(trainer1 -> setTrainerFio(trainer1, model));

        }
        return EDIT_COURSE_PAGE;
    }

    @RequestMapping(value = {"/editTrainer/{trainerId}"}, method = RequestMethod.POST)
    public String editTrainerPage(@PathVariable(TRAINER_ID) int trainerId, Model model) throws RepositoryException {

        List<Trainer> trainerList= trainerService.getAll();
        model.addAttribute(TRAINERS_LIST, trainerList);

        Optional<Trainer> trainer = trainerService.getTrainerByID(trainerId);

        if (trainer.isPresent()) {
            String surname = trainer.get().getSurname();
            String firstname = trainer.get().getFirstname();
            String secname = trainer.get().getSecondname();
            User user= trainer.get().getUser();
            boolean isBusy = trainer.get().isBusy();
            model.addAttribute(TRAINER_ID, trainerId);
            model.addAttribute(IS_BUSY, isBusy);
            model.addAttribute(TRAINER_SURNAME, surname);
            model.addAttribute(TRAINER_NAME, firstname);
            model.addAttribute(TRAINER_SECNAME, secname);
            model.addAttribute(TRAINER_LOGIN, user.getLogin());
            return EDIT_TRAINER_PAGE;
        } else {
            return "trainers-page";
        }
    }


    private void setTrainerFio(Trainer trainer, Model model) {
        model.addAttribute(TRAINER_SURNAME, trainer.getSurname());
        model.addAttribute(TRAINER_NAME, trainer.getFirstname());
        model.addAttribute(TRAINER_SECNAME, trainer.getSecondname());
    }

}
