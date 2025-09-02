import React, { useState } from "react";
import type {
  CourseLesson,
  CourseProps,
} from "@/interfaces/createCourseInterfaces";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import EditableText from "@/components/EditableText";
import ReactMarkdown from "react-markdown";

type ReadingLessonProps = {
  lesson: CourseLesson;
  onTitleChange: (newTitle: string) => void;
} & Pick<CourseProps, "setCourse" | "course" | "moduleIndex" | "lessonIndex">;

const ReadingLesson: React.FC<ReadingLessonProps> = ({
  lesson,
  onTitleChange,
  setCourse,
  course,
  moduleIndex,
  lessonIndex,
}) => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  // Actualiza el contenido markdown en la lección y en el estado global
  const handleMarkdownChange = (value: string) => {
    if (
      typeof moduleIndex === "number" &&
      typeof lessonIndex === "number" &&
      setCourse
    ) {
      const updatedCourse = { ...course };
      updatedCourse.modules[moduleIndex].lessons[lessonIndex].file = value;
      setCourse(updatedCourse);
    }
  };

  return (
    <div className="lesson-reading">
      <EditableText
        value={lesson.title}
        onChange={onTitleChange}
        className="lesson-title-editable"
        placeholder="Click to edit lesson title"
      />
      <ReactMde
        value={lesson.file || ""}
        onChange={handleMarkdownChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
        childProps={{
          writeButton: { tabIndex: -1 },
        }}
        minEditorHeight={120}
        maxEditorHeight={400}
        toolbarCommands={[
          ["bold", "italic", "strikethrough", "link"],
          ["unordered-list", "ordered-list", "table"],
        ]}
      />
    </div>
  );
};

export default ReadingLesson;
