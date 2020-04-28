import { action, observable, runInAction, configure } from "mobx";
import history from "global/history";
import { register, loginAttempt } from "api/auth";

configure({ enforceActions: "observed" });

class AuthState {
  @observable isAlertVisible = false;
  @observable textAlert = "";
  @observable typeAlert: "warning" | "error" | "success" = "warning";

  @observable login = '';
  @observable password: string | null = '';

  @observable role:
    | "ROLE_STUDENT"
    | "ROLE_TRAINER"
    | "ROLE_ADMINISTRATOR"
    | undefined = undefined;

  @observable authorized = false;

  @action logOut = () => {
    runInAction(() => {
      this.authorized = false;
      this.login = "";
      this.password = "";
      this.role = undefined;
    });
    localStorage.setItem('authorized', "false");
    localStorage.setItem('login', "");
    localStorage.setItem('password', "");
    localStorage.setItem('role', "");
  };

  @action hideAlert = () => {
    runInAction(() => {
      this.isAlertVisible = false;
      this.textAlert = "";
      this.typeAlert = "warning";
    });
  };

  @action showAlert = (
    text: string,
    type?: "warning" | "error" | "success"
  ) => {
    runInAction(() => {
      this.isAlertVisible = true;
      this.textAlert = text;
      if (type) {
        this.typeAlert = type;
      }
    });

    setTimeout(() => {
      this.hideAlert();
    }, 5000);
  };

  @action tryRegister = async ({
    login,
    password,
    role
  }: {
    login: string;
    password: string;
    role: string;
  }) => {
    try {
      await register({
        login,
        password,
        role: "ROLE_STUDENT"
      });
      this.showAlert("Пользователь успешно зарегестрирован", "success");
      history.goBack();
    } catch (error) {
      this.showAlert("Ошибка регистрации", "error");
    }
  };

  @action tryLogin = async ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    try {
      const { token, role } = await loginAttempt({ login, password });
      runInAction(() => {
        this.authorized = true;
        this.login = login;
        this.role = role;
        this.password = password;
      });
      localStorage.setItem('authorized', "true");
      localStorage.setItem('login', login);
      localStorage.setItem('role', role);
      localStorage.setItem('password', password);
    } catch (error) {
      this.showAlert("Ошибка входа", "error");
    }
  };

  @action autoLogin = async () => {
    const authorized = localStorage.getItem('authorized') == 'true';
    const login = localStorage.getItem("login");
    const password = localStorage.getItem("password");
    const role = localStorage.getItem("role");

    const resRole = role === null ? undefined : role;

    if (
      resRole == "ROLE_STUDENT" ||
      resRole == "ROLE_TRAINER" ||
      resRole == "ROLE_ADMINISTRATOR"
    ) {
      if (authorized && login) {
        runInAction(() => {
          this.authorized = true;
          this.role = resRole;
          this.login = login;
          this.password = password;
        });
      }
    }
  };

  @action setAuthorized = () => {
    runInAction(() => {
      this.authorized = true;
    });
  };
}

export default AuthState;
