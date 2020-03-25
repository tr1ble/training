package by.bsuir.courseproject.controller.common;

import by.bsuir.courseproject.service.course.CourseService;
import by.bsuir.courseproject.service.trainer.TrainerService;
import by.training.project.entities.*;
import by.training.project.service.course.CourseService;
import by.training.project.service.trainer.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class RestMainController {


    private static final String TRAINERS_LIST = "trainers-list";


    private TrainerService trainerService;
    private CourseService courseService;


    @Autowired
    public RestMainController(TrainerService trainerService, CourseService courseService) {
        this.trainerService = trainerService;
        this.courseService = courseService;
    }

    @RequestMapping(value = "/trainers")
    @ResponseBody
    public List<Trainer> trainersPage(Model model) {

        List<Trainer> trainerList= trainerService.getAll();
        model.addAttribute(TRAINERS_LIST, trainerList);

        List<Course> courseList = courseService.getAll();
        model.addAttribute(courseList);

        System.out.println(trainerList);

        return trainerList;
    }



}
