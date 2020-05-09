import { action, observable, runInAction, configure } from 'mobx';
import history from 'global/history';
import {
  register,
  loginAttempt,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from 'api/auth';
import {
  getAllCourses,
  createCourse,
  deleteCourse,
  registerToCourse,
  unregisterToCourse,
  getTasksByCourse,
  getCourseByTrainer,
  createTask,
  createCompletedTask,
  updateCompletedTask
} from "api/courses";
import {
  getAllTrainers,
  createTrainer,
  deleteTrainer,
  getTrainer
} from "api/trainers";
import {
  getAllStudents,
  getStudent,
  getStudentsByCourse,
  getCompletedTasksByStudent
} from "api/students";

configure({ enforceActions: 'observed' });

class TrainerState {
  @observable loading: boolean = false;
  @observable selectedStudent: any = false;
  @observable course: any = false;
  @observable courseTasks: any = false;
  @observable completedTasks: any = false;

  @action init = async () => {
    if (this.selectedStudent) {
      try {
        runInAction(() => {
          this.loading = true;
        });
        const response = await getCompletedTasksByStudent({
          id: this.selectedStudent.id
        });

        runInAction(() => {
          this.completedTasks = response;
          this.loading = false;
        });
      } catch (e) {
        runInAction(() => {
          this.loading = false;
        });
      }
    }
  };

  @action createCompletedTask = ({
    title,
    description,
    feedback,
    mark,
    id,
  }: {
    title: string;
    description: string;
    feedback: string;
    mark: number;
    id: number;
  }) => {
    try {
      const response = createCompletedTask({
        title,
        description,
        feedback,
        mark,
        id,
        course: this.course,
        student: this.selectedStudent,
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action updateCompletedTask = async ({
    title,
    description,
    feedback,
    mark,
    id,
  }: {
    title: string;
    description: string;
    feedback: string;
    mark: number;
    id: number;
  }) => {
    try {
      const response = await updateCompletedTask({
        title,
        description,
        feedback,
        mark,
        id,
        course: this.course,
        student: this.selectedStudent,
      });

      this.init();
    } catch (error) {
      console.log(error);
    }
  };
}

export default TrainerState;
