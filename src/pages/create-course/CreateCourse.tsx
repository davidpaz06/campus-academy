import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";

// Styles
import "./CreateCourse.css";

// Interfaces
import type { Course } from "@/types/createcourse";

// Steps Components
import CreateCourseInfo from "./CreateCourseInfo";
import CourseSummary from "./CourseSummary";
import CreateCourseContent from "./CreateCourseContent";
import CreateCourseReview from "./CreateCourseReview";

// Utils
import { getCourseFromLocalStorage, saveCourseToLocalStorage, handleKeyDown, handleSubmit } from "@/utils/courseUtils";
import { courseToCreateCourseDto } from "@/helpers/courseDtoHelper";

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
      title: "Click to edit title",
      lessons: [],
    },
  ],
};

const InitialStep = 1;

export default function CreateCourse() {
  const navigate = useNavigate();

  const [step, setStep] = useState(InitialStep);
  const [course, setCourse] = useState<Course>(() => getCourseFromLocalStorage(emptyCourse));
  const [activeModule, setActiveModule] = useState<number>(0);

  const [createResult, setCreateResult] = useState(null);

  const { post, loading, error, data } = useFetch();

  const handleCreateCourse = async () => {
    const dto = courseToCreateCourseDto(course, "0682e29c-0256-4451-85f5-8b352cbee780", "");
    try {
      const result = await post("http://localhost:3000/api/academy/courses", dto, "json");
      setCreateResult(result);

      navigate("/courses");
    } catch (e) {}
  };

  useEffect(() => {
    saveCourseToLocalStorage(course);
  }, [course]);

  switch (step) {
    case 1:
      return (
        <form className="create-course-step-1" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <CreateCourseInfo setCourse={setCourse} course={course} />
          <button className="create-info-course-button" type="button" onClick={() => setStep(step + 1)}>
            Next
          </button>
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
          <div className="actions">
            <h2 className="disclaimer">Please review your course details before creating</h2>
            <div className="buttons">
              <button className="create-course-review-button back-button" onClick={() => setStep(step - 1)}>
                <h3>Back</h3>
              </button>
              <button
                className="create-course-review-button create-button"
                onClick={handleCreateCourse}
                disabled={loading}
              >
                <h3>{loading ? "Creating..." : "Create Course"}</h3>
              </button>
            </div>
            {/* {error && <div className="error">{error}</div>} */}
            <h4 className="disclaimer">Once created, you will not be able to edit the course.</h4>
          </div>
        </div>
      );

    default:
      setStep(InitialStep);
      return null;
  }
}
