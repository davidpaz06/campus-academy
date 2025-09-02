import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

type Position = "top" | "bottom" | "left" | "right";

interface ContextMenuOption {
  label: string;
  value: string;
  className?: string;
}

interface ContextMenuProps {
  icon?: React.ReactNode;
  options: ContextMenuOption[];
  onSelect: (value: string) => void;
  position?: Position;
  direction?: "left" | "right";
  className?: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  icon = <Icon icon="material-symbols:more-vert" />,
  options,
  onSelect,
  position = "bottom",
  direction = "left",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Position styles
  const getMenuStyle = (): React.CSSProperties => {
    switch (position) {
      case "top":
        if (direction === "right") return { bottom: "100%", left: 0 };
        else if (direction === "left") return { bottom: "100%", right: 0 };
        else return { bottom: "100%" };

      case "bottom":
        if (direction === "right") return { bottom: "100%", left: 0 };
        else if (direction === "left") return { bottom: "100%", right: 0 };
        else return { top: "100%", left: 0 };

      case "left":
        return { right: "100%", top: 0 };

      case "right":
        return { left: "100%", top: 0 };

      default:
        return { top: "100%", left: 0 };
    }
  };

  return (
    <span
      ref={ref}
      className={`context-menu-trigger ${className}`}
      style={{ position: "relative", display: "inline-block" }}
    >
      <span
        className="context-menu-icon"
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => setOpen((o) => !o)}
      >
        {icon}
      </span>
      {open && (
        <ul
          className="context-menu-list"
          style={{
            position: "absolute",
            minWidth: 120,
            margin: 0,
            padding: "0.25rem 0",
            listStyle: "none",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 20,
            ...getMenuStyle(),
          }}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className={`context-menu-label${
                opt.className ? ` ${opt.className}` : ""
              }`}
              style={{
                padding: "0.5rem 1rem",
                textAlign: "left",
                cursor: "pointer",
                color: "#333",
                fontSize: "0.95rem",
                fontWeight: 500,
                transition: "background 0.2s",
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};

export default ContextMenu;
