package by.bsuir.courseproject.entites;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="task")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task implements Identifable {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Basic
    @Column(name="title", nullable = false, length = 45)
    private String title;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Basic
    @Column(name="task_description", nullable = false, length = 45)
    private String description;

    @Override
    public Integer getId() {
        return id;
    }


}
