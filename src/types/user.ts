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
  email: string;
  username: string;
  password: string;
  profileId: number;
  institutionId: string;
  personFirstName: string;
  personMiddleName: string;
  personSurname: string;
  personSecondSurname: string;
  personPhone: string;
  personBirthDate: string;

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
  profileId: number;
  institutionId: string;
  personFirstName: string;
  personMiddleName: string;
  personSurname: string;
  personSecondSurname: string;
  personPhone: string;
  personBirthDate: string;

  specializationId: number;
  experienceYears: number;
  linkedin?: string;
  portfolioWebsite?: string;

  personCountry: string;
  personState: string;
  personCity: string;
}
