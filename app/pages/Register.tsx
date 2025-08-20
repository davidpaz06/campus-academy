import { useState } from "react";
import { Icon } from "@iconify/react";
import CreateInstitution from "./CreateInstitution";
import "./Register.css";

import { useEffect } from "react";

const roles = [
  {
    key: "student",
    label: "Student",
    icon: (
      <Icon icon="material-symbols:school-rounded" className="option-icon" />
    ),
  },
  {
    key: "teacher",
    label: "Teacher",
    icon: (
      <Icon className="option-icon" icon="material-symbols:cases-rounded" />
    ),
  },
  {
    key: "school",
    label: "School",
    icon: (
      <Icon className="option-icon" icon="material-symbols:apartment-rounded" />
    ),
  },
];

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (selectedRole === "school") {
        header.classList.remove("color-stripe");
        header.classList.add("create-institution-header");
      } else {
        header.classList.remove("create-institution-header");
        header.classList.add("color-stripe");
      }
    }
    return () => {
      if (header) {
        header.classList.remove("color-stripe");
        header.classList.remove("gray-stripe");
      }
    };
  }, [selectedRole]);

  switch (selectedRole) {
    case "school":
      return <CreateInstitution />;
    case "student":
      // return <StudentRegister />; // Componente para estudiantes
      return <div>Student registration coming soon.</div>;
    case "teacher":
      // return <TeacherRegister />; // Componente para profesores
      return <div>Teacher registration coming soon.</div>;
    default:
  }

  return (
    <div className="register-role-container">
      <div className="register-role-card">
        <h1 className="register-role-title">Select your role</h1>
        <div className="register-role-options">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => setSelectedRole(role.key)}
              className={`register-role-btn${
                selectedRole === role.key ? " selected" : ""
              }`}
            >
              {role.icon}
              <span className="register-role-label">{role.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
