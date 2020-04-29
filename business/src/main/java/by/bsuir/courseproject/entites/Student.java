package by.bsuir.courseproject.entites;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @Basic
    @Column(name="firstname", length = 45, nullable = false)
    private String firstname;
    @Basic
    @Column(name="surname", length = 45, nullable = false)
    private String surname;
    @Basic
    @Column(name="secondname", length = 45, nullable = true)
    private String secondname;


    @Override
    public Integer getId() {
        return id;
    }

}
