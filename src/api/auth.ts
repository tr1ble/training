import getInstance from "api/getInstance";

export async function register({
  login,
  password,
  role,
}: {
  login: string;
  password: string;
  role: string;
}) {
  const instance = await getInstance();

  const response = await instance.post("/register", {
    login,
    password,
    role
  });

  return response.data;
}

export async function loginAttempt({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  const instance = await getInstance();

  const response = await instance.post('/login', {
    login,
    password
  });

  return response.data;
}
