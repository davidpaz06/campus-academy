import "./CreateCourseLessonList.css";

import type { Course, CourseModule } from "@/interfaces/createCourseInterfaces";
import Card from "@/components/Card";
import EditableText from "@/components/EditableText";
import ReadingLesson from "./ReadingLesson";

export default function CreateCourseLessonList({
  module,
  course,
  setCourse,
}: {
  module: CourseModule;
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
}) {
  return (
    <div className="create-course-lesson-list">
      <h2>Lessons</h2>
      <ul>
        {module.lessons.map((lesson, idx) => (
          <Card key={idx} className="lesson-card">
            <li>
              {lesson.type === "Reading" && (
                <div className="lesson-reading">
                  <ReadingLesson
                    course={course}
                    setCourse={setCourse}
                    module={module}
                    lesson={idx}
                  />
                </div>
              )}
              {lesson.type === "Video" && (
                <div className="lesson-video">
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
            </li>
          </Card>
        ))}
      </ul>
    </div>
  );
}
