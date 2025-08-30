import { Icon } from "@iconify/react";
import type {
  CourseLesson,
  CourseProps,
} from "@/interfaces/createCourseInterfaces";

export default function CreateModule({
  setCourse,
  module = 0,
  onLessonAdded,
}: CourseProps & { onLessonAdded?: () => void }) {
  const handleCreateLesson = (module: number, lesson: CourseLesson) => {
    setCourse((prevCourse) => {
      const updatedModules = [...prevCourse.modules];
      updatedModules[module] = {
        ...updatedModules[module],
        lessons: [...updatedModules[module].lessons, lesson],
      };
      return { ...prevCourse, modules: updatedModules };
    });
    if (onLessonAdded) {
      onLessonAdded();
    }
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
            handleCreateLesson(module, {
              title: "New Reading Lesson",
              type: "Reading",
              file: "<Reading_file>",
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
            handleCreateLesson(module, {
              title: "New Video Lesson",
              type: "Video",
              file: "<Video_file>",
            })
          }
        />
        <Icon
          style={{
            color: "var(--charlestone--green)",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          icon="material-symbols:unknown-document-rounded"
          onClick={() =>
            handleCreateLesson(module, {
              title: "New Test",
              type: "Test",
              file: "<Test_file>",
            })
          }
        />
      </div>
    </>
  );
}
