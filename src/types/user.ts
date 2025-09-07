export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "instructor" | "admin";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface InstitutionRegisterData extends RegisterData {
  institution_type: string;
  grading_system: string;
  institution_description?: string;
  country: string;
  region: string;
  city: string;
  address: string;
  business_email: string;
  phone_number?: string;
}

export interface RegisterInstitution {
  email: string;
  username: string;
  password: string;
  institution_name: string;
  institution_description: string;
  profile_id: string;
  institution_type_id: number;
  grading_system_id: number;

  institution_country: string;
  institution_state: string;
  institution_address: string;
  institution_phone: string;

  institution_city: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
}

export interface RegisterStudent {
  email: "string";
  username: "string";
  password: "string";
  profileId: 4;
  institutionId: "string";
  personFirstName: "string";
  personMiddleName: "string";
  personSurname: "string";
  personSecondSurname: "string";
  personPhone: "string";
  personBirthDate: "2024-06-20";

  studyAreaId: number;
  academicLevelId: number;
  studentCountry: string;
  studentState: string;
  studentCity: string;
}

export interface RegisterTeacher {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_id: string;
  specialization_id: number;
  experience_years: number;

  teacher_country: string;
  teacher_state: string;
  teacher_city: string;
  teacher_phone?: string;

  birth_date?: string;
  gender?: string;
  institution_code?: string;
  bio?: string;
  linkedin?: string;
  portfolio_website?: string;
}
