import { useState } from "react";

import "./CreateCourse.css";
import type { CourseProps } from "@/interfaces/createCourseInterfaces";

import { courseToCreateCourseDto } from "@/helpers/courseDtoHelper";

import ModalShowJSON from "@/components/ModalShowJSON";

export default function CreateCourseReview({
  course,
  setStep,
  step,
}: CourseProps & { setStep: (step: number) => void; step: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="summary">
        <h1 className="name">{course.info.name}</h1>
        <div className="basic-info">
          <div className="logo">
            <img src="https://uru.edu/wp-content/uploads/2023/02/uru-logo-maracaibo.png" alt="Institution Logo" />
          </div>
          <div className="description">
            {course.info.description} <br /> <br />
            <strong>Instructor: </strong>
            {course.info.instructor}
          </div>
          <div className="footer">
            <div className="students-enrolled">
              {course.modules.length > 0 ? (
                <>
                  <strong>{course.modules.length}</strong> Already enrolled
                </>
              ) : (
                <>
                  <strong>0</strong> Already enrolled
                </>
              )}
            </div>

            <button className="enroll-button">Enroll now</button>
          </div>
        </div>
        <div className="modules">
          <h2 className="modules-title">Modules</h2>
          <ul className="module-list">
            {course.modules.map((module, index) => (
              <li className="module-item" key={index}>
                {module.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="about">
        <h1 className="title">About</h1>
        <div className="text">
          <h3 className="subtitle">About this course</h3>
          {course.info.about}
        </div>
        <div className="skills">
          <h3 className="subtitle">Skills</h3>
          <div className="skills-list">
            {course.info.skills.map((skill, index) => (
              <div className="skill" key={index}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="actions">
        <h2 className="disclaimer">Please review your course details before creating</h2>
        <div className="buttons">
          <button className="create-course-review-button back-button" onClick={() => setStep(step - 1)}>
            <h3>Back</h3>
          </button>
          <button
            className="create-course-review-button create-button"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <h3>Create Course</h3>
          </button>
        </div>
        <h4 className="disclaimer">Once created, you will not be able to edit the course.</h4>
      </div>
      <ModalShowJSON
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={courseToCreateCourseDto(course, "1", "1")}
      />
    </>
  );
}
