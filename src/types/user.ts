export interface User {
  campusUserId: string; // ✅ Coincide con JWT
  profileId: number; // ✅ Coincide con JWT
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  institutionId?: string;
  institutionName?: string;
  profileName?: string;
}

// ✅ Interface AuthResponse
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// ✅ Interfaces de registro corregidas
export interface RegisterStudent {
  email: string;
  username: string;
  password: string;
  profileId: number;
  institutionId: string;
  personFirstName: string;
  personMiddleName?: string;
  personSurname: string;
  personSecondSurname?: string;
  personPhone: string;
  personBirthdate: string; // ✅ Consistente
  personGender: string;
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
  personMiddleName?: string;
  personSurname: string;
  personSecondSurname?: string;
  personPhone: string;
  personBirthdate: string; // ✅ Consistente
  specializationId: number;
  experienceYears: number;
  linkedin?: string;
  portfolioWebsite?: string;
  personCountry: string;
  personState: string;
  personCity: string;
}

// ✅ Mantener InstitutionRegisterData
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

// ✅ Interfaces faltantes
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

// ✅ Interfaces de autenticación
export interface LoginCredentials {
  username: string;
  password: string;
}

// ✅ Actualizar RegisterData para incluir campos requeridos
export interface RegisterData {
  email: string;
  username: string;
  password: string;
  profileId: number; // ✅ Agregar profileId
  // Agregar otros campos comunes según necesites
}

// ✅ Agregar interface para JWT payload
export interface JWTPayload {
  campusUserId: string;
  profileId: number;
  iat: number; // Issued at
  exp: number; // Expiration time
}

// ✅ Agregar interface para profile types
export interface Profile {
  profileId: number;
  profileName: string;
  profileDescription?: string;
}
