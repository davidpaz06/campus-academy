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
  profileId: number;

  institutionName: string;
  institutionTypeId: number;
  institutionDescription?: string;
  gradingSystemId: number;

  institutionCountry: string;
  institutionState: string;
  institutionCity: string;
  institutionAddress: string;
  institutionPhone?: string;

  website?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;

  paymentAmount: number;
  paymentTypeId: number;
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
