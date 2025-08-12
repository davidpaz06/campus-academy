import React from "react";
import { Outlet } from "react-router-dom";
import ExternalHeader from "../components/layout/ExternalHeader";

const PublicLayout: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--background-lightblue)",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "100px 1fr",
        gridTemplateColumns: "100%",
      }}
    >
      <header
        style={{
          gridRow: "1",
          gridColumn: "1",
          zIndex: 1,
        }}
      >
        <ExternalHeader />
      </header>
      <main
        style={{
          gridRow: "2",
          gridColumn: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
