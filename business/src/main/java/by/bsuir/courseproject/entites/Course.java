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
    @Pattern(regexp = "\\d*", message = "It must be number")
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
    @Pattern(regexp = "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))", message = "Invalid date format(must be yyyy-MM-dd)")
    @NonNull
    private Date startDate;

    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    @Pattern(regexp = "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))", message = "Invalid date format(must be yyyy-MM-dd)")
    @NonNull
    private Date endDate;


    @Override
    public Integer getId() {
        return id;
    }
}

