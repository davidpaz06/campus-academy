import Card from "@/components/Card";
import "./CreateCourse.css";

export default function CreateCourse() {
  return (
    <div className="create-course-container">
      <section className="course-details">
        <Card className="course-card">
          <h2>Creating a Course</h2>
          <div className="course-details-grid">
            <div>
              <label htmlFor="courseName">Course name</label>
              <input type="text" id="courseName" />
            </div>
            <div>
              <label htmlFor="instructor">Instructor</label>
              <input type="text" id="instructor" />
            </div>
            <div>
              <label htmlFor="about">About</label>
              <textarea id="about" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" />
            </div>
          </div>
        </Card>
      </section>
      <section className="course-skills">
        <Card className="skills-card">
          <h2>Skills</h2>
          <div className="skills-chips">
            <span className="chip">React.js</span>
            <span className="chip">Web Development</span>
            <span className="chip">Responsive Design</span>
            <span className="chip">HTML and CSS</span>
            <span className="chip">Bootstrap</span>
          </div>
        </Card>
        <Card className="search-skills-card">
          <h3>Search skills</h3>
          <input type="text" placeholder="Search skills" />
        </Card>
      </section>
      <section className="button-container">
        <button className="create-course-button">Next</button>
      </section>
    </div>
  );
}
