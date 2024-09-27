/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { httpInterceptedService } from "../core/http-service";
import CoursesList from "../features/courses/CoursesList";
import HeaderPanel from "../components/HeaderPanel";

function Courses() {
  const data = useLoaderData();
  return (
    <div>
      <HeaderPanel name=" همه دوره ها" />
      <Suspense
        fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}
      >
        <Await resolve={data.courses}>
          {(loadCourses) => <CoursesList courses={loadCourses} />}
        </Await>
      </Suspense>
    </div>
  );
}
export default Courses;

export async function coursesLoader() {
  return defer({
    courses: loadCourses(),
  });
}

async function loadCourses() {
  const response = await httpInterceptedService.get("/Course/list");
  return response.data;
}
