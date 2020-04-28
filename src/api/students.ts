import getInstance from 'api/getInstance';

export async function getAllStudents() {
  const instance = await getInstance();

  const response = await instance.post('/students');

  console.log(response);

  return response.data;
}
