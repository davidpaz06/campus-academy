import { useState, useCallback } from "react";
import type { RegisterStudent } from "@/types/user";
import Footer from "@/layouts/components/Footer";
import { useLocationData } from "@/hooks/useLocationData";
import { validateEmail, formatPhoneNumber } from "@/utils/locationUtils";
import { ACADEMIC_LEVEL_OPTIONS, STUDY_AREA_OPTIONS } from "@/constants/formData";
import InstitutionSearch from "@/components/forms/InstitutionSearch";
import "./RegisterStudent.css";

export default function RegisterStudent() {
  const [form, setForm] = useState<Partial<RegisterStudent>>({
    profileId: 4,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedAcademicLevel, setSelectedAcademicLevel] = useState<number | null>(null);

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
        studentCountry: countryCode,
        studentState: "",
        studentCity: "",
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
      const country = form.studentCountry;
      setForm((prev) => ({
        ...prev,
        studentState: stateCode,
        studentCity: "",
      }));

      if (stateCode && country) {
        await loadCitiesForState(country, stateCode);
      }
    },
    [form.studentCountry, loadCitiesForState]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      let formattedValue: string | number = value;
      if (name === "personPhone") {
        formattedValue = formatPhoneNumber(value);
      } else if (name === "academicLevelId") {
        formattedValue = parseInt(value) || "";
        setSelectedAcademicLevel(parseInt(value) || null);
      } else if (name === "studyAreaId") {
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
    if (!form.institutionId) newErrors.institutionId = "Institution is required";

    // Validar email si está presente (remover comillas de la interfaz)
    const emailValue = typeof form.email === "string" ? form.email.replace(/"/g, "") : form.email;
    if (emailValue && !validateEmail(emailValue)) {
      newErrors.email = "Please enter a valid email";
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

      console.log("Student form submitted:", form);
    },
    [form, validateForm]
  );

  // Obtener la descripción del nivel académico seleccionado
  const selectedLevelDescription = selectedAcademicLevel
    ? ACADEMIC_LEVEL_OPTIONS.find((opt) => opt.academic_level_id === selectedAcademicLevel)?.academic_level_description
    : null;

  // Agregar handler para institución (actualizar)
  const handleInstitutionSelect = useCallback((institution: any) => {
    setForm((prev) => ({
      ...prev,
      institutionId: institution?.institutionId || "", // Cambiar de id a institutionId
    }));
  }, []);

  return (
    <div className="create-institution-container">
      <div className="create-institution-content">
        <form onSubmit={handleSubmit}>
          <h1>1. Student Registration</h1>
          <div className="institution-section">
            <div className="institution-info">
              <p>
                Join our educational community as a student and unlock access to innovative learning experiences,
                AI-powered assistance, and collaborative tools designed to enhance your academic journey.
              </p>
              <p>
                As a registered student, you'll be able to join institutions, access courses, and connect with educators
                and peers from around the world.
              </p>
              {selectedLevelDescription && (
                <div className="education-box">
                  <strong>
                    🛈{" "}
                    {
                      ACADEMIC_LEVEL_OPTIONS.find((opt) => opt.academic_level_id === selectedAcademicLevel)
                        ?.academic_level_name
                    }
                  </strong>
                  <p>{selectedLevelDescription}</p>
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
                  name="academicLevelId"
                  value={form.academicLevelId || ""}
                  onChange={handleChange}
                  aria-label="Academic Level"
                >
                  <option value="">Select academic level</option>
                  {ACADEMIC_LEVEL_OPTIONS.map((opt) => (
                    <option key={opt.academic_level_id} value={opt.academic_level_id}>
                      {opt.academic_level_name}
                    </option>
                  ))}
                </select>
                <select
                  name="studyAreaId"
                  value={form.studyAreaId || ""}
                  onChange={handleChange}
                  aria-label="Study Area"
                >
                  <option value="">Select study area</option>
                  {STUDY_AREA_OPTIONS.map((opt) => (
                    <option key={opt.study_area_id} value={opt.study_area_id}>
                      {opt.study_area_name}
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

          <h1>2. Personal Information</h1>
          <div className="location-section">
            <div className="location-card">
              <div className="form-row">
                <select
                  name="studentCountry"
                  value={form.studentCountry || ""}
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
                  name="studentState"
                  value={form.studentState || ""}
                  onChange={handleStateChange}
                  aria-label="Region"
                  disabled={!form.studentCountry || locationLoading}
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
                  name="studentCity"
                  value={form.studentCity || ""}
                  onChange={handleChange}
                  disabled={!form.studentState || locationLoading}
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
            </div>
            <div className="location-info">
              <p>
                Complete your profile with personal information to help us provide you with a personalized learning
                experience tailored to your academic needs and goals.
              </p>
              <p>
                Your information will be kept secure and will only be used to enhance your educational experience on our
                platform.
              </p>
              <p>As a student, you'll gain access to:</p>
              <p className="benefits-list">
                ✓ AI-powered learning assistance
                <br />
                ✓ Interactive courses and materials
                <br />
                ✓ Collaboration with peers and educators
                <br />
                ✓ Progress tracking and analytics
                <br />✓ Campus social network
              </p>
            </div>
          </div>

          <div className="submit-section">
            <h2>Ready to start your learning journey?</h2>
            <button className="send-btn" type="submit">
              Register as Student
            </button>
          </div>
          <div className="submit-footer">
            <p>
              Once you complete registration, you'll receive a confirmation email with instructions to verify your
              account and start accessing our educational platform.
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
