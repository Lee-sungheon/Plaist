import MyCourseSearch from "./MyCourseSearch";
import MyCourseCards from "./MyCourseCards";
export default function MyAllCourse() {
  return (
    <div className="flex flex-col items-center justify-center">
      <MyCourseSearch />
      <MyCourseCards />
    </div>
  );
}
