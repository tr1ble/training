import getInstance from 'api/getInstance';

export async function getAllTrainers() {
  const instance = await getInstance();

  const response = await instance.post('/trainers');
  console.log(response);
  return response.data;
}

export async function deleteTrainer({ id }: { id: number }) {
  const instance = await getInstance();

  const response = await instance.delete(`/trainer/${id}`);

  return response.data;
}

export async function createTrainer({
  firstname,
  surname,
  secondname,
  user,
}: {
  firstname: string;
  surname: string;
  secondname: string;
  user: {
    login: string;
    password: string;
    role: string;
  };
}) {
  const instance = await getInstance();

  const response = await instance.post("/trainer", {
    firstname,
    surname,
    secondname,
    user,
    busy: false
  });

  return response.data;
}
