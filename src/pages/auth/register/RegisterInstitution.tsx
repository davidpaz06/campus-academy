import { useState } from "react";
import type { RegisterInstitution } from "@/types/user";
import Footer from "@/layouts/components/Footer";
import "./RegisterInstitution.css";

const institutionFields = [
  { name: "person_first_name", placeholder: "First Name" },
  { name: "person_surname", placeholder: "Last Name" },
  { name: "institution_name", placeholder: "Institution name" },
];

const selectProfileOptions = [
  { value: "", label: "Select role" },
  { value: "1", label: "Student" },
  { value: "2", label: "Teacher" },
  { value: "3", label: "Admin" },
];

const selectInstitutionTypeOptions = [
  { value: "", label: "Select institution type" },
  { value: "K-12", label: "K-12" },
  // Más opciones desde la BDD
];

const selectGradingSystemOptions = [
  { value: "", label: "Select grading system" },
  { value: "20-point scale", label: "20-point scale" },
  // Más opciones desde la BDD
];

const locationFields = [
  { name: "city", placeholder: "City" },
  { name: "address", placeholder: "Address" },
];

const contactFields = [
  { name: "business_email", placeholder: "Business Email" },
  { name: "phone", placeholder: "Phone" },
  { name: "website", placeholder: "Website" },
  { name: "instagram", placeholder: "Instagram" },
  { name: "facebook", placeholder: "Facebook" },
  { name: "twitter", placeholder: "Twitter" },
];

export default function RegisterInstitution() {
  const [form, setForm] = useState<Partial<RegisterInstitution>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <div className="create-institution-container">
      <div className="create-institution-content">
        <form onSubmit={handleSubmit}>
          <h1>1. Create an institution</h1>
          <div className="institution-section">
            <div className="institution-info">
              <p>
                An institution sets the environment on which your own campus will be created, providing a safe context
                where professors and students may interact.
              </p>
              <p>
                Your institution's environment serves as a reflection of your educative community. Upon creation, your
                institution will have access to all of our LMS solutions.
              </p>
              <div className="education-box">
                <strong>🛈 K-12 education (DINAMIC TEXT)</strong>
                <p>
                  K12 education, or kindergarten through 12th grade (K-12), refers to the educational journey that spans
                  from kindergarten, typically starting at around age five, through to twelfth grade, usually ending
                  around age 18.
                  <br />
                  <br />
                  (DINAMIC TEXT)
                </p>
              </div>
            </div>
            <div className="institution-card">
              <div className="form-row">
                {institutionFields.map((field) => (
                  <input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof RegisterInstitution] || ""}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <input
                name="institution_name"
                placeholder="Institution name"
                value={form.institution_name || ""}
                onChange={handleChange}
              />
              <select name="profile_id" value={form.profile_id || ""} onChange={handleChange} aria-label="Profile">
                {selectProfileOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="form-row">
                <select
                  name="institution_type"
                  value={form.institution_type || ""}
                  onChange={handleChange}
                  aria-label="Institution Type"
                >
                  {selectInstitutionTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <select
                  name="grading_system"
                  value={form.grading_system || ""}
                  onChange={handleChange}
                  aria-label="Grading System"
                >
                  {selectGradingSystemOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="institution_description"
                placeholder="Institution description (optional)"
                value={form.institution_description || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <h1>2. Location & Contact</h1>
          <div className="location-section">
            <div className="location-2">
              <div className="form-row">
                <select name="country" value={form.country || ""} onChange={handleChange} aria-label="Country">
                  <option value="">Select country</option>
                  <option value="Venezuela">Venezuela</option>
                  {/* Más opciones desde la BDD */}
                </select>
                <select name="region" value={form.region || ""} onChange={handleChange} aria-label="Region">
                  <option value="">Select region</option>
                  <option value="Zulia">Zulia</option>
                  {/* Más opciones desde la BDD */}
                </select>
              </div>
              <div className="form-row">
                {locationFields.map((field) => (
                  <input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof RegisterInstitution] || ""}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <input
                name="business_email"
                placeholder="Business Email"
                value={form.business_email || ""}
                onChange={handleChange}
              />
              <input name="phone" placeholder="Phone" value={form.phone || ""} onChange={handleChange} />
              <div className="form-row">
                {contactFields.slice(2, 4).map((field) => (
                  <input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof RegisterInstitution] || ""}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <div className="form-row">
                {contactFields.slice(4).map((field) => (
                  <input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof RegisterInstitution] || ""}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
            <div className="location-info">
              <p>
                It is important to us to know where is your institution is located, for it is a defining variable on how
                your AI companion should be contextualized.
              </p>
              <p>
                We would also like to know a bit about your institution, hence why we invite you to add some social
                media links for a better insight about your needs and goals.
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
            <button className="send-btn" type="submit">
              Send
            </button>
          </div>
          <div className="footer">
            <p>
              Once form completion, we will check on your submission to verify your request. We will contact you through
              the business mail provided once the request has been reviewed by our team with its response and further
              instructions for procedure.
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
