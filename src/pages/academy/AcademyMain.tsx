import { Icon } from "@iconify/react";
import "./AcademyMain.css";
import Footer from "@/layouts/components/Footer";

export default function AcademyMain() {
  return (
    <div className="academy-main-container">
      <div className="academy-main-content">
        <div className="first-view">
          <section className="progress-section">
            <h1>Your progress</h1>
            <div className="progress-stats">
              <div className="stat">
                <h3 className="stat-label">Courses</h3>
                <h1 className="stat-value">6</h1>
              </div>
              <div className="stat">
                <h3 className="stat-label">Certifications</h3>
                <h1 className="stat-value">1</h1>
              </div>
              <div className="stat">
                <h3 className="stat-label">
                  AVG. Score
                  {/* <Icon
                  icon="material-symbols:info-outline-rounded"
                  width="24"
                  height="24"
                /> */}
                </h3>
                <h1 className="stat-value">98.77%</h1>
              </div>
              <div className="stat">
                <h3 className="stat-label">
                  Academy score
                  {/* <Icon
                  icon="material-symbols:info-outline-rounded"
                  width="24"
                  height="24"
                /> */}
                </h3>
                <h1 className="stat-value">1200pts.</h1>
              </div>
            </div>
          </section>

          <section className="search-section">
            <h1>
              What would you like to learn?
              <Icon
                icon="material-symbols:info-outline-rounded"
                width="24"
                height="24"
                color="var(--charlestone-green)"
              />
            </h1>

            <div className="search-box">
              <textarea
                className="search-input"
                placeholder="Tell Xavier exactly what and how you would like to learn?"
              />
              <button className="search-btn">Search</button>
            </div>
          </section>
        </div>

        <section className="learning-section">
          <h1>Continue Learning</h1>
          <div className="learning-container">
            <div className="learning-card">
              <img
                src="https://blog.hyperiondev.com/wp-content/uploads/2018/11/Blog-Programming-101.jpg"
                alt="Programming"
              />
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
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
