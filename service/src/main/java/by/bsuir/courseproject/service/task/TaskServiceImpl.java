package by.bsuir.courseproject.service.task;

import by.bsuir.courseproject.entites.Task;
import by.bsuir.courseproject.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;


    public TaskServiceImpl() {
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void remove(int id) {
        taskRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Task task) {
        taskRepository.save(task);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void add(Task task) {
        taskRepository.save(task);
    }

    @Override
    public Optional<Task> getTaskById(int taskId) {
        return taskRepository.findById(taskId);
    }
}
