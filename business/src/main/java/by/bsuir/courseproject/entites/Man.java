package by.bsuir.courseproject.entites;


import lombok.experimental.SuperBuilder;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@SuperBuilder
public class Man {

    @Basic
    @Column(name="firstname", length = 45, nullable = false)
    private String firstname;
    @Basic
    @Column(name="surname", length = 45, nullable = false)
    private String surname;
    @Basic
    @Column(name="secondname", length = 45, nullable = true)
    private String secondname;


    //package private
    Man() {
    }


    //package private
    Man(String firstname, String surname, String secondname) {
        this.firstname = firstname;
        this.surname = surname;
        this.secondname = secondname;
    }

}
