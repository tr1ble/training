package by.bsuir.courseproject.entites;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Date;


@Entity
@Table(name="course")
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Builder
public class Course implements Identifable {

    @Id
    @Basic
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    @NonNull
    private Trainer trainer;

    @Basic
    @Column(name = "title", length = 45, nullable = false)
    @NonNull
    private String title;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    @NonNull
    private Date startDate;

    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    @NonNull
    private Date endDate;


    @Override
    public Integer getId() {
        return id;
    }
}

