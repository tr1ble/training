package by.bsuir.courseproject.controller.trainer;

import by.training.project.entities.CompletedTask;
import by.training.project.entities.Student;
import by.training.project.entities.Task;
import by.training.project.exceptions.RepositoryException;
import by.training.project.service.completedtask.CompletedTaskService;
import by.training.project.service.student.StudentService;
import by.training.project.service.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;


@Controller
public class TrainerController {


    private static final String HISTORY_PAGE = "history-page";
    private static final String COMPLETED_TASKS_LIST = "completed-tasks-list";

    private static final String COURSE_ID = "courseId";
    private static final String TASKS_LIST = "tasks-list";

    private static final String TASK_ID = "taskId";
    private static final String VERIFY_TASK_PAGE = "verify-task";

    private static final String STUDENTS_LIST = "students-list";

    private static final String TRAINING_PAGE = "training-page";
    private static final String MARK = "mark";
    private static final String FEEDBACK = "feedback";
    private static final String STUDENT = "student";
    
    private StudentService studentService;
    private TaskService taskService;
    private CompletedTaskService completedTaskService;



    @Autowired
    public TrainerController(StudentService studentService, TaskService taskService, CompletedTaskService completedTaskService) {
        this.studentService = studentService;
        this.taskService = taskService;
        this.completedTaskService = completedTaskService;
    }


    @RequestMapping(value = {"/history"}, method = RequestMethod.POST)
    public String history(@RequestParam(COURSE_ID) int courseId, Model model) throws RepositoryException {

        List<Task> taskList= taskService.getAll();
        model.addAttribute(TASKS_LIST, taskList);


        List<CompletedTask> completedTaskList= completedTaskService.getCompletedTasksByCourse(courseId);
        model.addAttribute(COMPLETED_TASKS_LIST, completedTaskList);

        return HISTORY_PAGE;
    }

    @RequestMapping(value = {"/verify"}, method = RequestMethod.GET)
    public String openVerifyPage(@RequestParam(COURSE_ID) int courseId, @RequestParam(TASK_ID) int taskId, Model model) throws RepositoryException {

        List<CompletedTask> completedTaskList= completedTaskService.getAll();
        model.addAttribute(COMPLETED_TASKS_LIST, completedTaskList);

        List<Student> studentList= studentService.getAll();
        model.addAttribute(STUDENTS_LIST, studentList);


        model.addAttribute(COURSE_ID, courseId);

        model.addAttribute(TASK_ID, taskId);

        return VERIFY_TASK_PAGE;
    }

    @RequestMapping(value = {"/verify"}, method = RequestMethod.POST)
    public String verify(@RequestParam(TASK_ID) int taskId, @RequestParam(MARK) double mark, @RequestParam(FEEDBACK) String feedback, @RequestParam(STUDENT) String studentData, Model model) throws RepositoryException {

        Optional<Task> optionalTask = taskService.getTaskById(taskId);
        if (optionalTask.isPresent()) {
            Task task=optionalTask.get();
            String[] fio = studentData.split(" ");
            String surname = fio[0];
            String firstname = fio[1];
            String secname = fio[2];

            Optional<Student> student = studentService.getTrainerByFio(surname, firstname, secname);
            if(student.isPresent()) {
                String studentLogin = student.get().getUser().getLogin();
                CompletedTask completedTask = new CompletedTask(taskId, task.getCourse(), task.getDescription(), mark, feedback, studentLogin);
                    completedTaskService.add(completedTask);
                    List<CompletedTask> completedTaskList = completedTaskService.getAll();
                    model.addAttribute(COMPLETED_TASKS_LIST, completedTaskList);
            }

        }
        return TRAINING_PAGE;
    }


   

}
