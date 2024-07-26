import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import MUIWrapper from "./context/Context";
import { ToastContainer } from "react-toastify";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import LocationProvider from "./context/LocationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MUIWrapper>
        <LocationProvider>
          <AuthProvider>
            <ToastContainer />
            <App />
          </AuthProvider>
        </LocationProvider>
      </MUIWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
