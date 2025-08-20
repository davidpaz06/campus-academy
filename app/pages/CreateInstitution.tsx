import { useState } from "react";
import type { Register } from "../interfaces/register";
import Card from "../components/Card";
import Footer from "../components/layout/Footer";
import "./CreateInstitution.css";

const CreateInstitution = () => {
  const [form, setForm] = useState<Partial<Register>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <div className="create-institution-container">
      <div className="create-institution-content">
        <h1>1. Create an institution</h1>
        <div className="institution-section">
          <div className="institution-info">
            <p>
              An institution sets the environment on which your own campus will
              be created, providing a safe context where professors and students
              may interact.
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
                to the educational journey that spans from kindergarten,
                typically starting at around age five, through to twelfth grade,
                usually ending around age 18.
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
                  name="person_first_name"
                  placeholder="First Name"
                  value={form.person_first_name}
                  onChange={handleChange}
                />
                <input
                  name="person_surname"
                  placeholder="Surname"
                  value={form.person_surname}
                  onChange={handleChange}
                />
              </div>
              <input
                name="institution_name"
                placeholder="Institution name"
                value={form.institution_name}
                onChange={handleChange}
              />
              <select
                name="profile_id"
                value={form.profile_id}
                onChange={handleChange}
              >
                <option value="">Select role</option>
                <option value="1">Student</option>
                <option value="2">Teacher</option>
                <option value="3">Admin</option>
              </select>
              <div className="form-row">
                <select
                  name="institution_type"
                  value={form.institution_type}
                  onChange={handleChange}
                >
                  <option value="">Select institution type</option>
                  <option value="K-12">K-12</option>
                  {/* Más opciones se agregarán desde la BDD */}
                </select>
                <select
                  name="grading_system"
                  value={form.grading_system}
                  onChange={handleChange}
                >
                  <option value="">Select grading system</option>
                  <option value="20-point scale">20-point scale</option>
                  {/* Más opciones se agregarán desde la BDD */}
                </select>
              </div>
              <textarea
                name="institution_description"
                placeholder="Institution description (optional)"
                value={form.institution_description}
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
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                >
                  <option value="">Select country</option>
                  <option value="Venezuela">Venezuela</option>
                  {/* Más opciones se agregarán desde la BDD */}
                </select>
                <select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                >
                  <option value="">Select region</option>
                  <option value="Zulia">Zulia</option>
                  {/* Más opciones se agregarán desde la BDD */}
                </select>
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
                name="business_email"
                placeholder="Business Email"
                value={form.business_email}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />
              <div className="form-row">
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
              </div>
              <div className="form-row">
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
              </div>
            </form>
          </Card>
          <div className="location-info">
            <p>
              It is important to us to know where is your institution is
              located, for it is a defining variable on how your AI companion
              should be contextualized.
            </p>
            <p>
              We would also like to know a bit about your institution, hence why
              we invite you to add some social media links for a better insight
              about your needs and goals.
            </p>
            <p>By creating an institution, you'll gain access to:</p>
            <p className="benefits-list">
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
            Once form completion, we will check on your submission to verify
            your request. We will contact you through the business mail provided
            once the request has been reviewed by our team with its response and
            further instructions for procedure.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateInstitution;
