package by.bsuir.courseproject.service.task;

import by.bsuir.courseproject.repository.TaskDao;

import by.bsuir.courseproject.entities.Course;
import by.bsuir.courseproject.entities.Task;
import by.bsuir.courseproject.entities.Trainer;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

class TaskServiceImplTest {

    @Mock
    private TaskDao taskDao;
    
    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAllTasksTest() {
        List<Task> expectedTasksList = new ArrayList<>(5);

        Course course = Mockito.mock(Course.class);
        Date date = Mockito.mock(Date.class);
        Task taskOne = new Task(1,"one", course, "one");
        Task taskTwo = new Task(2,"two", course, "two");
        Task taskThree = new Task(3,"three", course, "three");
        Task taskFour = new Task(4, "four", course, "four");
        Task taskFive = new Task(5, "five", course, "five");

        expectedTasksList.add(taskOne);
        expectedTasksList.add(taskTwo);
        expectedTasksList.add(taskThree);
        expectedTasksList.add(taskFour);
        expectedTasksList.add(taskFive);

        Mockito.when(taskDao.getAll()).thenReturn(expectedTasksList);

        List<Task> actualTasksList = taskService.getAll();

        Assert.assertArrayEquals(expectedTasksList.toArray(), actualTasksList.toArray());
        Mockito.verify(taskDao, Mockito.times(1)).getAll();
    }

    @Test
    public void addTasksTest() {
        Course course = Mockito.mock(Course.class);

        Task taskOne = new Task(1,"one", course, "one");
        Task taskTwo = new Task(2,"two", course, "two");
        Task taskThree = new Task(3,"three", course, "three");

        taskService.add(taskOne);
        taskService.add(taskTwo);
        taskService.add(taskThree);


        Mockito.verify(taskDao, Mockito.times(1)).add(taskOne);
        Mockito.verify(taskDao, Mockito.times(1)).add(taskTwo);
        Mockito.verify(taskDao, Mockito.times(1)).add(taskThree);
    }

    @Test
    public void getTaskByIdTest() throws ParseException {
        int expectedCourseId = 22;
        String expectedTitle = "two";
        String expectedDescription = "two";

        Task expectedTask = new Task(2,"two", new Course(expectedCourseId), "two");

        Mockito.when(taskDao.findTaskById(2)).thenReturn(Optional.of(expectedTask));

        Task actualTask = taskService.getTaskById(2).get();

        Assert.assertEquals(expectedTask, actualTask);
        Mockito.verify(taskDao, Mockito.times(1)).findTaskById(2);
    }


    @Test
    public void removeTaskTest() {
        taskService.remove(3);
        Mockito.verify(taskDao, Mockito.times(1)).removeById(3);
    }

    @Test
    public void updateTaskTest() {
        Course course = Mockito.mock(Course.class);

        Task task = new Task(1,"one", course, "one");

        taskService.update(task);
        Mockito.verify(taskDao, Mockito.times(1)).updateById(task,1);
    }

}