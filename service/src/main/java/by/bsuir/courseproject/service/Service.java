package by.bsuir.courseproject.service;

import java.util.List;

public interface Service<T> {
    void add(T o);
    void remove(int id);
    void update(T o);
    List<T> getAll();
}
