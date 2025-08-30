import { useState } from "react";
import { Icon } from "@iconify/react";
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

const InitialStep = 2;

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
      ],
    },
    {
      title: "Getting Started with React",
      lessons: [
        {
          title: "React Basics",
          type: "Reading",
          file: "This module covers the basics of React.",
        },
        {
          title: "React Advanced",
          type: "Video",
          file: "This module dives deep into advanced React concepts.",
        },
      ],
    },
    {
      title: "Node.js and Express",
      lessons: [
        {
          title: "Node.js Basics",
          type: "Reading",
          file: "This module covers the basics of Node.js.",
        },
        {
          title: "Node.js Advanced",
          type: "Video",
          file: "This module dives deep into advanced Node.js concepts.",
        },
      ],
    },
  ],
};

export default function CreateCourse() {
  const [step, setStep] = useState(InitialStep);
  const handleStepChange = (action: string) => {
    action == "next" ? setStep(step + 1) : setStep(step - 1);
    console.log(course);
  };

  const [activeModule, setActiveModule] = useState<number>(0);
  const [course, setCourse] = useState<Course>(
    // {
    //   id: "",
    //   info: {
    //     name: "",
    //     instructor: "",
    //     about: "",
    //     description: "",
    //     skills: [],
    //   },
    //   modules: [],
    // },
    mockCourse
  );

  const handleNavActions = (action: string) => {
    switch (action) {
      case "prev":
        // Navigate to the previous module
        if (activeModule > 0) {
          setActiveModule(activeModule - 1);
        }
        break;

      case "next":
        // Navigate to the next module
        if (activeModule < course.modules.length - 1) {
          setActiveModule(activeModule + 1);
        }

        if (activeModule === course.modules.length - 1) {
          //add new module
          const newModule: CourseModule = {
            title: "Module " + (course.modules.length + 1),
            lessons: [],
          };
          setCourse({ ...course, modules: [...course.modules, newModule] });
          setActiveModule(course.modules.length);
          break;
        }
    }
  };

  const handleNavClass = (activeModule: number, modulesLength: number) => {
    modulesLength = modulesLength - 1;

    if (activeModule === 0 && modulesLength === 1) {
      return "initial";
    } else if (activeModule === 0 && activeModule < modulesLength) {
      return "first";
    } else if (activeModule > 0 && activeModule < modulesLength) {
      return "middle";
    } else if (activeModule === modulesLength) {
      return "last";
    }
  };

  const handleModuleClass = (idx: number) => {
    if (idx < activeModule) {
      return "prev-module";
    } else if (idx === activeModule) {
      return "present-module";
    } else if (idx > activeModule) {
      return "next-module";
    }
  };

  const handleActiveModule = (index: number) => {
    setActiveModule(index);
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
                    <p className="module-number">Module {moduleIndex + 1}</p>
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
          {/* <button style={{ display: "none" }}>
            <Icon icon="material-symbols:book-ribbon-rounded" />
            <Icon icon="material-symbols:smart-display-rounded" />
            <Icon icon="material-symbols:unknown-document-rounded" />
          </button> */}
          <form
            className="create-course-form"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <section
              className={`create-course-nav ${handleNavClass(
                activeModule,
                course.modules.length
              )}`}
            >
              <div
                className="nav-button prev-module-button"
                onClick={() => handleNavActions("prev")}
              >
                <Icon
                  className="nav-icon prev-icon"
                  icon="material-symbols:arrow-back-rounded"
                />
              </div>
              <div className="create-course-active-module">
                <input
                  type="text"
                  value={course.modules[activeModule].title}
                  onSubmit={(e) => e.preventDefault()}
                  onChange={(e) => {
                    const updatedModules = [...course.modules];
                    updatedModules[activeModule] = {
                      ...updatedModules[activeModule],
                      title: e.target.value,
                    };
                    setCourse({ ...course, modules: updatedModules });
                  }}
                  className="active-module-input"
                />
              </div>
              <div
                className="nav-button next-module-button"
                onClick={() => handleNavActions("next")}
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
            <section className="create-course-content">
              {course.modules.map((module, idx) => {
                return (
                  <div
                    key={idx}
                    className={`module-box ${handleModuleClass(idx)}`}
                    onClick={() => handleActiveModule(idx)}
                  >
                    Module {idx + 1} - {module.title}
                  </div>
                );
              })}
            </section>
          </form>
        </div>
      );
  }
}
