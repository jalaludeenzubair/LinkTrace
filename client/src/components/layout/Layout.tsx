import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  onNavbarCreate: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavbarCreate }) => {
  return (
    <div className="layout">
      <Navbar onCreateClick={onNavbarCreate} />
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "var(--spacing-xl) var(--spacing-lg)",
        }}
      >
        {children}
      </main>
    </div>
  );
};
