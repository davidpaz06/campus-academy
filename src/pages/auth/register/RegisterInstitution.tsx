import { useState, useCallback } from "react";
import type { RegisterInstitution } from "@/types/user";
import Footer from "@/layouts/components/Footer";
import { useLocationData } from "@/hooks/useLocationData";
import { validateEmail, validateURL, formatPhoneNumber } from "@/utils/locationUtils";
import {
  PROFILE_OPTIONS,
  INSTITUTION_TYPE_OPTIONS,
  GRADING_SYSTEM_OPTIONS,
  FORM_SECTIONS,
  BENEFITS_LIST,
} from "@/constants/formData";
import "./RegisterInstitution.css";

export default function RegisterInstitution() {
  const [form, setForm] = useState<Partial<RegisterInstitution>>({
    profile_id: "2", // Institution Admin por defecto
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<number | null>(null);

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
        institution_country: countryCode,
        institution_state: "",
        institution_city: "",
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
      const country = form.institution_country;
      setForm((prev) => ({
        ...prev,
        institution_state: stateCode,
        institution_city: "",
      }));

      if (stateCode && country) {
        await loadCitiesForState(country, stateCode);
      }
    },
    [form.institution_country, loadCitiesForState]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      let formattedValue: string | number = value;
      if (name === "institution_phone") {
        formattedValue = formatPhoneNumber(value);
      } else if (name === "institution_type_id") {
        formattedValue = parseInt(value) || "";
        setSelectedInstitutionType(parseInt(value) || null);
      } else if (name === "grading_system_id") {
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
    if (!form.institution_name) newErrors.institution_name = "Institution name is required";
    if (!form.institution_type_id) newErrors.institution_type_id = "Institution type is required";
    if (!form.grading_system_id) newErrors.grading_system_id = "Grading system is required";
    if (!form.institution_country) newErrors.institution_country = "Country is required";
    if (!form.institution_state) newErrors.institution_state = "State is required";
    if (!form.institution_city) newErrors.institution_city = "City is required";
    if (!form.institution_address) newErrors.institution_address = "Address is required";

    if (form.email && !validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (form.website && !validateURL(form.website)) {
      newErrors.website = "Please enter a valid URL";
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

      console.log("Form submitted:", form);
    },
    [form, validateForm]
  );

  // Obtener la descripción del tipo de institución seleccionado
  const selectedTypeDescription = selectedInstitutionType
    ? INSTITUTION_TYPE_OPTIONS.find((opt) => opt.institution_type_id === selectedInstitutionType)
        ?.institution_type_description
    : null;

  return (
    <div className="create-institution-container">
      <div className="create-institution-content">
        <form onSubmit={handleSubmit}>
          <h1>{FORM_SECTIONS.INSTITUTION.title}</h1>
          <div className="institution-section">
            <div className="institution-info">
              <p>{FORM_SECTIONS.INSTITUTION.description}</p>
              <p>
                Your institution's environment serves as a reflection of your educative community. Upon creation, your
                institution will have access to all of our LMS solutions.
              </p>
              {selectedTypeDescription && (
                <div className="education-box">
                  <strong>
                    🛈{" "}
                    {
                      INSTITUTION_TYPE_OPTIONS.find((opt) => opt.institution_type_id === selectedInstitutionType)
                        ?.institution_type_name
                    }
                  </strong>
                  <p>{selectedTypeDescription}</p>
                </div>
              )}
            </div>
            <div className="institution-card">
              <div className="form-row">
                <input name="email" type="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
                <input name="username" placeholder="Username" value={form.username || ""} onChange={handleChange} />
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password || ""}
                onChange={handleChange}
              />
              <input
                name="institution_name"
                placeholder="Institution name"
                value={form.institution_name || ""}
                onChange={handleChange}
              />
              <div className="form-row">
                <select
                  name="institution_type_id"
                  value={form.institution_type_id || ""}
                  onChange={handleChange}
                  aria-label="Institution Type"
                >
                  <option value="">Select institution type</option>
                  {INSTITUTION_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.institution_type_id} value={opt.institution_type_id}>
                      {opt.institution_type_name}
                    </option>
                  ))}
                </select>
                <select
                  name="grading_system_id"
                  value={form.grading_system_id || ""}
                  onChange={handleChange}
                  aria-label="Grading System"
                >
                  <option value="">Select grading system</option>
                  {GRADING_SYSTEM_OPTIONS.map((opt) => (
                    <option key={opt.grading_system_id} value={opt.grading_system_id}>
                      {opt.grading_system_name}
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

          <h1>{FORM_SECTIONS.LOCATION.title}</h1>
          <div className="location-section">
            <div className="location-card">
              <div className="form-row">
                <select
                  name="institution_country"
                  value={form.institution_country || ""}
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
                  name="institution_state"
                  value={form.institution_state || ""}
                  onChange={handleStateChange}
                  aria-label="Region"
                  disabled={!form.institution_country || locationLoading}
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
                  name="institution_city"
                  value={form.institution_city || ""}
                  onChange={handleChange}
                  disabled={!form.institution_state || locationLoading}
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <input
                  name="institution_address"
                  placeholder="Address"
                  value={form.institution_address || ""}
                  onChange={handleChange}
                />
              </div>
              <input
                name="institution_phone"
                placeholder="Phone"
                value={form.institution_phone || ""}
                onChange={handleChange}
              />
              <div className="form-row">
                <input name="website" placeholder="Website" value={form.website || ""} onChange={handleChange} />
                <input name="instagram" placeholder="Instagram" value={form.instagram || ""} onChange={handleChange} />
              </div>
              <div className="form-row">
                <input name="facebook" placeholder="Facebook" value={form.facebook || ""} onChange={handleChange} />
                <input name="twitter" placeholder="Twitter" value={form.twitter || ""} onChange={handleChange} />
              </div>
            </div>
            <div className="location-info">
              <p>{FORM_SECTIONS.LOCATION.description}</p>
              <p>
                We would also like to know a bit about your institution, hence why we invite you to add some social
                media links for a better insight about your needs and goals.
              </p>
              <p>By creating an institution, you'll gain access to:</p>
              <p className="benefits-list">
                {BENEFITS_LIST.map((benefit, index) => (
                  <span key={index}>
                    ✓ {benefit}
                    {index < BENEFITS_LIST.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="submit-section">
            <h2>Ready to take the next step on your education?</h2>
            <button className="send-btn" type="submit">
              Send
            </button>
          </div>
          <div className="submit-footer">
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
