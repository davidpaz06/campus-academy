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
  { idx: 1, profile_id: 2, profile_name: "Institution Admin", profile_hierarchy: 2 },
  { idx: 2, profile_id: 3, profile_name: "Teacher", profile_hierarchy: 3 },
  { idx: 3, profile_id: 4, profile_name: "Student", profile_hierarchy: 4 },
] as const;

export const INSTITUTION_TYPE_OPTIONS = [
  {
    idx: 0,
    institution_type_id: 1,
    institution_type_name: "University",
    institution_type_description:
      "An university is an institution of higher education and research which awards academic degrees in various academic disciplines. Universities typically offer undergraduate and postgraduate programs.",
  },
  {
    idx: 1,
    institution_type_id: 2,
    institution_type_name: "Technical Institute",
    institution_type_description:
      "A technical institute is an educational institution that specializes in providing vocational education and training in technical fields.",
  },
  {
    idx: 2,
    institution_type_id: 3,
    institution_type_name: "Online Platform",
    institution_type_description:
      "An online platform is a digital space that offers educational courses and resources through the internet.",
  },
  {
    idx: 3,
    institution_type_id: 4,
    institution_type_name: "K-12 School",
    institution_type_description:
      "K12 education, or kindergarten through 12th grade (K-12), refers to the educational journey that spans from kindergarten, typically starting at around age five, through to twelfth grade, usually ending around age 18.",
  },
  {
    idx: 4,
    institution_type_id: 5,
    institution_type_name: "Training Center",
    institution_type_description:
      "A training center is an institution that provides vocational training and education to individuals seeking to acquire specific skills for their careers. It can also be meant for corpoarate training serving as a capacitation center for employees and interns.",
  },
  {
    idx: 5,
    institution_type_id: 6,
    institution_type_name: "Other",
    institution_type_description:
      "Personalized education knows no boundaries. From private tutoring to specialized workshops, this category encompasses a wide range of educational experiences.",
  },
] as const;

export const GRADING_SYSTEM_OPTIONS = [
  { idx: 0, grading_system_id: 1, grading_system_name: "4.0 GPA Scale" },
  { idx: 1, grading_system_id: 2, grading_system_name: "Letter Grade System (A–F)" },
  { idx: 2, grading_system_id: 3, grading_system_name: "100-Point Percentage Scale" },
  { idx: 3, grading_system_id: 4, grading_system_name: "100-Point Point Scale" },
  { idx: 4, grading_system_id: 5, grading_system_name: "20-Point Scale" },
  { idx: 5, grading_system_id: 6, grading_system_name: "10-point Scale" },
  { idx: 6, grading_system_id: 7, grading_system_name: "5-Point Scale" },
  { idx: 7, grading_system_id: 8, grading_system_name: "Other" },
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
