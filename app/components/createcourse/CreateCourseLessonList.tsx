import "./CreateCourseLessonList.css";

import type { CourseProps } from "@/interfaces/createCourseInterfaces";
import Card from "@/components/Card";
import EditableText from "@/components/EditableText";
import ReadingLesson from "./lessoncard/ReadingLesson";
import VideoLesson from "./lessoncard/VideoLesson";

export default function CreateCourseLessonList({
  setCourse,
  course,
  moduleIndex,
}: CourseProps) {
  const module = course.modules[moduleIndex ? moduleIndex : 0];
  return (
    <div className="create-course-lesson-list">
      <h2>Lessons</h2>
      <ul>
        {module.lessons.map((lesson, idx) => (
          <Card key={idx} className="lesson-card">
            {lesson.type === "Reading" && (
              <ReadingLesson
                course={course}
                setCourse={setCourse}
                moduleIndex={moduleIndex}
                lessonIndex={idx}
              />
            )}
            {lesson.type === "Video" && (
              <VideoLesson
                setCourse={setCourse}
                course={course}
                moduleIndex={moduleIndex}
                lessonIndex={idx}
              />
            )}
            {lesson.type === "Test" && (
              <div className="lesson-test">
                <EditableText
                  value={lesson.title}
                  onChange={(newTitle) => {
                    module.lessons[idx].title = newTitle;
                    setCourse({ ...course });
                  }}
                  className="lesson-title-editable"
                  placeholder="Click to edit lesson title"
                />
                <p>{lesson.file}</p>
              </div>
            )}
          </Card>
        ))}
      </ul>
    </div>
  );
}
