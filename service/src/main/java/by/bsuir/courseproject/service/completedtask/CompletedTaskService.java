package by.bsuir.courseproject.service.completedtask;

import by.bsuir.courseproject.entites.CompletedTask;
import by.bsuir.courseproject.service.Service;

import java.util.List;

public interface CompletedTaskService extends Service<CompletedTask> {
    List<CompletedTask> getCompletedTasksByCourse(int courseId);
}
