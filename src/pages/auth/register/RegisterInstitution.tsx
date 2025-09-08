import { useState, useCallback } from "react";
import type { RegisterInstitution } from "@/types/user";
import Footer from "@/layouts/components/Footer";
import { useLocationData } from "@/hooks/useLocationData";
import { useFetch } from "@/hooks/useFetch";
import { INSTITUTION_TYPE_OPTIONS, GRADING_SYSTEM_OPTIONS, FORM_SECTIONS, BENEFITS_LIST } from "@/constants/formData";
import { useAlertContext } from "@/context/AlertContext";
import "./RegisterInstitution.css";

const DEFAULT_FORM_VALUES: Partial<RegisterInstitution> = {
  profileId: 2,
  paymentAmount: 0,
  paymentTypeId: 1,

  institutionPhone: "+1 ",
  email: "",
  username: "",
  password: "",
  institutionName: "",
  institutionTypeId: undefined,
  gradingSystemId: undefined,
  institutionDescription: "",
  website: "",
  instagram: "",
  facebook: "",
  twitter: "",
  institutionCountry: "",
  institutionState: "",
  institutionCity: "",
  institutionAddress: "",
};

export default function RegisterInstitution() {
  // ✅ Estados agrupados por funcionalidad
  const [form, setForm] = useState<Partial<RegisterInstitution>>(DEFAULT_FORM_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para UI
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<number | null>(null);
  const [selectedPrefix, setSelectedPrefix] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedStateIso, setSelectedStateIso] = useState("");

  // ✅ Hooks agrupados
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

  // ✅ Función de reset limpia
  const resetForm = useCallback(() => {
    setForm(DEFAULT_FORM_VALUES);
    setSelectedInstitutionType(null);
    setSelectedPrefix("+1");
    setPhoneNumber("");
    setSelectedStateIso("");
  }, []);

  // ✅ Función para actualizar teléfono simplificada
  const updateInstitutionPhone = useCallback((prefix: string, number: string) => {
    const cleanNumber = number.replace(/\D/g, "");
    const fullPhone = cleanNumber ? `${prefix} ${cleanNumber}` : `${prefix} `;
    setForm((prev) => ({ ...prev, institutionPhone: fullPhone }));
  }, []);

  // ✅ Handlers organizados y simplificados
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "institutionTypeId" || name === "gradingSystemId") {
        const numValue = value ? parseInt(value) : undefined;
        setForm((prev) => ({ ...prev, [name]: numValue }));

        if (name === "institutionTypeId") {
          setSelectedInstitutionType(numValue || null);
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
        institutionCountry: countryCode,
        institutionState: "",
        institutionCity: "",
      }));
      setSelectedStateIso("");

      if (!countryCode) return;

      await loadStatesForCountry(countryCode);

      // Auto-seleccionar prefijo del país
      const selectedCountry = countries.find((c) => c.iso2 === countryCode);
      if (selectedCountry?.phonecode) {
        const newPrefix = `+${selectedCountry.phonecode}`;
        setSelectedPrefix(newPrefix);
        updateInstitutionPhone(newPrefix, phoneNumber);
      }
    },
    [loadStatesForCountry, countries, phoneNumber, updateInstitutionPhone]
  );

  const handleStateChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const stateIso = e.target.value;
      const selectedState = states.find((state) => state.iso2 === stateIso);
      const stateName = selectedState?.name || "";

      setSelectedStateIso(stateIso);
      setForm((prev) => ({
        ...prev,
        institutionState: stateName,
        institutionCity: "",
      }));

      if (stateIso && form.institutionCountry) {
        await loadCitiesForState(form.institutionCountry, stateIso);
      }
    },
    [form.institutionCountry, loadCitiesForState, states]
  );

  const handlePrefixChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newPrefix = e.target.value;
      setSelectedPrefix(newPrefix);
      updateInstitutionPhone(newPrefix, phoneNumber);
    },
    [phoneNumber, updateInstitutionPhone]
  );

  const handlePhoneNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNumber = e.target.value.replace(/\D/g, "");
      setPhoneNumber(newNumber);
      updateInstitutionPhone(selectedPrefix, newNumber);
    },
    [selectedPrefix, updateInstitutionPhone]
  );

  // ✅ Preparación de datos para envío simplificada
  const prepareFormData = useCallback(
    () => ({
      ...form,
      institutionTypeId: form.institutionTypeId && form.institutionTypeId > 0 ? form.institutionTypeId : 1,
      gradingSystemId: form.gradingSystemId && form.gradingSystemId > 0 ? form.gradingSystemId : 1,
      profileId: 2,
      paymentAmount: 0,
      paymentTypeId: 1,
      // Asegurar que todos los campos string tengan valores
      email: form.email || "",
      username: form.username || "",
      password: form.password || "",
      institutionName: form.institutionName || "",
      institutionDescription: form.institutionDescription || "",
      institutionCountry: form.institutionCountry || "",
      institutionState: form.institutionState || "",
      institutionCity: form.institutionCity || "",
      institutionAddress: form.institutionAddress || "",
      institutionPhone: form.institutionPhone || "",
      website: form.website || "",
      instagram: form.instagram || "",
      facebook: form.facebook || "",
      twitter: form.twitter || "",
    }),
    [form]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const loadingId = loading("Registering institution...", {
        title: "Creating Account",
        dismissible: false,
      });

      try {
        const formData = prepareFormData();
        console.log("Sending form data:", formData);

        await post("https://campus-api-gateway.onrender.com/api/institutions", formData, "json");

        removeAlert(loadingId);
        success("Institution registered successfully! Check your email for verification.", {
          title: "Registration Complete",
          duration: 8000,
        });

        resetForm();
      } catch (err) {
        removeAlert(loadingId);
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        error(`Registration failed: ${errorMessage}`, {
          title: "Registration Error",
          duration: 0,
        });
        console.error("Registration failed:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [prepareFormData, post, loading, success, error, removeAlert, resetForm]
  );

  // ✅ Valores derivados
  const selectedTypeDescription = selectedInstitutionType
    ? INSTITUTION_TYPE_OPTIONS.find((opt) => opt.institution_type_id === selectedInstitutionType)
        ?.institution_type_description
    : null;

  const isLocationDisabled = locationLoading || isSubmitting;

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
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <input
                  name="username"
                  placeholder="Username"
                  value={form.username || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password || ""}
                onChange={handleChange}
                disabled={isSubmitting}
              />

              <input
                name="institutionName"
                placeholder="Institution name"
                value={form.institutionName || ""}
                onChange={handleChange}
                disabled={isSubmitting}
              />

              <div className="form-row">
                <select
                  name="institutionTypeId"
                  value={form.institutionTypeId || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">Select institution type</option>
                  {INSTITUTION_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.institution_type_id} value={opt.institution_type_id}>
                      {opt.institution_type_name}
                    </option>
                  ))}
                </select>
                <select
                  name="gradingSystemId"
                  value={form.gradingSystemId || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
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
                name="institutionDescription"
                placeholder="Institution description (optional)"
                value={form.institutionDescription || ""}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <h1>{FORM_SECTIONS.LOCATION.title}</h1>
          <div className="location-section">
            <div className="location-card">
              <div className="form-row">
                <select
                  name="institutionCountry"
                  value={form.institutionCountry || ""}
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
                  name="institutionState"
                  value={selectedStateIso}
                  onChange={handleStateChange}
                  disabled={!form.institutionCountry || isLocationDisabled}
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
                  name="institutionCity"
                  value={form.institutionCity || ""}
                  onChange={handleChange}
                  disabled={!form.institutionState || isLocationDisabled}
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <input
                  name="institutionAddress"
                  placeholder="Address"
                  value={form.institutionAddress || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
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
                />
              </div>

              <div className="form-row">
                <input
                  name="website"
                  placeholder="Website"
                  value={form.website || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <input
                  name="instagram"
                  placeholder="Instagram"
                  value={form.instagram || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-row">
                <input
                  name="facebook"
                  placeholder="Facebook"
                  value={form.facebook || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <input
                  name="twitter"
                  placeholder="Twitter"
                  value={form.twitter || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
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
            <button className="send-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Send"}
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
