import AuthState from "./AuthState";

class Store {
  authState = new AuthState();
}

const store = new Store();

export default store;
