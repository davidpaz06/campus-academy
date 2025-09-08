export interface ValidationResult {
  isValid: boolean;
  error?: string;
  value: any;
}

export class ValidationError extends Error {
  public errors: string[];

  constructor(field: string, errors: string | string[]) {
    const errorArray = Array.isArray(errors) ? errors : [errors];
    super(`${field}: ${errorArray.join(", ")}`);
    this.name = "ValidationError";
    this.errors = errorArray; // ✅ Guardar array de errores
  }
}

// ✅ Validaciones individuales
export const validators = {
  // Email
  email: (value: string): ValidationResult => {
    const email = (value || "").trim();

    if (!email) return { isValid: false, error: "Email is required", value: email };
    if (email.length > 50) return { isValid: false, error: "Email must be 50 characters or less", value: email };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { isValid: false, error: "Invalid email format", value: email };

    return { isValid: true, value: email };
  },

  // Username
  username: (value: string): ValidationResult => {
    const username = (value || "").trim();

    if (!username) return { isValid: false, error: "Username is required", value: username };
    if (username.length < 3)
      return { isValid: false, error: "Username must be at least 3 characters", value: username };
    if (username.length > 25)
      return { isValid: false, error: "Username must be 25 characters or less", value: username };

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username))
      return { isValid: false, error: "Username can only contain letters, numbers, and underscores", value: username };

    return { isValid: true, value: username };
  },

  // Password
  password: (value: string): ValidationResult => {
    const password = value || "";

    if (!password) return { isValid: false, error: "Password is required", value: password };
    if (password.length < 8)
      return { isValid: false, error: "Password must be at least 8 characters", value: password };

    return { isValid: true, value: password };
  },

  // Nombres (First name, surname)
  requiredName: (value: string, fieldName: string = "Name"): ValidationResult => {
    const name = (value || "").trim();

    if (!name) return { isValid: false, error: `${fieldName} is required`, value: name };
    if (name.length < 2) return { isValid: false, error: `${fieldName} must be at least 2 characters`, value: name };
    if (name.length > 25) return { isValid: false, error: `${fieldName} must be 25 characters or less`, value: name };

    return { isValid: true, value: name };
  },

  // Nombres opcionales (Middle name, second surname)
  optionalName: (value: string, fieldName: string = "Name"): ValidationResult => {
    const name = (value || "").trim();

    if (name.length > 25) return { isValid: false, error: `${fieldName} must be 25 characters or less`, value: name };

    return { isValid: true, value: name };
  },

  // Teléfono
  phone: (value: string): ValidationResult => {
    const phone = value || "";

    if (!phone) return { isValid: false, error: "Phone is required", value: phone };
    if (phone.length < 7) return { isValid: false, error: "Phone must be at least 7 characters", value: phone };
    if (phone.length > 25) return { isValid: false, error: "Phone must be 25 characters or less", value: phone };

    // Validar formato internacional básico
    const phoneRegex = /^\+\d{1,4}\s[\d\s]{6,}$/;
    if (!phoneRegex.test(phone))
      return {
        isValid: false,
        error: "Phone must be in valid international format (e.g., +57 1 234 5678)",
        value: phone,
      };

    return { isValid: true, value: phone };
  },

  // Fecha de nacimiento
  birthDate: (value: string): ValidationResult => {
    const date = value || "";

    if (!date) return { isValid: false, error: "Birth date is required", value: date };

    // Validar formato ISO YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return { isValid: false, error: "Birth date must be in format YYYY-MM-DD", value: date };

    // Validar que sea una fecha válida
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return { isValid: false, error: "Invalid birth date", value: date };

    // Validar que no sea fecha futura
    if (parsedDate > new Date()) return { isValid: false, error: "Birth date cannot be in the future", value: date };

    return { isValid: true, value: date };
  },

  // ID numérico requerido
  requiredId: (value: number | undefined, fieldName: string = "ID"): ValidationResult => {
    if (!value || value <= 0)
      return { isValid: false, error: `${fieldName} is required and must be greater than 0`, value: value || 1 };

    return { isValid: true, value: value };
  },

  // UUID
  uuid: (value: string, fieldName: string = "ID"): ValidationResult => {
    const uuid = (value || "").trim();

    if (!uuid) return { isValid: false, error: `${fieldName} is required`, value: uuid };

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) return { isValid: false, error: `${fieldName} must be a valid UUID`, value: uuid };

    return { isValid: true, value: uuid };
  },

  // Campo opcional
  optional: (value: string, maxLength: number = 255): ValidationResult => {
    const val = (value || "").trim();

    if (val.length > maxLength) return { isValid: false, error: `Must be ${maxLength} characters or less`, value: val };

    return { isValid: true, value: val };
  },

  // ID numérico opcional
  optionalId: (value: number | undefined, fieldName: string = "ID"): ValidationResult => {
    if (value === undefined || value === null) return { isValid: true, value: undefined };
    if (value <= 0) return { isValid: false, error: `${fieldName} must be greater than 0`, value: value };

    return { isValid: true, value: value };
  },
};

// ✅ Función principal para validar formularios
export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, (value: any) => ValidationResult>
): any => {
  const errors: string[] = [];
  const validatedData: Record<string, any> = {};

  Object.entries(rules).forEach(([field, validator]) => {
    try {
      const result = validator(data[field]);

      if (!result.isValid) {
        // ✅ Formatear error con nombre del campo más legible
        const fieldDisplayName = formatFieldName(field);
        errors.push(`${fieldDisplayName}: ${result.error}`);
      }

      validatedData[field] = result.value;
    } catch (error) {
      const fieldDisplayName = formatFieldName(field);
      errors.push(`${fieldDisplayName}: Validation error`);
    }
  });

  if (errors.length > 0) {
    throw new ValidationError("Form validation", errors); // ✅ Pasar array completo
  }

  return validatedData;
};

// ✅ Función para formatear nombres de campos
const formatFieldName = (field: string): string => {
  const fieldNames: Record<string, string> = {
    email: "Email",
    username: "Username",
    password: "Password",
    profileId: "Profile",
    personFirstName: "First name",
    personSurname: "Last name",
    personMiddleName: "Middle name",
    personSecondSurname: "Second last name",
    personPhone: "Phone number",
    personBirthdate: "Birth date",
    personGender: "Gender",
    institutionId: "Institution",
    academicLevelId: "Academic level",
    studyAreaId: "Study area",
    studentCountry: "Country",
    studentState: "State",
    studentCity: "City",
    institutionName: "Institution name",
    institutionTypeId: "Institution type",
    gradingSystemId: "Grading system",
    // Agregar más según necesites
  };

  return fieldNames[field] || field;
};

// ✅ Validaciones específicas para estudiantes
export const validateStudentForm = (data: any) => {
  return validateForm(data, {
    email: validators.email,
    username: validators.username,
    password: validators.password,
    profileId: (value) => validators.requiredId(value, "Profile"),
    personFirstName: (value) => validators.requiredName(value, "First name"),
    personSurname: (value) => validators.requiredName(value, "Last name"),
    personMiddleName: (value) => validators.optionalName(value, "Middle name"),
    personSecondSurname: (value) => validators.optionalName(value, "Second surname"),
    personPhone: validators.phone,
    personBirthdate: validators.birthDate,
    personGender: (value) => validators.optional(value, 10), // ✅ Agregar validación de género
    institutionId: (value) => validators.uuid(value, "Institution"),
    academicLevelId: (value) => validators.requiredId(value, "Academic level"),
    studyAreaId: (value) => validators.requiredId(value, "Study area"),
    studentCountry: (value) => validators.optional(value, 100),
    studentState: (value) => validators.optional(value, 100),
    studentCity: (value) => validators.optional(value, 100),
  });
};

// ✅ Validaciones específicas para instituciones
export const validateInstitutionForm = (data: any) => {
  return validateForm(data, {
    email: validators.email,
    username: validators.username,
    password: validators.password,
    institutionName: (value) => validators.requiredName(value, "Institution name"),
    institutionTypeId: (value) => validators.requiredId(value, "Institution type"),
    gradingSystemId: (value) => validators.requiredId(value, "Grading system"),
    institutionDescription: (value) => validators.optional(value, 500),
    institutionCountry: (value) => validators.optional(value, 100),
    institutionState: (value) => validators.optional(value, 100),
    institutionCity: (value) => validators.optional(value, 100),
    institutionAddress: (value) => validators.optional(value, 200),
    institutionPhone: validators.phone,
    website: (value) => validators.optional(value, 200),
    instagram: (value) => validators.optional(value, 100),
    facebook: (value) => validators.optional(value, 100),
    twitter: (value) => validators.optional(value, 100),
  });
};
