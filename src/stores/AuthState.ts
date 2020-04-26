import { action, observable, runInAction, configure } from "mobx";
import history from "global/history";
import { register, loginAttempt } from "api/auth";

configure({ enforceActions: "observed" });

class AuthState {
  @observable isAlertVisible = false;
  @observable textAlert = "";
  @observable typeAlert: "warning" | "error" | "success" = "warning";
  @observable login = "";
  @observable role: "ROLE_STUDEND" | "ROLE_TRAINER" | "ROLE_ADMIN" | undefined = undefined;
  @observable authorized = false;

  @action logOut = () => {
    runInAction(() => {
      this.authorized = false;
      this.login = "";
      this.role = undefined;
    });
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
  }:
  {
    login: string;
    password: string;
    role: string;
  }) => {
    try {
      await register({
        login,
        password,
        role
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
      const {token} = await loginAttempt({ login, password });
      runInAction(() => {
       this.authorized = true
       this.login = login
      });
    } catch (error) {
      this.showAlert("Ошибка входа", "error");
    }
  };

  @action setAuthorized = () => {
    runInAction(() => {
      this.authorized = true;
    });
  };
}

export default AuthState;
