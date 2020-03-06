package by.bsuir.courseproject.entites;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="user", schema = "training")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
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

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }
}
