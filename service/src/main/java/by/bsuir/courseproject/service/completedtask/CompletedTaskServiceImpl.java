package by.bsuir.courseproject.service.completedtask;

import by.bsuir.courseproject.entites.CompletedTask;
import by.bsuir.courseproject.repository.CompletedTaskRepository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class CompletedTaskServiceImpl implements CompletedTaskService {

    @Autowired
    private CompletedTaskRepository completedTaskRepository;

    public CompletedTaskServiceImpl()  {
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<CompletedTask> getAll() {
        return completedTaskRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void add(CompletedTask completedTask)  {
        completedTaskRepository.save(completedTask);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void remove(int id)  {
        completedTaskRepository.deleteById(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void update(CompletedTask completedTask) {
        completedTaskRepository.save(completedTask);
    }

    @Override
    public List<CompletedTask> getCompletedTasksByCourse(int courseId)  {
        return completedTaskRepository.findByCourse(String.valueOf(courseId));
    }
}
