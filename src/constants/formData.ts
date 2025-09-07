//FIELDS FOR INPUTS AND SELECTS

export const INSTITUTION_FIELDS = [
  { name: "person_first_name", placeholder: "First Name", required: true },
  { name: "person_surname", placeholder: "Last Name", required: true },
  { name: "institution_name", placeholder: "Institution name", required: true },
] as const;

export const LOCATION_FIELDS = [
  { name: "city", placeholder: "City", required: true },
  { name: "address", placeholder: "Address", required: true },
] as const;

export const CONTACT_FIELDS = [
  { name: "business_email", placeholder: "Business Email", type: "email", required: true },
  { name: "phone", placeholder: "Phone", type: "tel", required: false },
  { name: "website", placeholder: "Website", type: "url", required: false },
  { name: "instagram", placeholder: "Instagram", type: "text", required: false },
  { name: "facebook", placeholder: "Facebook", type: "text", required: false },
  { name: "twitter", placeholder: "Twitter", type: "text", required: false },
] as const;

//OPTIONS FOR SELECT FIELDS

export const PROFILE_OPTIONS = [
  { value: "", label: "Select role" },
  { value: "1", label: "Student" },
  { value: "2", label: "Teacher" },
  { value: "3", label: "Admin" },
] as const;

export const INSTITUTION_TYPE_OPTIONS = [
  { value: "", label: "Select institution type" },
  { value: "K-12", label: "K-12" },
  { value: "University", label: "University" },
  { value: "Technical", label: "Technical Institute" },
  { value: "Vocational", label: "Vocational School" },
] as const;

export const GRADING_SYSTEM_OPTIONS = [
  { value: "", label: "Select grading system" },
  { value: "20-point scale", label: "20-point scale" },
  { value: "10-point scale", label: "10-point scale" },
  { value: "100-point scale", label: "100-point scale" },
  { value: "A-F scale", label: "A-F scale" },
  { value: "Pass/Fail", label: "Pass/Fail" },
] as const;

export const FORM_SECTIONS = {
  INSTITUTION: {
    title: "1. Create an institution",
    description:
      "An institution sets the environment on which your own campus will be created, providing a safe context where professors and students may interact.",
  },
  LOCATION: {
    title: "2. Location & Contact",
    description:
      "It is important to us to know where your institution is located, for it is a defining variable on how your AI companion should be contextualized.",
  },
} as const;

export const EDUCATION_INFO = {
  "K-12": {
    title: "🛈 K-12 education",
    description:
      "K12 education, or kindergarten through 12th grade (K-12), refers to the educational journey that spans from kindergarten, typically starting at around age five, through to twelfth grade, usually ending around age 18.",
  },
  University: {
    title: "🛈 University education",
    description:
      "University education provides advanced academic and professional training through undergraduate and graduate programs.",
  },
} as const;

export const BENEFITS_LIST = [
  "All of Campus services and solutions",
  "Operability with Xavier's AI assistance",
  "Interaction with other institutions through Campus Social",
  "Campus expert's back up and mentoring",
] as const;
