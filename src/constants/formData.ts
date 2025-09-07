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

export const ACADEMIC_LEVEL_OPTIONS = [
  {
    idx: 0,
    academic_level_id: 1,
    academic_level_name: "High School",
    academic_level_description:
      "Secondary education typically for students aged 14-18, preparing for college or vocational training.",
  },
  {
    idx: 1,
    academic_level_id: 2,
    academic_level_name: "Associate Degree",
    academic_level_description:
      "Two-year undergraduate degree typically offered by community colleges and technical schools.",
  },
  {
    idx: 2,
    academic_level_id: 3,
    academic_level_name: "Bachelor's Degree",
    academic_level_description:
      "Four-year undergraduate degree that provides comprehensive education in a specific field of study.",
  },
  {
    idx: 3,
    academic_level_id: 4,
    academic_level_name: "Master's Degree",
    academic_level_description:
      "Graduate-level degree that typically requires 1-2 years of study beyond a bachelor's degree.",
  },
  {
    idx: 4,
    academic_level_id: 5,
    academic_level_name: "Doctoral Degree",
    academic_level_description:
      "Highest level of academic degree, involving extensive research and original contribution to knowledge.",
  },
  {
    idx: 5,
    academic_level_id: 6,
    academic_level_name: "Certificate Program",
    academic_level_description: "Specialized training program focused on specific skills or knowledge areas.",
  },
  {
    idx: 6,
    academic_level_id: 7,
    academic_level_name: "Other",
    academic_level_description: "Alternative or non-traditional educational paths and learning experiences.",
  },
] as const;

export const STUDY_AREA_OPTIONS = [
  { idx: 0, study_area_id: 1, study_area_name: "Computer Science & Technology" },
  { idx: 1, study_area_id: 2, study_area_name: "Business & Management" },
  { idx: 2, study_area_id: 3, study_area_name: "Engineering" },
  { idx: 3, study_area_id: 4, study_area_name: "Health & Medicine" },
  { idx: 4, study_area_id: 5, study_area_name: "Arts & Design" },
  { idx: 5, study_area_id: 6, study_area_name: "Social Sciences" },
  { idx: 6, study_area_id: 7, study_area_name: "Natural Sciences" },
  { idx: 7, study_area_id: 8, study_area_name: "Mathematics" },
  { idx: 8, study_area_id: 9, study_area_name: "Languages & Literature" },
  { idx: 9, study_area_id: 10, study_area_name: "Education" },
  { idx: 10, study_area_id: 11, study_area_name: "Law" },
  { idx: 11, study_area_id: 12, study_area_name: "Psychology" },
  { idx: 12, study_area_id: 13, study_area_name: "Communications & Media" },
  { idx: 13, study_area_id: 14, study_area_name: "Environmental Studies" },
  { idx: 14, study_area_id: 15, study_area_name: "Other" },
] as const;

export const SPECIALIZATION_OPTIONS = [
  { idx: 0, specialization_id: 1, specialization_name: "Computer Science & Programming" },
  { idx: 1, specialization_id: 2, specialization_name: "Mathematics" },
  { idx: 2, specialization_id: 3, specialization_name: "Science (Biology, Chemistry, Physics)" },
  { idx: 3, specialization_id: 4, specialization_name: "English & Literature" },
  { idx: 4, specialization_id: 5, specialization_name: "History & Social Studies" },
  { idx: 5, specialization_id: 6, specialization_name: "Foreign Languages" },
  { idx: 6, specialization_id: 7, specialization_name: "Arts & Design" },
  { idx: 7, specialization_id: 8, specialization_name: "Business & Economics" },
  { idx: 8, specialization_id: 9, specialization_name: "Engineering" },
  { idx: 9, specialization_id: 10, specialization_name: "Health & Medicine" },
  { idx: 10, specialization_id: 11, specialization_name: "Physical Education & Sports" },
  { idx: 11, specialization_id: 12, specialization_name: "Music & Performing Arts" },
  { idx: 12, specialization_id: 13, specialization_name: "Psychology & Counseling" },
  { idx: 13, specialization_id: 14, specialization_name: "Special Education" },
  { idx: 14, specialization_id: 15, specialization_name: "Other" },
] as const;

// SECCIONES DEL FORMULARIO

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

// Agregar nuevas secciones para Student y Teacher
export const STUDENT_FORM_SECTIONS = {
  REGISTRATION: {
    title: "1. Student Registration",
    description:
      "Join our educational community as a student and unlock access to innovative learning experiences, AI-powered assistance, and collaborative tools designed to enhance your academic journey.",
  },
  PERSONAL: {
    title: "2. Personal Information",
    description:
      "Complete your profile with personal information to help us provide you with a personalized learning experience tailored to your academic needs and goals.",
  },
} as const;

export const TEACHER_FORM_SECTIONS = {
  REGISTRATION: {
    title: "1. Teacher Registration",
    description:
      "Join our educational platform as an educator and gain access to advanced teaching tools, AI assistance, and a global community of learners and fellow educators.",
  },
  PROFESSIONAL: {
    title: "2. Professional Information",
    description:
      "Share your professional background and expertise to help us create the best teaching experience for you and your students.",
  },
} as const;

export const STUDENT_BENEFITS_LIST = [
  "AI-powered learning assistance",
  "Interactive courses and materials",
  "Collaboration with peers and educators",
  "Progress tracking and analytics",
  "Campus social network",
] as const;

export const TEACHER_BENEFITS_LIST = [
  "Advanced teaching and grading tools",
  "AI-powered content creation assistance",
  "Student progress analytics",
  "Collaboration with global educators",
  "Professional development resources",
] as const;
