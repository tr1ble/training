package by.bsuir.courseproject.entites;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
@Table(name="completed_task", schema = "training")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompletedTask extends Task {


   @Basic
   @Column(name="mark", nullable = false)
   @Min(0)
   @Max(10)
   private double mark;

   @Basic
   @Column(name="feedback", nullable = false)
   private String feedback;

   @Basic
   @Column(name="student", length = 75, nullable = false)
   private String student;


}
