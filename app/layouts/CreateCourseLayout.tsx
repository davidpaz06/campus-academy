// import type { Course } from "@/interfaces/createCourseInterfaces";

export default function CreateCourseLayout() {
  return (
    <div
      className="create-course-layout"
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 4fr",
      }}
    >
      <aside></aside>
      <main className="create-course-content" id="create-course-main">
        Layout
      </main>
    </div>
  );
}
