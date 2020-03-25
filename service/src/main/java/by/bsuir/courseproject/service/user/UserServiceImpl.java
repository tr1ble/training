package by.bsuir.courseproject.service.user;


import by.bsuir.courseproject.entites.User;
import by.bsuir.courseproject.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Transactional(readOnly = false)
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    public UserServiceImpl() throws IllegalArgumentException {
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Optional<User> login(String login, String password) {
        return userRepository.findByLoginAndPassword(login, password);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public User getUser(String username) {
        return userRepository.findByLogin(username).get();
    }

    @Override
    public void add(User user) {
        userRepository.save(user);
    }

    @Override
    public void remove(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public void update(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }
}
