import React from "react";
import Header from "./Header";
import SignInComponent from "./SignInComponent";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Home";

function App(): React.ReactNode {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="sign-in" element={<SignInComponent />} />
      </Routes>
    </>
  );
}

export default App;
