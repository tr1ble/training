import AuthState from "./AuthState";
import ProfileState from "./ProfileState";
import TrainerState from "./TrainerState";

class Store {
  authState = new AuthState();
  profileState = new ProfileState();
  trainerState = new TrainerState();
}

const store = new Store();

export default store;
