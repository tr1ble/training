package by.bsuir.courseproject.repository;


import by.bsuir.courseproject.entites.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findAll();
    Optional<User> findByLogin(String login);
    Optional<User> findByLoginAndPassword(String login, String password);
}
