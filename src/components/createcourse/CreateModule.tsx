import "./CreateModule.css";
import { Icon } from "@iconify/react";
import type { CourseProps, CourseLesson } from "@/types/createcourse";
import { deleteModule, handleLessonAdded, createModule } from "@/utils/courseUtils";

export default function CreateModule({
  setCourse,
  course,
  moduleIndex,
  setActiveModule,
  courseContentRef,
}: CourseProps & {
  setActiveModule: (idx: number) => void;
  courseContentRef?: React.RefObject<HTMLDivElement>;
}) {
  const handleCreateLesson = (lesson: CourseLesson) => {
    handleLessonAdded(setCourse, moduleIndex ?? 0, lesson, courseContentRef);
  };

  return (
    <div className="create-lessons">
      <Icon
        className="create-lesson-icon"
        icon="material-symbols:add-rounded"
        onClick={() => createModule(setCourse, course, setActiveModule)}
      />
      <div className="create-lesson-options">
        <Icon
          className="create-lesson-icon"
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
          className="create-lesson-icon"
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
          className="create-lesson-icon"
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
      <Icon
        className="create-lesson-icon"
        icon="material-symbols:delete-rounded"
        onClick={() => {
          deleteModule(setCourse, setActiveModule, moduleIndex);
        }}
      />
    </div>
  );
}
