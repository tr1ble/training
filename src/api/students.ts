import getInstance from "api/getInstance";

export async function getAllStudents() {
  const instance = await getInstance();

  const response = await instance.post("/students");

  console.log(response);

  return response.data;
}

export async function getStudent({ username }: { username: string }) {
  const instance = await getInstance();

  const response = await instance.get(`/students/findByUser/${username}`);

  console.log(response);

  return response.data;
}

export async function getStudentsByCourse({ id }: { id: number }) {
  const instance = await getInstance();

  const response = await instance.get(`/students/findByCourse/${id}`);

  console.log(response);

  return response.data;
}

export async function getCompletedTasksByStudent({ id }: { id: number }) {
  const instance = await getInstance();

  const response = await instance.get(`/completedtasks/findByStudent/${id}`);
  //const response = await instance.post('/completedTasks/findByStudent', { id });
  console.log(response);

  return response.data;
}
