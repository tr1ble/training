package by.bsuir.courseproject.service.trainer;

import by.bsuir.courseproject.entites.Trainer;
import by.bsuir.courseproject.service.Service;

import java.util.List;
import java.util.Optional;

public interface TrainerService extends Service<Trainer> {
    Optional<Trainer> getTrainerByID(int id);
    void changeTrainerBusy(int id, boolean isBusy);
    Optional<Trainer> findCurrentTrainerByUserLogin(String login);
    Optional<Trainer> getTrainerByFio(String surname, String firstname, String secname);
    List<Trainer> getTrainerByBusy(boolean busy);
}
