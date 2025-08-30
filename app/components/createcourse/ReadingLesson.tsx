import type { Course, CourseModule } from "@/interfaces/createCourseInterfaces";
import React from "react";
import EditableText from "../EditableText";

interface ReadingLessonProps {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  module: CourseModule;
  lesson: number;
}

export default function ReadingLesson({
  course,
  setCourse,
  module,
  lesson,
}: ReadingLessonProps) {
  const lessonData = module.lessons[lesson];
  return (
    <>
      <EditableText
        value={lessonData.title}
        onChange={(newTitle) => {
          module.lessons[lesson].title = newTitle;
          setCourse({ ...course });
        }}
        className="lesson-title-editable"
        placeholder="Click to edit lesson title"
      />
      <p>
        {lessonData.file
          ? lessonData.file
          : "This is a reading lesson component."}
      </p>
    </>
  );
}
