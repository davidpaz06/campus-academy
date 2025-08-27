import React from "react";
import { Outlet } from "react-router-dom";
import InternalHeader from "@/components/layout/InternalHeader";

const InternalLayout: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--background-lightblue)",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "60px 1fr",
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
        <InternalHeader />
      </header>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gridRow: "2",
          gridColumn: "1",
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--charlestone-green) #f1f1f1",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default InternalLayout;
