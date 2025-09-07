import { useState, useCallback } from "react";
import type { RegisterTeacher } from "@/types/user";
import Footer from "@/layouts/components/Footer";
import { useLocationData } from "@/hooks/useLocationData";
import { validateEmail, formatPhoneNumber, validateURL } from "@/utils/locationUtils";
import { SPECIALIZATION_OPTIONS, EXPERIENCE_LEVEL_OPTIONS } from "@/constants/formData";
import InstitutionSearch from "@/components/forms/InstitutionSearch";
import "./RegisterTeacher.css";

export default function RegisterTeacher() {
  const [form, setForm] = useState<Partial<RegisterTeacher>>({
    profileId: 3, // Teacher por defecto
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedSpecialization, setSelectedSpecialization] = useState<number | null>(null);

  const {
    countries,
    states,
    cities,
    loading: locationLoading,
    error: locationError,
    loadStatesForCountry,
    loadCitiesForState,
  } = useLocationData();

  const handleCountryChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const countryCode = e.target.value;
      setForm((prev) => ({
        ...prev,
        personCountry: countryCode,
        personState: "",
        personCity: "",
      }));

      if (countryCode) {
        await loadStatesForCountry(countryCode);
      }
    },
    [loadStatesForCountry]
  );

  const handleStateChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const stateCode = e.target.value;
      const country = form.personCountry; // ✅ Cambio: personCountry
      setForm((prev) => ({
        ...prev,
        personState: stateCode, // ✅ Cambio: personState
        personCity: "",
      }));

      if (stateCode && country) {
        await loadCitiesForState(country, stateCode);
      }
    },
    [form.personCountry, loadCitiesForState]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      let formattedValue: string | number = value;
      if (name === "personPhone") {
        formattedValue = formatPhoneNumber(value);
      } else if (name === "specializationId") {
        // ✅ Cambio: specializationId
        formattedValue = parseInt(value) || "";
        setSelectedSpecialization(parseInt(value) || null);
      } else if (name === "experienceYears") {
        // ✅ Cambio: experienceYears
        formattedValue = parseInt(value) || "";
      }

      setForm((prev) => ({ ...prev, [name]: formattedValue }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.email) newErrors.email = "Email is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.personFirstName) newErrors.personFirstName = "First name is required";
    if (!form.personSurname) newErrors.personSurname = "Surname is required";
    if (!form.personBirthDate) newErrors.personBirthDate = "Birth date is required";
    if (!form.specializationId) newErrors.specializationId = "Specialization is required"; // ✅ Cambio
    if (!form.experienceYears) newErrors.experienceYears = "Experience years is required"; // ✅ Cambio
    if (!form.institutionId) newErrors.institutionId = "Institution is required";

    // Validar email
    const emailValue = typeof form.email === "string" ? form.email.replace(/"/g, "") : form.email;
    if (emailValue && !validateEmail(emailValue)) {
      newErrors.email = "Please enter a valid email";
    }

    // Validar URLs opcionales
    if (form.linkedin && !validateURL(form.linkedin)) {
      // ✅ Cambio: linkedin
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }

    if (form.portfolioWebsite && !validateURL(form.portfolioWebsite)) {
      // ✅ Cambio: portfolioWebsite
      newErrors.portfolioWebsite = "Please enter a valid portfolio website URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      console.log("Teacher form submitted:", form);
    },
    [form, validateForm]
  );

  // Obtener la descripción de la especialización seleccionada
  const selectedSpecializationDescription = selectedSpecialization
    ? SPECIALIZATION_OPTIONS.find((opt) => opt.specialization_id === selectedSpecialization)?.specialization_description
    : null;

  // Handler para institución
  const handleInstitutionSelect = useCallback((institution: any) => {
    setForm((prev) => ({
      ...prev,
      institutionId: institution?.institutionId || "",
    }));
  }, []);

  return (
    <div className="create-institution-container">
      <div className="create-institution-content">
        <form onSubmit={handleSubmit}>
          <h1>1. Teacher Registration</h1>
          <div className="institution-section">
            <div className="institution-info">
              <p>
                Join our educational platform as an educator and gain access to advanced teaching tools, AI assistance,
                and a global community of learners and fellow educators.
              </p>
              <p>
                As a registered teacher, you'll be able to create courses, manage students, and collaborate with
                educational institutions worldwide.
              </p>
              {selectedSpecializationDescription && (
                <div className="education-box">
                  <strong>
                    🛈{" "}
                    {
                      SPECIALIZATION_OPTIONS.find((opt) => opt.specialization_id === selectedSpecialization)
                        ?.specialization_name
                    }
                  </strong>
                  <p>{selectedSpecializationDescription}</p>
                </div>
              )}
            </div>
            <div className="institution-card">
              <input name="email" type="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
              <div className="form-row">
                <input name="username" placeholder="Username" value={form.username || ""} onChange={handleChange} />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <input
                  name="personFirstName"
                  placeholder="First Name"
                  value={form.personFirstName || ""}
                  onChange={handleChange}
                />
                <input
                  name="personMiddleName"
                  placeholder="Middle Name (optional)"
                  value={form.personMiddleName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <input
                  name="personSurname"
                  placeholder="Surname"
                  value={form.personSurname || ""}
                  onChange={handleChange}
                />
                <input
                  name="personSecondSurname"
                  placeholder="Second Surname (optional)"
                  value={form.personSecondSurname || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <select
                  name="specializationId" // ✅ Cambio: specializationId
                  value={form.specializationId || ""}
                  onChange={handleChange}
                  aria-label="Specialization"
                >
                  <option value="">Select specialization</option>
                  {SPECIALIZATION_OPTIONS.map((opt) => (
                    <option key={opt.specialization_id} value={opt.specialization_id}>
                      {opt.specialization_name}
                    </option>
                  ))}
                </select>
                <select
                  name="experienceYears" // ✅ Cambio: experienceYears
                  value={form.experienceYears || ""}
                  onChange={handleChange}
                  aria-label="Experience Years"
                >
                  <option value="">Years of experience</option>
                  {EXPERIENCE_LEVEL_OPTIONS.map((opt) => (
                    <option key={opt.experience_id} value={opt.experience_years}>
                      {opt.experience_name}
                    </option>
                  ))}
                </select>
              </div>
              <InstitutionSearch
                value={null}
                onSelect={handleInstitutionSelect}
                placeholder="Search for your institution"
                disabled={false}
              />
            </div>
          </div>

          <h1>2. Professional Information</h1>
          <div className="location-section">
            <div className="location-card">
              <div className="form-row">
                <select
                  name="personCountry" // ✅ Cambio: personCountry
                  value={form.personCountry || ""}
                  onChange={handleCountryChange}
                  aria-label="Country"
                  disabled={locationLoading}
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.iso2}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <select
                  name="personState" // ✅ Cambio: personState
                  value={form.personState || ""}
                  onChange={handleStateChange}
                  aria-label="Region"
                  disabled={!form.personCountry || locationLoading}
                >
                  <option value="">Select region</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.iso2}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <select
                  name="personCity" // ✅ Cambio: personCity
                  value={form.personCity || ""}
                  onChange={handleChange}
                  disabled={!form.personState || locationLoading}
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <input name="personPhone" placeholder="Phone" value={form.personPhone || ""} onChange={handleChange} />
              </div>
              <input
                name="personBirthDate"
                type="date"
                placeholder="Birth Date"
                value={form.personBirthDate || ""}
                onChange={handleChange}
              />
              <div className="form-row">
                <input
                  name="linkedin" // ✅ Cambio: linkedin
                  placeholder="LinkedIn Profile (optional)"
                  value={form.linkedin || ""}
                  onChange={handleChange}
                />
                <input
                  name="portfolioWebsite" // ✅ Cambio: portfolioWebsite
                  placeholder="Portfolio Website (optional)"
                  value={form.portfolioWebsite || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="location-info">
              <p>
                Share your professional background and expertise to help us create the best teaching experience for you
                and your students.
              </p>
              <p>
                Your professional information will help institutions and students find the right educator for their
                needs while maintaining your privacy.
              </p>
              <p>As a teacher, you'll gain access to:</p>
              <p className="benefits-list">
                ✓ Advanced teaching and grading tools
                <br />
                ✓ AI-powered content creation assistance
                <br />
                ✓ Student progress analytics
                <br />
                ✓ Collaboration with global educators
                <br />✓ Professional development resources
              </p>
            </div>
          </div>

          <div className="submit-section">
            <h2>Ready to inspire the next generation?</h2>
            <button className="send-btn" type="submit">
              Register as Teacher
            </button>
          </div>
          <div className="submit-footer">
            <p>
              Once you complete registration, you'll receive a confirmation email with instructions to verify your
              account and start creating educational content on our platform.
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
