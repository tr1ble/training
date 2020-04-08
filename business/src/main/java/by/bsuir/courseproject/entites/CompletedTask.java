package by.bsuir.courseproject.entites;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name="completed_task")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompletedTask extends Task {


   @Basic
   @Column(name="mark", nullable = false)
   @Min(0)
   @Max(10)
   private double mark;

   @Basic
   @Column(name="feedback", nullable = false)
   private String feedback;

   @ManyToOne
   @JoinColumn(name="student_id")
   private Student student;

}
