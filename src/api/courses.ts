import getInstance from "api/getInstance";

export async function getAllCourses() {
  const instance = await getInstance();

  const response = await instance.post("/courses", {});

  return response.data;
}

export async function deleteCourse({ id }: { id: number }) {
  const instance = await getInstance();

  const response = await instance.delete(`/course/${id}`);

  return response.data;
}

export async function createCourse({
  title,
  startDate,
  endDate,
  trainer
}: {
  title: string;
  startDate: string;
  endDate: string;
  trainer: any;
}) {
  const instance = await getInstance();

  const response = await instance.post('/course', {
    // id: 100,
    title,
    startDate,
    endDate,
    trainer
  });

  return response.data;
}

export async function registerToCourse({
  firstname,
  surname,
  secondname,
  user,
  course
}: {
  firstname: string;
  surname: string;
  secondname: string;
  user: any;
  course: any;
}) {
  const instance = await getInstance();

  const response = await instance.post('/student', {
    firstname,
    surname,
    secondname,
    user,
    course,
  });

  return response.data;
}
