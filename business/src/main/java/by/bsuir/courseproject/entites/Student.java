package by.bsuir.courseproject.entites;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;


@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name="student")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student extends Man implements Identifable {

    @Id
    @Basic
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="user_login")
    private User user;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;


    @Override
    public Integer getId() {
        return id;
    }

}
