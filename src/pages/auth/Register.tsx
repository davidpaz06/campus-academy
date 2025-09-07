import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Register.css";

const roles = [
  {
    key: "student",
    label: "Student",
    icon: <Icon icon="material-symbols:school-rounded" className="option-icon" />,
    route: "/register/student",
  },
  {
    key: "teacher",
    label: "Teacher",
    icon: <Icon className="option-icon" icon="material-symbols:cases-rounded" />,
    route: "/register/teacher",
  },
  {
    key: "school",
    label: "School",
    icon: <Icon className="option-icon" icon="material-symbols:apartment-rounded" />,
    route: "/create-institution",
  },
];

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-role-container">
      <div className="register-role-card">
        <h1 className="register-role-title">Select your role</h1>
        <div className="register-role-options">
          {roles.map((role) => (
            <button key={role.key} onClick={() => navigate(role.route)} className={`register-role-btn`}>
              {role.icon}
              <span className="register-role-label">{role.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="login-footer">
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
