import { useState } from "react";
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

const InitialStep = 1;

const mockCourse: Course = {
  id: "1",
  info: {
    name: "Backend Development for rookies trying to learn Node.js on AWS instead of PHP",
    instructor: "John Doe",
    about: "This is a sample course.",
    description: "Detailed description of the sample course.",
    skills: ["JavaScript", "React"],
  },
  modules: [
    {
      title: "Introduction to JavaScript",
      lessons: [
        {
          title: "JavaScript Basics",
          type: "Reading",
          file: "This module covers the basics of JavaScript.",
        },
        {
          title: "JavaScript Advanced",
          type: "Video",
          file: "This module dives deep into advanced JavaScript concepts.",
        },
        {
          title: "JavaScript Basics",
          type: "Reading",
          file: "This module covers the basics of JavaScript.",
        },
        {
          title: "JavaScript Test",
          type: "Test",
          file: "<test_file_path>",
        },
      ],
    },
    {
      title: "Introduction to JavaScript",
      lessons: [
        {
          title: "JavaScript Basics",
          type: "Reading",
          file: "This module covers the basics of JavaScript.",
        },
        {
          title: "JavaScript Advanced",
          type: "Reading",
          file: "This module dives deep into advanced JavaScript concepts.",
        },
      ],
    },
    {
      title: "Introduction to JavaScript",
      lessons: [
        {
          title: "JavaScript Basics",
          type: "Reading",
          file: "This module covers the basics of JavaScript.",
        },
        {
          title: "JavaScript Advanced",
          type: "Reading",
          file: "This module dives deep into advanced JavaScript concepts.",
        },
      ],
    },
    {
      title: "Introduction to JavaScript",
      lessons: [
        {
          title: "JavaScript Basics",
          type: "Reading",
          file: "This module covers the basics of JavaScript.",
        },
        {
          title: "JavaScript Advanced",
          type: "Reading",
          file: "This module dives deep into advanced JavaScript concepts.",
        },
      ],
    },
    {
      title: "Advanced React",
      lessons: [
        {
          title: "React Hooks",
          type: "Reading",
          file: "This module covers the basics of React Hooks.",
        },
        {
          title: "State Management",
          type: "Reading",
          file: "This module dives deep into state management in React.",
        },
      ],
    },
    {
      title: "Advanced React",
      lessons: [
        {
          title: "React Hooks",
          type: "Reading",
          file: "This module covers the basics of React Hooks.",
        },
        {
          title: "State Management",
          type: "Reading",
          file: "This module dives deep into state management in React.",
        },
      ],
    },
  ],
};

export default function CreateCourse() {
  const [course, setCourse] = useState<Course>(
    //   {
    //   id: "",
    //   info: {
    //     name: "",
    //     instructor: "",
    //     about: "",
    //     description: "",
    //     skills: [],
    //   },
    //   modules: [],
    // }
    mockCourse
  );
  const [step, setStep] = useState(InitialStep);

  const handleStepChange = (action: string) => {
    action == "next" ? setStep(step + 1) : setStep(step - 1);
    console.log(course);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  interface HandleKeyDownEvent extends React.KeyboardEvent<HTMLFormElement> {
    target: HTMLInputElement | HTMLTextAreaElement;
    currentTarget: HTMLFormElement;
  }

  type HandleKeyDown = (e: HandleKeyDownEvent) => void;

  const handleKeyDown: HandleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      (e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement)
    ) {
      e.preventDefault();
      // Buscar el siguiente input o textarea visible y enfocar
      const form = e.currentTarget as HTMLFormElement;
      const elements = Array.from(form.elements) as HTMLElement[];
      const idx = elements.indexOf(e.target as HTMLElement);
      for (let i = idx + 1; i < elements.length; i++) {
        const el = elements[i];
        if (
          (el instanceof HTMLInputElement ||
            el instanceof HTMLTextAreaElement) &&
          !el.disabled &&
          el.offsetParent !== null
        ) {
          el.focus();
          break;
        }
      }
    }
  };

  switch (step) {
    case 1:
      return (
        <form
          className="create-course-step-1"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <CreateCourseInfo course={course} setCourse={setCourse} />
          <section className="button-container">
            <button
              className="create-course-button"
              onClick={() => handleStepChange("next")}
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
                <label>
                  <strong>About</strong>
                  <p>{course.info.about}</p>
                </label>
                <label>
                  <strong>Instructor</strong>
                  <p>{course.info.instructor}</p>
                </label>
                <label>
                  <strong>Skills</strong>
                  <p>{course.info.skills.join(", ")}</p>
                </label>
              </section>
            </label>
            <div className="module-list">
              {course.modules.map(
                (module: CourseModule, moduleIndex: number) => (
                  <div key={moduleIndex} className="module-summary">
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
                    <h3 className="module-title-l">Module {moduleIndex + 1}</h3>
                  </div>
                )
              )}
            </div>

            <footer className="create-course-summary-footer">
              <button
                className="create-course-button"
                onClick={() => handleStepChange("prev")}
              >
                Back
              </button>
              <button
                className="create-course-button"
                onClick={() => handleStepChange("next")}
              >
                Next
              </button>
            </footer>
          </aside>
          <form className="create-course-form"></form>
        </div>
      );
  }
}
