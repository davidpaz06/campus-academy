// import React from "react";
import { useState, useEffect } from "react";
import { handleSubmit, handleKeyDown, getCourseFromLocalStorage, saveCourseToLocalStorage } from "@/utils/courseUtils";

//Interfaces
import type { Course } from "@/interfaces/createCourseInterfaces";

//Styles
import "./CreateCourse.css";

//Pages
import CreateCourseInfo from "./CreateCourseInfo";
import CreateCourseContent from "./CreateCourseContent";

// Components
import CourseSummary from "./CourseSummary";

const InitialStep = 2;

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
      return <div className="create-course-step-2"></div>;
  }
}
