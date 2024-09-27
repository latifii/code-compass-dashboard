import Course from "./Course";

function CoursesList({ courses }) {
  return (
    <div className="row">
      {courses.map((course) => (
        <Course key={course.id} {...course} />
      ))}
    </div>
  );
}
export default CoursesList;
