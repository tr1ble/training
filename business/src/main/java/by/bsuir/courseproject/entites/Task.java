package by.bsuir.courseproject.entites;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="task")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RequiredArgsConstructor
public class Task implements Identifable {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Basic
    @Column(name="title", nullable = false, length = 45)
    @NonNull
    private String title;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @NonNull
    private Course course;

    @Basic
    @Column(name="task_description", nullable = false, length = 45)
    @NonNull
    private String description;


    @Override
    public Integer getId() {
        return id;
    }


}
