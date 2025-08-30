import React, { useState, useRef } from "react";

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
  inputProps = {},
}) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync tempValue with value prop when value changes externally
  React.useEffect(() => {
    if (!editing) {
      setTempValue(value);
    }
  }, [value, editing]);

  // Focus input when editing starts
  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    if (tempValue !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditing(false);
      if (tempValue !== value) {
        onChange(tempValue);
      }
    } else if (e.key === "Escape") {
      setEditing(false);
      setTempValue(value);
    }
  };

  return editing ? (
    <input
      ref={inputRef}
      type="text"
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={className}
      style={{
        width: "100%",
        textDecoration: editing ? "none" : "line-through",
      }}
      placeholder={placeholder}
      {...inputProps}
    />
  ) : (
    <span
      className={className}
      onClick={() => setEditing(true)}
      style={{ cursor: "pointer" }}
      title="Click to edit"
    >
      {value || placeholder}
    </span>
  );
};

export default EditableText;
