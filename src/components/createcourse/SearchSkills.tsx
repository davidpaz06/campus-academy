import { useState } from "react";
import type { CourseSkills } from "@/types/createcourse";

export default function SearchSkills({ skills, setSkills }: CourseSkills) {
  const [searchSkill, setSearchSkill] = useState("");

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

  function handleRemoveSkill(skill: string): void {
    setSkills(skills.filter((s) => s !== skill));
  }

  const filteredSkills = skills.filter((skill) => skill.toLowerCase().includes(searchSkill.toLowerCase()));

  return (
    <section className="course-skills">
      <div className="skills-card">
        <h2>Skills</h2>
        <div className="skills-chips">
          {skills.map((skill) => (
            <span className="course-chip" key={skill} onClick={() => handleRemoveSkill(skill)}>
              {skill}
              <span className="chip-x">×</span>
            </span>
          ))}
        </div>
      </div>
      <div className="search-skills-card">
        <h3>Search skills</h3>
        <div className="search-skill-form">
          <input
            type="text"
            placeholder="Search or add skill"
            value={searchSkill}
            onChange={handleSkillSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddSkill(e);
              }
            }}
          />
          <div className="skills-chips">
            {searchSkill.trim() &&
              [
                !skills.some((s) => s.toLowerCase() === searchSkill.trim().toLowerCase()) && (
                  <span className="new-chip" key={searchSkill.trim() + "-new"} onClick={handleAddSkill}>
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
        </div>
      </div>
    </section>
  );
}
