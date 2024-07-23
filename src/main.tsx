import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import MUIWrapper from "./context/Context";
import { ToastContainer } from "react-toastify";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MUIWrapper>
        <ToastContainer />
        <App />
      </MUIWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
