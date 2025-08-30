import Card from "@/components/Card";
import type { CourseProps } from "@/interfaces/createCourseInterfaces";
import "./CreateCourse.css";
import SearchSkills from "@/components/createcourse/SearchSkills";

export default function CreateCourseInfo({ course, setCourse }: CourseProps) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCourse({
      ...course,
      info: {
        ...course.info,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <>
      <section className="course-details">
        <Card className="course-card">
          <h2>Creating a Course</h2>
          <div className="course-details-grid">
            <div>
              <label htmlFor="courseName">Course name</label>
              <input
                type="text"
                id="courseName"
                name="name"
                value={course.info.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="instructor">Instructor</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={course.info.instructor}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="about">About</label>
              <textarea
                id="about"
                name="about"
                value={course.info.about}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={course.info.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </Card>
      </section>
      <SearchSkills
        skills={course.info.skills}
        setSkills={(newSkills) =>
          setCourse({
            ...course,
            info: { ...course.info, skills: newSkills },
          })
        }
      />
    </>
  );
}
