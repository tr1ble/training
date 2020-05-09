import getInstance from 'api/getInstance';

export async function getAllCourses() {
  const instance = await getInstance();

  const response = await instance.post('/courses', {});

  return response.data;
}

export async function deleteCourse({ id }: { id: number }) {
  const instance = await getInstance();

  const response = await instance.delete(`/course/${id}`);

  return response.data;
}

export async function getTasksByCourse({ id }: { id: number }) {
  const instance = await getInstance();

  const response = await instance.get(`/tasks/findByCourse/${id}`);

  return response.data;
}

export async function getCourseByTrainer({ id }: { id: number }) {
  const instance = await getInstance();

  const response = await instance.get(`/courses/findByTrainer/${id}`);

  return response.data;
}

export async function createCourse({
  title,
  startDate,
  endDate,
  trainer,
}: {
  title: string;
  startDate: string;
  endDate: string;
  trainer: any;
}) {
  const instance = await getInstance();

  const response = await instance.post("/course", {
    // id: 100,
    title,
    startDate,
    endDate,
    trainer,
  });

  return response.data;
}

export async function registerToCourse({
  firstname,
  surname,
  secondname,
  user,
  course,
}: {
  firstname: string;
  surname: string;
  secondname: string;
  user: any;
  course: any;
}) {
  const instance = await getInstance();

  const response = await instance.post("/student", {
    firstname,
    surname,
    secondname,
    user,
    course
  });

  return response.data;
}

export async function unregisterToCourse({ id }: { id: number }) {
  const instance = await getInstance();

  const response = await instance.post("/unregister", {
    student_id: id,
  });

  return response.data;
}

export async function createTask({
  title,
  description,
  course,
}: {
  title: string;
  description: string;
  course: any;
}) {
  const instance = await getInstance();

  const response = await instance.post("/task", {
    title,
    description,
    course
  });

  return response.data;
}

export async function createCompletedTask({
  title,
  description,
  course,
  feedback,
  mark,
  student,
  id,
}: {
  id: number;
  title: string;
  description: string;
  feedback: string;
  course: any;
  mark: number;
  student: any;
}) {
  const instance = await getInstance();

  const response = await instance.post("/completedtask", {
    title,
    description,
    course,
    feedback,
    mark,
    student,
    id,
  });

  return response.data;
}

export async function updateCompletedTask({
  title,
  description,
  course,
  feedback,
  mark,
  student,
  id,
}: {
  id: number;
  title: string;
  description: string;
  feedback: string;
  course: any;
  mark: number;
  student: any;
}) {
  const instance = await getInstance();

  const response = await instance.put("/completedTask", {
    title,
    description,
    course,
    feedback,
    mark,
    student,
    id,
  });

  return response.data;
}
