import { action, observable, runInAction, configure } from "mobx";
import history from "global/history";
import {
  register,
  loginAttempt,
  getAllUsers,
  deleteUser,
  updateUserRole
} from "api/auth";
import {
  getAllCourses,
  createCourse,
  deleteCourse,
  registerToCourse,
  unregisterToCourse,
  getTasksByCourse
} from 'api/courses';
import { getAllTrainers, createTrainer, deleteTrainer } from 'api/trainers';
import { getAllStudents, getStudent } from 'api/students';

configure({ enforceActions: "observed" });

class ProfileState {
  @observable login = "01";
  @observable role:
    | 'ROLE_STUDENT'
    | 'ROLE_TRAINER'
    | 'ROLE_ADMINISTRATOR'
    | undefined = "ROLE_STUDENT";
  @observable loginedStudent: any = false;
  @observable myCourse: any = false;
  @observable all_users = [];
  @observable all_students = [];
  @observable all_trainers = [];
  @observable all_courses = [];

  @observable all_tasks_by_course = [];

  @action initAdminPage = async () => {
    try {
      this.getAllStudents();
      this.getAllTrainers();
      this.getAllUsers();
      this.getAllCourses();
    } catch (error) {
      console.log(error);
    }
  };

  @action clearStudentProfile = () => {
    runInAction(() => {
      this.loginedStudent = false;
      this.myCourse = false;
    });
  };

  @action initStudentProfile = async () => {
    try {
      //this.getStudent({})
      this.getAllCourses();
    } catch (error) {
      console.log(error);
    }
  };

  @action getAllTasksByCourse = async () => {
    try {
      const response = await getTasksByCourse({ id: this.myCourse.id });
      runInAction(() => {
        this.all_tasks_by_course = response;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action getAllStudents = async () => {
    try {
      const response = await getAllStudents();
      console.log(response);
      runInAction(() => {
        this.all_students = response;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action getAllUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log(response);
      runInAction(() => {
        this.all_users = response;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action getAllTrainers = async () => {
    try {
      const response = await getAllTrainers();
      runInAction(() => {
        this.all_trainers = response;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action getAllCourses = async () => {
    try {
      const response = await getAllCourses();
      runInAction(() => {
        this.all_courses = response;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action deleteUser = async ({ login }: { login: string }) => {
    try {
      await deleteUser({ login });
      this.getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  @action deleteTrainer = async ({
    id,
    login,
    password
  }: {
    id: number;
    login: string;
    password: string;
  }) => {
    try {
      await deleteTrainer({ id });
      await updateUserRole({ login, password, role: "ROLE_STUDENT" });
      await this.getAllUsers();
      await this.getAllTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  @action deleteCourse = async ({ id }: { id: number }) => {
    try {
      await deleteCourse({ id });
      //await updateUserRole({ login, password, role: "ROLE_STUDENT" });
      await this.getAllCourses();
      //await this.getAllTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  @action createTrainer = async ({
    firstname,
    surname,
    secondname,
    user,
  }: {
    firstname: string;
    surname: string;
    secondname: string;
    user: { login: string; password: string; role: string };
  }) => {
    try {
      await createTrainer({ firstname, secondname, surname, user });
      await updateUserRole({
        login: user.login,
        password: user.password,
        role: "ROLE_TRAINER"
      });
      this.getAllUsers();
      this.getAllTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  @action createCourse = async ({
    title,
    startDate,
    endDate,
    trainer
  }: {
    title: string;
    startDate: string;
    endDate: string;
    trainer: any;
  }) => {
    try {
      await createCourse({ title, startDate, endDate, trainer });

      this.getAllTrainers();
      this.getAllCourses();
    } catch (error) {
      console.log(error);
    }
  };

  @action createStudent = async ({
    firstname,
    surname,
    secondname,
    user,
    course,
  }: {
    firstname: string;
    surname: string;
    secondname: string;
    course: any;
    user: any;
  }) => {
    try {
      await registerToCourse({ firstname, surname, secondname, user, course });
    } catch (error) {
      console.log(error);
    }
  };

  leaveCourse = async () => {
    try {
      await unregisterToCourse({ id: this.loginedStudent.id });

      runInAction(() => {
        this.myCourse = false;
        this.loginedStudent = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action getLoginedStudent = async ({ username }: { username: string }) => {
    try {
      const result = await getStudent({ username });
      await this.getAllTasksByCourse();

      runInAction(() => {
        this.myCourse = result.course;
        this.loginedStudent = result;
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProfileState;
