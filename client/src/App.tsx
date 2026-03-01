import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/components.css";
import { AuthProvider } from "./context/Auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 4000,
          className: "",
          style: {
            background: "#fff",
            color: "#363636",
            boxShadow: "var(--shadow-md)",
            borderRadius: "var(--radius-md)",
          },
          success: {
            className: "toast-success",
            duration: 3000,
          },
          error: {
            className: "toast-error",
            duration: 4000,
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
