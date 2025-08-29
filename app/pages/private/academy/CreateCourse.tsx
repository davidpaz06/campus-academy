import { useState } from "react";
//Interfaces
import type { Course } from "@/interfaces/createCourseInterfaces";
//Styles
import "./CreateCourse.css";
//Pages
import CreateCourseInfo from "./CreateCourseInfo";

export default function CreateCourse() {
  const [course, setCourse] = useState<Course>({
    id: "",
    info: {
      name: "",
      instructor: "",
      about: "",
      description: "",
      skills: [],
    },
    modules: [],
  });
  const [step, setStep] = useState(2);

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
          className="create-course-container"
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
      return <div>Step 2</div>;
  }
}
