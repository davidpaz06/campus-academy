import { useState } from "react";
import Card from "../components/Card";
import "./CreateInstitution.css";

const CreateInstitution = () => {
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    institutionName: "",
    role: "",
    institutionType: "",
    gradingSystem: "",
    description: "",
    country: "",
    region: "",
    city: "",
    address: "",
    businessMail: "",
    phone: "",
    website: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="create-institution-container">
      <h1>1. Create an institution</h1>
      <div className="institution-section">
        <div className="institution-info">
          <p>
            An institution sets the environment on which your own campus will be
            created, providing a safe context where professors and students may
            interact.
          </p>
          <p>
            Your institution's environment serves as a reflection of your
            educative community. Upon creation, your institution will have
            access to all of our LMS solutions.
          </p>
          <div className="education-box">
            <strong>🛈 K-12 education (DINAMIC TEXT)</strong>
            <p>
              K12 education, or kindergarten through 12th grade (K-12), refers
              to the educational journey that spans from kindergarten, typically
              starting at around age five, through to twelfth grade, usually
              ending around age 18.
              <br />
              <br />
              (DINAMIC TEXT)
            </p>
          </div>
        </div>
        <Card className="institution-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                name="surname"
                placeholder="Surname"
                value={form.surname}
                onChange={handleChange}
              />
            </div>
            <input
              name="institutionName"
              placeholder="Institution name"
              value={form.institutionName}
              onChange={handleChange}
            />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="">Select role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="form-row">
              <select
                name="institutionType"
                value={form.institutionType}
                onChange={handleChange}
              >
                <option value="">Select institution type</option>
                <option value="K-12">K-12</option>
                {/* Más opciones se agregarán desde la BDD */}
              </select>
              <select
                name="gradingSystem"
                value={form.gradingSystem}
                onChange={handleChange}
              >
                <option value="">Select grading system</option>
                <option value="20-point scale">20-point scale</option>
                {/* Más opciones se agregarán desde la BDD */}
              </select>
            </div>
            <textarea
              name="description"
              placeholder="Institution description (optional)"
              value={form.description}
              onChange={handleChange}
            />
          </form>
        </Card>
      </div>

      <h1>2. Location & Contact</h1>
      <div className="location-section">
        <Card className="location-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
              />
              <input
                name="region"
                placeholder="Region"
                value={form.region}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <input
              name="businessMail"
              placeholder="Business Mail"
              value={form.businessMail}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              name="website"
              placeholder="Website"
              value={form.website}
              onChange={handleChange}
            />
            <input
              name="instagram"
              placeholder="Instagram"
              value={form.instagram}
              onChange={handleChange}
            />
            <input
              name="facebook"
              placeholder="Facebook"
              value={form.facebook}
              onChange={handleChange}
            />
            <input
              name="twitter"
              placeholder="Twitter"
              value={form.twitter}
              onChange={handleChange}
            />
          </form>
        </Card>
        <div className="location-info">
          <p>
            It is important to us to know where is your institution is located,
            for it is a defining variable on how your AI companion should be
            contextualized.
          </p>
          <p>
            We would also like to know a bit about your institution, hence why
            we invite you to add some social media links for a better insight
            about your needs and goals.
          </p>
          <p>
            By creating an institution, you'll gain access to:
            <br />
            ✓ All of Campus services and solutions
            <br />
            ✓ Operability with Xavier's AI assistance
            <br />
            ✓ Interaction with other institutions through Campus Social
            <br />✓ Campus expert's back up and mentoring
          </p>
        </div>
      </div>

      <div className="submit-section">
        <h2>Ready to take the next step on your education?</h2>
        <button className="send-btn" type="submit" onClick={handleSubmit}>
          Send
        </button>
      </div>
      <div className="footer">
        <p>
          Once form completion, we will check on your submission to verify your
          request. We will contact you through the business mail provided once
          the request has been reviewed by our team with its response and
          further instructions for procedure.
        </p>
        <footer>
          <div className="footer-columns">
            <div>
              <strong>Products</strong>
              <ul>
                <li>Campus Academy</li>
                <li>Campus Threads</li>
                <li>Campus Schedule</li>
                <li>Campus Metrics</li>
                <li>Campus Data</li>
              </ul>
            </div>
            <div>
              <strong>Company</strong>
              <ul>
                <li>About</li>
                <li>Contact us</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <strong>Social</strong>
              <ul>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Youtube</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            All rights reserved, Lodestar Solutions. 2025
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CreateInstitution;
