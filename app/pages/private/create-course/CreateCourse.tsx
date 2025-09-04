import { useState, useEffect } from "react";

// Styles
import "./CreateCourse.css";

// Interfaces
import type { Course } from "@/interfaces/createCourseInterfaces";

// Steps Components
import CreateCourseInfo from "./CreateCourseInfo";
import CourseSummary from "./CourseSummary";
import CreateCourseContent from "./CreateCourseContent";
import CreateCourseReview from "./CreateCourseReview";

// Utils
import { getCourseFromLocalStorage, saveCourseToLocalStorage, handleKeyDown, handleSubmit } from "@/utils/courseUtils";

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

const InitialStep = 3;

export default function CreateCourse() {
  const [step, setStep] = useState(InitialStep);

  const [course, setCourse] = useState<Course>(() => getCourseFromLocalStorage(emptyCourse));
  useEffect(() => {
    saveCourseToLocalStorage(course);
  }, [course]);

  const [activeModule, setActiveModule] = useState<number>(0);

  switch (step) {
    case 1:
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
      return (
        <div className="create-course-step-3">
          <CreateCourseReview setCourse={setCourse} course={course} setStep={setStep} step={step} />
        </div>
      );

    default:
      return setStep(InitialStep);
  }
}
