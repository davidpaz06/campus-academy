import "./CreateCourse.css";

//Interfaces
import type { CourseProps, CourseModule, CourseLesson } from "@/interfaces/createCourseInterfaces";

export default function CourseSummary({
  course,
  setStep,
  step,
  setActiveModule,
}: CourseProps & {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
  setActiveModule: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <aside className="create-course-summary">
      <label className="course-name">
        <h2>{course.info.name}</h2>
        <section className="course-extras">
          {course.info.about ? (
            <label>
              <strong>About</strong>
              <p>{course.info.about}</p>
            </label>
          ) : null}
          {course.info.instructor ? (
            <label>
              <strong>Instructor</strong>
              <p>{course.info.instructor}</p>
            </label>
          ) : null}
          {course.info.skills.length > 0 ? (
            <label>
              <strong>Skills</strong>
              <p>{course.info.skills.join(", ")}</p>
            </label>
          ) : null}
        </section>
      </label>
      <div className="module-list">
        {course.modules.map((module: CourseModule, moduleIndex: number) => (
          <div key={moduleIndex} className="module-summary" onClick={() => setActiveModule(moduleIndex)}>
            <h3 className="module-title">{module.title}</h3>
            <ul>
              {module.lessons.map((lesson: CourseLesson, lessonIndex: number) => (
                <li key={lessonIndex} className="lesson-summary">
                  <p className="lesson">
                    <strong>{lesson.type}</strong>: {lesson.title}
                  </p>
                </li>
              ))}
            </ul>
            <p className="module-number">Module {moduleIndex + 1}</p>
          </div>
        ))}
      </div>

      <footer className="create-course-summary-footer">
        <button className="create-course-button" type="button" onClick={() => setStep(step - 1)}>
          Back
        </button>
        <button className="create-course-button" type="button" onClick={() => setStep(step + 1)}>
          Next
        </button>
      </footer>
    </aside>
  );
}
