import "./CreateCourseLessonList.css";

import type { CourseModule, Course } from "@/interfaces/createCourseInterfaces";
import Card from "@/components/Card";
import EditableText from "@/components/EditableText";
import ReadingLesson from "./lessoncard/ReadingLesson";
import VideoLesson from "./lessoncard/VideoLesson";
interface CreateCourseLessonListProps {
  module: CourseModule;
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  moduleIndex: number;
}

export default function CreateCourseLessonList({
  module,
  course,
  setCourse,
  moduleIndex,
}: CreateCourseLessonListProps) {
  return (
    <div className="create-course-lesson-list">
      <h2>Lessons</h2>
      <ul>
        {module.lessons.map((lesson, idx) => (
          <Card key={idx} className="lesson-card">
            <li>
              {lesson.type === "Reading" && (
                <ReadingLesson
                  lesson={lesson}
                  onTitleChange={(newTitle) => {
                    module.lessons[idx].title = newTitle;
                    setCourse({ ...course });
                  }}
                />
              )}
              {lesson.type === "Video" && (
                <VideoLesson
                  lesson={lesson}
                  course={course}
                  setCourse={setCourse}
                  moduleIndex={moduleIndex}
                  lessonIndex={idx}
                  onTitleChange={(newTitle) => {
                    module.lessons[idx].title = newTitle;
                    setCourse({ ...course });
                  }}
                  onDurationChange={(duration) => {
                    module.lessons[idx].duration = duration;
                    setCourse({ ...course });
                  }}
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
            </li>
          </Card>
        ))}
      </ul>
    </div>
  );
}
