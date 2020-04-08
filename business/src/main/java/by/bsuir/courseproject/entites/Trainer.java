package by.bsuir.courseproject.entites;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;


@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "trainer")
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
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
    private boolean busy;

    @Basic
    @ManyToOne
    @JoinColumn(name = "login", nullable = false)
    @NonNull
    private User user;



    @Override
    public Integer getId() {
        return id;
    }


}
