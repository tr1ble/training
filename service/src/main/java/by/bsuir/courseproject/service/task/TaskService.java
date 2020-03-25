package by.bsuir.courseproject.service.task;

import by.bsuir.courseproject.entites.Task;
import by.bsuir.courseproject.service.Service;

import java.util.Optional;

public interface TaskService extends Service<Task> {
    Optional<Task> getTaskById(int taskId);
}
