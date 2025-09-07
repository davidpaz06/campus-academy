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
  person_first_name: string;
  person_surname: string;
  institution_name: string;
  profile_id: string;
  institution_type: string;
  grading_system: string;
  institution_description: string;

  country: string;
  region: string;
  city: string;
  address: string;
  business_email: string;
  phone: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
}
