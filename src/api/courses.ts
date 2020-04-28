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
  id,
  title,
  startDate,
  endDate,
  trainer
}: {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  trainer: object;
}) {
  const instance = await getInstance();

  const response = await instance.post('/course', {
    id,
    title,
    startDate,
    endDate,
    trainer
  });

  return response.data;
}
