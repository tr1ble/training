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
  @observable loginedStudent = false;
  @observable myCourse = false;
  @observable all_users = [];
  @observable all_students = [];
  @observable all_trainers = [];
  @observable all_courses = [];

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

  @action initStudentProfile = async () => {
    try {
      //this.getStudent({})
      this.getAllCourses();
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
      //await updateUserRole({ login: user.login, role: "ROLE_TRAINER" });
      //this.getAllUsers();
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
      //await updateUserRole({ login: user.login, role: "ROLE_TRAINER" });
      //this.getAllUsers();
      //this.getAllTrainers();
      //this.getAllCourses();
    } catch (error) {
      console.log(error);
    }
  };

  @action getLoginedStudent = async ({ username }: { username: string }) => {
    try {
      const result = await getStudent({ username });
      //console.log("!");
      //console.log(res);
      runInAction(() => {
        this.myCourse = result.course;
        this.loginedStudent = result;
      });
      //await updateUserRole({ login: user.login, role: "ROLE_TRAINER" });
      //this.getAllUsers();
      //this.getAllTrainers();
      //this.getAllCourses();
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProfileState;
