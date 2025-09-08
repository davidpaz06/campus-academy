import { useState, useCallback } from "react";
import type { RegisterStudent } from "@/types/user";
import Footer from "@/layouts/components/Footer";
import { useLocationData } from "@/hooks/useLocationData";
import { useFetch } from "@/hooks/useFetch";
import { ACADEMIC_LEVEL_OPTIONS, STUDY_AREA_OPTIONS, GENDER_OPTIONS } from "@/constants/formData";
import { useAlertContext } from "@/context/AlertContext";
import { validateStudentForm, ValidationError } from "@/utils/validations";
import InstitutionSearch from "@/components/forms/InstitutionSearch";
import "./RegisterStudent.css";

const DEFAULT_FORM: Partial<RegisterStudent> = {
  profileId: 4,

  email: "",
  username: "",
  password: "",
  personFirstName: "",
  personMiddleName: "",
  personSurname: "",
  personSecondSurname: "",
  personBirthdate: "",
  personPhone: "+1 ",

  personGender: "",
  academicLevelId: undefined,
  studyAreaId: undefined,
  institutionId: "",
  studentCountry: "",
  studentState: "",
  studentCity: "",
};

export default function RegisterStudent() {
  const [form, setForm] = useState<Partial<RegisterStudent>>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para UI
  const [selectedAcademicLevel, setSelectedAcademicLevel] = useState<number | null>(null);
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
    setSelectedAcademicLevel(null);
    setSelectedPrefix("+1");
    setPhoneNumber("");
    setSelectedStateIso("");
  }, []);

  const updatePersonPhone = useCallback((prefix: string, number: string) => {
    const cleanNumber = number.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, personPhone: cleanNumber ? `${prefix} ${cleanNumber}` : `${prefix} ` }));
  }, []);

  // ✅ handleChange simplificado - sin validaciones frontend
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      // Solo limpiar username de caracteres no permitidos
      if (name === "username") {
        setForm((prev) => ({ ...prev, [name]: value.replace(/[^a-zA-Z0-9_]/g, "") }));
        return;
      }

      if (name === "academicLevelId" || name === "studyAreaId") {
        const numValue = value ? parseInt(value) : undefined;
        setForm((prev) => ({ ...prev, [name]: numValue }));

        if (name === "academicLevelId") {
          setSelectedAcademicLevel(numValue || null);
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

      setForm((prev) => ({ ...prev, studentCountry: countryCode, studentState: "", studentCity: "" }));
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
      setForm((prev) => ({ ...prev, studentState: stateName, studentCity: "" }));

      if (stateIso && form.studentCountry) {
        await loadCitiesForState(form.studentCountry, stateIso);
      }
    },
    [form.studentCountry, loadCitiesForState, states]
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

      const loadingId = loading("Registering student...", { title: "Creating Account", dismissible: false });

      try {
        const validatedData = validateStudentForm({ ...form, profileId: 4 });

        await post("https://campus-api-gateway.onrender.com/api/auth/register", validatedData, "json");

        removeAlert(loadingId);
        success("Student registered successfully!", { title: "Registration Complete", duration: 8000 });

        resetForm();
      } catch (err) {
        removeAlert(loadingId);

        if (err instanceof ValidationError) {
          // ✅ Pasar el array directamente para mostrar como lista
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

  // ✅ Valores derivados
  const selectedLevelDescription = selectedAcademicLevel
    ? ACADEMIC_LEVEL_OPTIONS.find((opt) => opt.academic_level_id === selectedAcademicLevel)?.academic_level_description
    : null;

  const isLocationDisabled = locationLoading || isSubmitting;

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
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email || ""}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={50} // ✅ Max 50 caracteres
              />

              <div className="form-row">
                <input
                  name="username"
                  placeholder="Username"
                  value={form.username || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25} // ✅ Max 25 caracteres
                  minLength={3} // ✅ Min 3 caracteres
                  pattern="[a-zA-Z0-9_]+" // ✅ Solo letras, números y underscores
                  title="Username can only contain letters, numbers, and underscores"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password (min 8 characters)"
                  value={form.password || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  minLength={8} // ✅ Min 8 caracteres
                />
              </div>

              <div className="form-row">
                <input
                  name="personFirstName"
                  placeholder="First Name"
                  value={form.personFirstName || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25} // ✅ Max 25 caracteres
                  minLength={2} // ✅ Min 2 caracteres
                />
                <input
                  name="personMiddleName"
                  placeholder="Middle Name (optional)"
                  value={form.personMiddleName || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25} // ✅ Max 25 caracteres
                />
              </div>

              <div className="form-row">
                <input
                  name="personSurname"
                  placeholder="Last Name"
                  value={form.personSurname || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25} // ✅ Max 25 caracteres
                  minLength={2} // ✅ Min 2 caracteres
                />
                <input
                  name="personSecondSurname"
                  placeholder="Second Last Name (optional)"
                  value={form.personSecondSurname || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={25} // ✅ Max 25 caracteres
                />
              </div>

              <div className="form-row">
                <select
                  name="academicLevelId"
                  value={form.academicLevelId || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                  name="studentState"
                  value={selectedStateIso}
                  onChange={handleStateChange}
                  disabled={!form.studentCountry || isLocationDisabled}
                >
                  <option value="">Select region</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.iso2}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <select
                name="studentCity"
                value={form.studentCity || ""}
                onChange={handleChange}
                disabled={!form.studentState || isLocationDisabled}
              >
                <option value="">Select city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>

              <div className="form-row phone-row">
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
                  minLength={7} // ✅ Min 7 caracteres total
                  maxLength={20} // ✅ Para el número sin prefijo
                  title="Phone number must be in valid international format"
                />
              </div>

              <div className="form-row">
                <select
                  name="personGender"
                  value={form.personGender || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <input
                  name="personBirthdate"
                  type="date"
                  placeholder="Birth Date"
                  value={form.personBirthdate || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  max={new Date().toISOString().split("T")[0]} // ✅ No fechas futuras
                />
              </div>
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
            <button className="send-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Register as Student"}
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
