package by.bsuir.courseproject.service.course;

import by.bsuir.courseproject.entites.Course;
import by.bsuir.courseproject.service.Service;

import java.util.Optional;

public interface CourseService extends Service<Course> {
    Optional<Course> findCourseById(int id);
}
