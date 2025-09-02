import { Icon } from "@iconify/react";
import type {
  CourseProps,
  CourseLesson,
} from "@/interfaces/createCourseInterfaces";

export default function CreateModule({ setCourse, moduleIndex }: CourseProps) {
  const handleCreateLesson = (lesson: CourseLesson) => {
    setCourse((prevCourse) => {
      const updatedModules = [...prevCourse.modules];
      updatedModules[moduleIndex ? moduleIndex : 0] = {
        ...updatedModules[moduleIndex ? moduleIndex : 0],
        lessons: [
          ...updatedModules[moduleIndex ? moduleIndex : 0].lessons,
          lesson,
        ],
      };
      return { ...prevCourse, modules: updatedModules };
    });
  };

  return (
    <>
      <div
        className="create-lessons"
        style={{
          display: "flex",

          gap: "var(--spacing-xxl)",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderRadius: "var(--radius)",
          padding: "1rem",
          marginBottom: "50px",
        }}
      >
        <Icon
          style={{
            color: "var(--charlestone--green)",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          icon="material-symbols:book-ribbon-rounded"
          onClick={() =>
            handleCreateLesson({
              title: "New Reading Lesson",
              type: "Reading",
              file: "",
            })
          }
        />
        <Icon
          style={{
            color: "var(--charlestone--green)",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          icon="material-symbols:smart-display-rounded"
          onClick={() =>
            handleCreateLesson({
              title: "New Video Lesson",
              type: "Video",
              file: "https://jberbbpslngklbsakuzz.supabase.co/storage/v1/object/public/Campus%20Academy%20Storage/videos/default-lesson-video.mp4",
              duration: 0,
            })
          }
        />
        {/* <Icon
          style={{
            color: "var(--charlestone--green)",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          icon="material-symbols:unknown-document-rounded"
          onClick={() =>
            handleCreateLesson({
              title: "New Test",
              type: "Test",
              file: "<Test_file>",
            })
          }
        /> */}
      </div>
    </>
  );
}
