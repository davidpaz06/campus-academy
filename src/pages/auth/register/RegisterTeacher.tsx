import { useState, useCallback } from "react";
import type { RegisterTeacher } from "@/types/user";
import Footer from "@/layouts/components/Footer";
import { useLocationData } from "@/hooks/useLocationData";
import { useFetch } from "@/hooks/useFetch";
import { SPECIALIZATION_OPTIONS, EXPERIENCE_LEVEL_OPTIONS } from "@/constants/formData";
import { useAlertContext } from "@/context/AlertContext";
import { validateTeacherForm, ValidationError } from "@/utils/validations";
import InstitutionSearch from "@/components/forms/InstitutionSearch";
import "./RegisterTeacher.css";

const DEFAULT_FORM: Partial<RegisterTeacher> = {
  profileId: 3, // Teacher profile
  email: "",
  username: "",
  password: "",
  personFirstName: "",
  personMiddleName: "",
  personSurname: "",
  personSecondSurname: "",
  personBirthdate: "",
  personPhone: "+1 ",
  specializationId: undefined,
  experienceYears: undefined,
  institutionId: "",
  personCountry: "",
  personState: "",
  personCity: "",
  linkedin: "",
  portfolioWebsite: "",
};

export default function RegisterTeacher() {
  const [form, setForm] = useState<Partial<RegisterTeacher>>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para UI
  const [selectedSpecialization, setSelectedSpecialization] = useState<number | null>(null);
  const [selectedPrefix, setSelectedPrefix] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedStateIso, setSelectedStateIso] = useState("");

  const {
    countries,
    states,
    cities,
    phoneCountries,
    loading: locationLoading,
    loadStatesForCountry,
    loadCitiesForState,
  } = useLocationData();

  const { post } = useFetch();
  const { success, error, loading, removeAlert } = useAlertContext();

  const resetForm = useCallback(() => {
    setForm(DEFAULT_FORM);
    setSelectedSpecialization(null);
    setSelectedPrefix("+1");
    setPhoneNumber("");
    setSelectedStateIso("");
  }, []);

  const updatePersonPhone = useCallback((prefix: string, number: string) => {
    const cleanNumber = number.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, personPhone: cleanNumber ? `${prefix} ${cleanNumber}` : `${prefix} ` }));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      // Solo limpiar username de caracteres no permitidos
      if (name === "username") {
        setForm((prev) => ({ ...prev, [name]: value.replace(/[^a-zA-Z0-9_]/g, "") }));
        return;
      }

      if (name === "specializationId" || name === "experienceYears") {
        const numValue = value ? parseInt(value) : undefined;
        setForm((prev) => ({ ...prev, [name]: numValue }));

        if (name === "specializationId") {
          setSelectedSpecialization(numValue || null);
        }
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const handleCountryChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const countryCode = e.target.value;

      setForm((prev) => ({
        ...prev,
        personCountry: countryCode,
        personState: "",
        personCity: "",
      }));
      setSelectedStateIso("");

      if (!countryCode) return;

      await loadStatesForCountry(countryCode);

      const selectedCountry = countries.find((c) => c.iso2 === countryCode);
      if (selectedCountry?.phonecode) {
        const newPrefix = `+${selectedCountry.phonecode}`;
        setSelectedPrefix(newPrefix);
        updatePersonPhone(newPrefix, phoneNumber);
      }
    },
    [loadStatesForCountry, countries, phoneNumber, updatePersonPhone]
  );

  const handleStateChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const stateIso = e.target.value;
      const selectedState = states.find((state) => state.iso2 === stateIso);
      const stateName = selectedState?.name || "";

      setSelectedStateIso(stateIso);
      setForm((prev) => ({
        ...prev,
        personState: stateName,
        personCity: "",
      }));

      if (stateIso && form.personCountry) {
        await loadCitiesForState(form.personCountry, stateIso);
      }
    },
    [form.personCountry, loadCitiesForState, states]
  );

  const handlePrefixChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newPrefix = e.target.value;
      setSelectedPrefix(newPrefix);
      updatePersonPhone(newPrefix, phoneNumber);
    },
    [phoneNumber, updatePersonPhone]
  );

  const handlePhoneNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNumber = e.target.value.replace(/\D/g, "");
      setPhoneNumber(newNumber);
      updatePersonPhone(selectedPrefix, newNumber);
    },
    [selectedPrefix, updatePersonPhone]
  );

  const handleInstitutionSelect = useCallback((institution: any) => {
    setForm((prev) => ({
      ...prev,
      institutionId: institution?.institutionId ? String(institution.institutionId) : "",
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const loadingId = loading("Registering teacher...", {
        title: "Creating Account",
        dismissible: false,
      });

      try {
        const validatedData = validateTeacherForm({ ...form, profileId: 3 });
        console.log("Sending teacher data:", validatedData);

        await post("https://campus-api-gateway.onrender.com/api/auth/register", validatedData, "json");

        removeAlert(loadingId);
        success("Teacher registered successfully!", {
          title: "Registration Complete",
          duration: 8000,
        });

        resetForm();
      } catch (err) {
        removeAlert(loadingId);

        if (err instanceof ValidationError) {
          error(err.errors, { title: "Please check your information", duration: 0 });
        } else {
          const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
          error(errorMessage, { title: "Registration Error", duration: 0 });
        }

        console.error("Registration failed:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, post, loading, success, error, removeAlert, resetForm]
  );

  const selectedSpecializationDescription = selectedSpecialization
    ? SPECIALIZATION_OPTIONS.find((opt) => opt.specialization_id === selectedSpecialization)?.specialization_description
    : null;

  const isLocationDisabled = locationLoading || isSubmitting;

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
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email || ""}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={50}
              />

              <div className="form-row">
                <input
                  name="username"
                  placeholder="Username"
                  value={form.username || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25}
                  minLength={3}
                  pattern="[a-zA-Z0-9_]+"
                  title="Username can only contain letters, numbers, and underscores"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password (min 8 characters)"
                  value={form.password || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  minLength={8}
                />
              </div>

              <div className="form-row">
                <input
                  name="personFirstName"
                  placeholder="First Name"
                  value={form.personFirstName || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25}
                  minLength={2}
                />
                <input
                  name="personMiddleName"
                  placeholder="Middle Name (optional)"
                  value={form.personMiddleName || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25}
                />
              </div>

              <div className="form-row">
                <input
                  name="personSurname"
                  placeholder="Last Name"
                  value={form.personSurname || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25}
                  minLength={2}
                />
                <input
                  name="personSecondSurname"
                  placeholder="Second Last Name (optional)"
                  value={form.personSecondSurname || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25}
                />
              </div>

              <div className="form-row">
                <select
                  name="specializationId"
                  value={form.specializationId || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">Select specialization</option>
                  {SPECIALIZATION_OPTIONS.map((opt) => (
                    <option key={opt.specialization_id} value={opt.specialization_id}>
                      {opt.specialization_name}
                    </option>
                  ))}
                </select>
                <select
                  name="experienceYears"
                  value={form.experienceYears || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
          </div>

          <h1>2. Professional Information</h1>
          <div className="location-section">
            <div className="location-card">
              <div className="form-row">
                <select
                  name="personCountry"
                  value={form.personCountry || ""}
                  onChange={handleCountryChange}
                  disabled={isLocationDisabled}
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.iso2}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <select
                  name="personState"
                  value={selectedStateIso}
                  onChange={handleStateChange}
                  disabled={!form.personCountry || isLocationDisabled}
                >
                  <option value="">Select region</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.iso2}>
                      {state.name}
                    </option>
                  ))}
                </select>

                <select
                  name="personCity"
                  value={form.personCity || ""}
                  onChange={handleChange}
                  disabled={!form.personState || isLocationDisabled}
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <select
                  value={selectedPrefix}
                  onChange={handlePrefixChange}
                  disabled={isLocationDisabled}
                  className="phone-prefix"
                  title="Select country code"
                >
                  {phoneCountries.map((country) => (
                    <option key={country.code} value={country.prefix}>
                      {country.prefix}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  disabled={isSubmitting}
                  minLength={7}
                  maxLength={20}
                  title="Phone number must be in valid international format"
                />
              </div>

              <input
                name="personBirthdate"
                type="date"
                placeholder="Birth Date"
                value={form.personBirthdate || ""}
                onChange={handleChange}
                disabled={isSubmitting}
                max={new Date().toISOString().split("T")[0]}
              />

              <div className="form-row">
                <input
                  name="linkedin"
                  placeholder="LinkedIn Profile (optional)"
                  value={form.linkedin || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={200}
                />
                <input
                  name="portfolioWebsite"
                  placeholder="Portfolio Website (optional)"
                  value={form.portfolioWebsite || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={200}
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
            <button className="send-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Register as Teacher"}
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
