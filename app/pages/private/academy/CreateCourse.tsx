import React from "react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import {
  getNavClass,
  getModuleClass,
  handleSubmit,
  handleKeyDown,
} from "@/utils/courseUtils";
//Interfaces
import type {
  Course,
  CourseModule,
  CourseLesson,
} from "@/interfaces/createCourseInterfaces";
//Styles
import "./CreateCourse.css";
//Pages
import CreateCourseInfo from "./CreateCourseInfo";
import CreateModule from "../../../components/createcourse/CreateModule";
import CreateCourseLessonList from "@/components/createcourse/CreateCourseLessonList";
// Components
import EditableText from "@/components/EditableText";

const InitialStep = 2;

const emptyCourse: Course = {
  id: "",
  info: {
    name: "",
    instructor: "",
    about: "",
    description: "",
    skills: [],
  },
  modules: [
    {
      title: "Click to edit",
      lessons: [],
    },
  ],
};

export default function CreateCourse() {
  const courseContentRef = React.useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const [course, setCourse] = useState<Course>(() => {
    try {
      const stored = localStorage.getItem("courseDraft");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate shape and ensure at least one module
        if (
          parsed &&
          typeof parsed === "object" &&
          parsed.info &&
          typeof parsed.info === "object" &&
          Array.isArray(parsed.modules)
        ) {
          if (parsed.modules.length === 0) {
            parsed.modules = [
              {
                title: "> Click to edit <",
                lessons: [],
              },
            ];
          }
          return parsed;
        }
      }
    } catch (e) {
      // ignore parse errors
    }
    return emptyCourse;
  });

  useEffect(() => {
    localStorage.setItem("courseDraft", JSON.stringify(course));
  }, [course]);

  const [step, setStep] = useState(InitialStep);

  // Local wrappers for imported utils
  const [activeModule, setActiveModule] = useState<number>(0);

  switch (step) {
    case 1:
      return (
        <form
          className="create-course-step-1"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <CreateCourseInfo setCourse={setCourse} course={course} />
          <section className="button-container">
            <button
              className="create-course-button"
              type="button"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </section>
        </form>
      );

    case 2:
      return (
        <div className="create-course-step-2">
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
              {course.modules.map(
                (module: CourseModule, moduleIndex: number) => (
                  <div
                    key={moduleIndex}
                    className="module-summary"
                    onClick={() => setActiveModule(moduleIndex)}
                  >
                    <h3 className="module-title">{module.title}</h3>
                    <ul>
                      {module.lessons.map(
                        (lesson: CourseLesson, lessonIndex: number) => (
                          <li key={lessonIndex} className="lesson-summary">
                            <p className="lesson">
                              <strong>{lesson.type}</strong>: {lesson.title}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                    <p className="module-number">Module {moduleIndex + 1}</p>
                  </div>
                )
              )}
            </div>

            <footer className="create-course-summary-footer">
              <button
                className="create-course-button"
                type="button"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <button
                className="create-course-button"
                type="button"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            </footer>
          </aside>
          <form
            className="create-course-form"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <section
              className={`create-course-nav ${getNavClass(
                activeModule,
                course.modules.length
              )}`}
            >
              <div
                className="nav-button prev-module-button"
                onClick={() => setActiveModule(activeModule - 1)}
              >
                <Icon
                  className="nav-icon prev-icon"
                  icon="material-symbols:arrow-back-rounded"
                />
              </div>
              <div className="create-course-active-module">
                <EditableText
                  value={course.modules[activeModule].title}
                  onChange={(newTitle) => {
                    const updatedModules = [...course.modules];
                    updatedModules[activeModule] = {
                      ...updatedModules[activeModule],
                      title: newTitle,
                    };
                    setCourse({ ...course, modules: updatedModules });
                  }}
                  className="active-module-input"
                  placeholder="Click to edit title"
                />
              </div>
              <div
                className="nav-button next-module-button"
                onClick={() => setActiveModule(activeModule + 1)}
              >
                <Icon
                  className="nav-icon next-icon"
                  icon="material-symbols:arrow-forward-rounded"
                />
                <Icon
                  className="nav-icon add-icon"
                  icon="material-symbols:add-rounded"
                />
              </div>
            </section>
            <section className="create-course-content" ref={courseContentRef}>
              {course.modules.map((_, idx) => (
                <div
                  key={idx}
                  className={`module-box ${getModuleClass(idx, activeModule)}`}
                >
                  <CreateCourseLessonList
                    setCourse={setCourse}
                    course={course}
                    moduleIndex={idx}
                  />
                  <CreateModule
                    setCourse={setCourse}
                    course={course}
                    moduleIndex={activeModule}
                  />
                </div>
              ))}
            </section>
          </form>
        </div>
      );
  }
}
