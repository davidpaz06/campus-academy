import React from "react";
import "./CreateCourse.css";
import { Icon } from "@iconify/react";

import type { CourseProps } from "@/interfaces/createCourseInterfaces";

import { getNavClass, getModuleClass, handleSubmit, handleKeyDown, nextModule } from "@/utils/courseUtils";

//Styles
import "./CreateCourse.css";

// Components
import EditableText from "@/components/EditableText";
import CreateModule from "@/components/createcourse/CreateModule";
import CreateCourseLessonList from "@/components/createcourse/CreateCourseLessonList";

export default function CreateCourseContent({
  setCourse,
  course,
  setActiveModule,
  activeModule,
}: CourseProps & { setActiveModule: React.Dispatch<React.SetStateAction<number>>; activeModule: number }) {
  const courseContentRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  return (
    <form className="create-course-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <section className={`create-course-nav ${getNavClass(activeModule, course.modules.length)}`}>
        <div className="nav-button prev-module-button" onClick={() => setActiveModule(activeModule - 1)}>
          <Icon className="nav-icon prev-icon" icon="material-symbols:arrow-back-rounded" />
        </div>
        <div className="create-course-active-module">
          {course.modules[activeModule] ? (
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
          ) : null}
        </div>
        <div
          className="nav-button next-module-button"
          onClick={() => nextModule(setCourse, course, setActiveModule, activeModule)}
        >
          <Icon className="nav-icon next-icon" icon="material-symbols:arrow-forward-rounded" />
          <Icon className="nav-icon add-icon" icon="material-symbols:add-rounded" />
        </div>
      </section>
      <section className="create-course-content" ref={courseContentRef}>
        {course.modules.map((_, idx) => (
          <div key={idx} className={`module-box ${getModuleClass(idx, activeModule)}`}>
            <CreateCourseLessonList setCourse={setCourse} course={course} moduleIndex={idx} />
            <CreateModule
              setCourse={setCourse}
              course={course}
              moduleIndex={activeModule}
              setActiveModule={setActiveModule}
              courseContentRef={courseContentRef}
            />
          </div>
        ))}
      </section>
    </form>
  );
}
