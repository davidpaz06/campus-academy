import { useState, useEffect } from "react";

// Styles
import "./CreateCourse.css";

// Interfaces
import type { Course } from "@/interfaces/createCourseInterfaces";

// Pages
import CreateCourseContent from "./CreateCourseContent";

// Components
import CreateCourseInfo from "./CreateCourseInfo";
import CourseSummary from "./CourseSummary";
// Utils
import { handleSubmit, handleKeyDown, getCourseFromLocalStorage, saveCourseToLocalStorage } from "@/utils/courseUtils";

const emptyCourse: Course = {
  id: "",
  info: {
    name: "",
    about: "",
    description: "",
    instructor: "",
    skills: [],
  },
  modules: [
    {
      title: "> Click to edit <",
      lessons: [],
    },
  ],
};

const InitialStep = 1;

export default function CreateCourse() {
  const [step, setStep] = useState(InitialStep);

  const [course, setCourse] = useState<Course>(() => getCourseFromLocalStorage(emptyCourse));
  useEffect(() => {
    saveCourseToLocalStorage(course);
  }, [course]);

  const [activeModule, setActiveModule] = useState<number>(0);
  switch (step) {
    case 1:
      {
        /* - - - - - - - - - - - - Course Information - - - - - - - - - - - - */
      }
      return (
        <form className="create-course-step-1" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <CreateCourseInfo setCourse={setCourse} course={course} />
          <section className="button-container">
            <button className="create-course-button" type="button" onClick={() => setStep(step + 1)}>
              Next
            </button>
          </section>
        </form>
      );

    case 2:
      {
        /* - - - - - - - - - - - - Course Content - - - - - - - - - - - - */
      }
      return (
        <div className="create-course-step-2">
          <CourseSummary
            setCourse={setCourse}
            course={course}
            setStep={setStep}
            step={step}
            setActiveModule={setActiveModule}
          />
          <CreateCourseContent
            setCourse={setCourse}
            course={course}
            setActiveModule={setActiveModule}
            activeModule={activeModule}
          />
        </div>
      );

    case 3:
      {
        /* - - - - - - - - - - - - Course Review - - - - - - - - - - - - */
      }
      return (
        <div className="create-course-step-3">
          <div className="summary">
            <div className="name">Course name</div>
            <div className="basic-info">Basic Information</div>
            <div className="modules">
              <ul>
                {course.modules.map((module, index) => (
                  <li key={index}>{module.title}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="course-about"></div>
          <div className="course-actions">
            <button type="button" onClick={() => setStep(step - 1)}>
              Back
            </button>
            <button type="submit">Create Course</button>
          </div>
        </div>
      );
  }
}
