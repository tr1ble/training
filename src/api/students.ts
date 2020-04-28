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
