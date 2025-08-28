import { useState, useEffect } from "react";
import Card from "@/components/Card";
import "./CreateCourse.css";

interface CourseInfo {
  name?: string;
  instructor?: string;
  about?: string;
  description?: string;
  skills?: string[];
}

// interface CourseStructure {
//   title?: string;
//   description?: string;
// }

export default function CreateCourse() {
  const [step, setStep] = useState(1);
  const [courseInfo, setCourseInfo] = useState<Partial<CourseInfo>>(() => {
    const draft = localStorage.getItem("courseDraft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        // Separar skills del resto del objeto
        const { skills, ...info } = parsed;
        return info;
      } catch {
        return {};
      }
    }
    return {};
  });
  const [skills, setSkills] = useState<string[]>(() => {
    const draft = localStorage.getItem("courseDraft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        return Array.isArray(parsed.skills) ? parsed.skills : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [searchSkill, setSearchSkill] = useState("");

  useEffect(() => {
    const draft = { ...courseInfo, skills };
    localStorage.setItem("courseDraft", JSON.stringify(draft));
  }, [courseInfo, skills]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
  };

  const handleSkillSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSkill(e.target.value);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const skill = searchSkill.trim();

    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSearchSkill("");
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchSkill.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCourseInfo({ ...courseInfo, skills });
    alert(JSON.stringify({ ...courseInfo, skills }, null, 2));
    setStep(2);
  };

  function handleRemoveSkill(skill: string): void {
    setSkills(skills.filter((s) => s !== skill));
  }

  return step === 1 ? (
    <form
      className="create-course-container"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
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
      }}
    >
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
                value={courseInfo.name ?? ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="instructor">Instructor</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={courseInfo.instructor ?? ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="about">About</label>
              <textarea
                id="about"
                name="about"
                value={courseInfo.about ?? ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={courseInfo.description ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </Card>
      </section>
      <section className="course-skills">
        <Card className="skills-card">
          <h2>Skills</h2>
          <div className="skills-chips">
            {skills.map((skill) => (
              <span
                className="course-chip"
                key={skill}
                onClick={() => handleRemoveSkill(skill)}
              >
                {skill}
                <span className="chip-x">×</span>
              </span>
            ))}
          </div>
        </Card>
        <Card className="search-skills-card">
          <h3>Search skills</h3>
          <form className="search-skill-form">
            <input
              type="text"
              placeholder="Search or add skill"
              value={searchSkill}
              onChange={handleSkillSearch}
            />
            <div className="skills-chips">
              {searchSkill.trim() &&
                [
                  !skills.some(
                    (s) => s.toLowerCase() === searchSkill.trim().toLowerCase()
                  ) && (
                    <span
                      className="new-chip"
                      key={searchSkill.trim() + "-new"}
                      onClick={handleAddSkill}
                    >
                      {searchSkill.trim()}
                    </span>
                  ),
                  ...filteredSkills.map((skill) => (
                    <span className="search-chip" key={skill}>
                      {skill}
                    </span>
                  )),
                ].filter(Boolean)}
            </div>
          </form>
        </Card>
      </section>
      <section className="button-container">
        <button className="create-course-button" type="submit">
          Next
        </button>
      </section>
    </form>
  ) : (
    <CourseStructure />
  );

  function CourseStructure() {
    return (
      <div className="course-structure-container">
        <h2>Course Structure</h2>
        <div className="course-structure-grid">
          <div>
            <label htmlFor="moduleTitle">Module Title</label>
            <input type="text" id="moduleTitle" />
          </div>
          <div>
            <label htmlFor="moduleDescription">Module Description</label>
            <textarea id="moduleDescription" />
          </div>
        </div>
      </div>
    );
  }
}
