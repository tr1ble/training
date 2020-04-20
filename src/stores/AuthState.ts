import { action, observable, runInAction, configure } from 'mobx';

configure({ enforceActions: 'observed' });

class AuthState {
  @observable token = '';
  @observable authorized = false;

  @action setNotAuthorized = () => {
    runInAction(() => {
      this.token = '';
      this.authorized = false;
    });
  };

  @action setAuthorized = () => {
    runInAction(() => {
      this.authorized = true;
    });
  };
}

export default AuthState;
