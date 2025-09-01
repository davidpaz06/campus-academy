import type { CourseLesson } from "@/interfaces/createCourseInterfaces";
import React from "react";
import EditableText from "@/components/EditableText";

interface ReadingLessonProps {
  lesson: CourseLesson;
  onTitleChange: (newTitle: string) => void;
}

const ReadingLesson: React.FC<ReadingLessonProps> = ({
  lesson,
  onTitleChange,
}) => {
  return (
    <div className="lesson-reading">
      <EditableText
        value={lesson.title}
        onChange={onTitleChange}
        className="lesson-title-editable"
        placeholder="Click to edit lesson title"
      />
      <p>{lesson.file ? lesson.file : "This is a reading lesson component."}</p>
    </div>
  );
};

export default ReadingLesson;
