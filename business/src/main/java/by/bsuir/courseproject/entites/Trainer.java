package by.bsuir.courseproject.entites;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;


@Entity
@Table(name = "trainer", schema = "training")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class Trainer extends Man implements Identifable {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  int id;

    @Basic
    @Column(name="busy", nullable = false)
    @Setter
    private boolean isBusy;

    @Basic
    @ManyToOne
    @JoinColumn(name = "user_login", nullable = false)
    private User user;



    @Override
    public Integer getId() {
        return id;
    }

    public void setBusy(boolean busy) {
        isBusy = busy;
    }
}
