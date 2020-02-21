package by.bsuir.courseproject.entites;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="user", schema = "training")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Basic
    @Id
    @Column(name="login", nullable = false, length = 45, unique = true)
    private String login;

    @Basic
    @Column(name="password", nullable = false, length = 45)
    private String password;

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;
}
