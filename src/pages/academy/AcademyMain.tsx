import { Icon } from "@iconify/react";
import "./AcademyMain.css";

export default function AcademyMain() {
  return (
    <div className="academy-main-container">
      <div className="progress-stats">
        <div className="stat">
          <p className="stat-label">Courses</p>
          <p className="stat-value">6</p>
        </div>
        <div className="stat">
          <p className="stat-label">Certifications</p>
          <p className="stat-value">1</p>
        </div>
        <div className="stat">
          <p className="stat-label">
            AVG. Score
            {/* <Icon icon="material-symbols:info-outline-rounded" width="24" height="24" /> */}
          </p>
          <p className="stat-value">98.77%</p>
        </div>
        <div className="stat">
          <p className="stat-label">
            Academy score
            {/* <Icon icon="material-symbols:info-outline-rounded" width="24" height="24" /> */}
          </p>
          <p className="stat-value">1200pts.</p>
        </div>
      </div>

      <div className="ask-xavier">
        <h2>What would you like to learn?</h2>

        <div className="search-box">
          <textarea className="search-input" placeholder="Tell Xavier exactly what and how you would like to learn?" />
          <button className="search-btn" type="submit">
            Search
          </button>
        </div>
      </div>
      <div className="continue-learning">
        <h2>Continue Learning</h2>
        <div className="learning-card">
          <div className="learning-info">
            <h2 className="learning-title">Introduction to programming</h2>
            <p className="learning-desc">
              lorem ipsum text lorem ipsum text lorem ipsum text lorem ipsum text lorem ipsum text lorem ipsum text
              lorem ipsum text lorem ipsum text
            </p>
            <div className="learning-progress">
              <span>Progress:</span>
            </div>
            <div className="learning-footer">
              <span className="learning-points">250pts.</span>
              <button className="learning-resume-btn">Resume</button>
            </div>
          </div>
          <img
            src="https://blog.hyperiondev.com/wp-content/uploads/2018/11/Blog-Programming-101.jpg"
            alt="Programming"
          />
        </div>
      </div>
    </div>
  );
}
