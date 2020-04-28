import getInstance from 'api/getInstance';
import { strict } from 'assert';
import Axios from 'axios';

export async function register({
  login,
  password,
  role
}: {
  login: string;
  password: string;
  role: string;
}) {
  const instance = await getInstance();

  const response = await instance.post('/register', {
    login,
    password,
    role,
  });

  return response.data;
}

export async function loginAttempt({
  login,
  password
}: {
  login: string;
  password: string;
}) {
  const instance = await getInstance();

  const response = await instance.post("/login", {
    login,
    password,
  });

  return response.data;
}

export async function getAllUsers() {
  const instance = await getInstance();

  const response = await instance.post("/users");

  console.log(response);

  return response.data;
}

export async function updateUserRole({
  login,
  role,
  password,
}: {
  login: string;
  role: string;
  password: string;
}) {
  const instance = await getInstance();

  const response = await instance.put("/user", {
    login,
    role,
    password,
  });

  console.log(response);

  return response.data;
}

export async function deleteUser({ login }: { login: string }) {
  const instance = await getInstance();

  const response = await instance.delete(`/user/${login}`);

  console.log(response);

  return response.data;
}
