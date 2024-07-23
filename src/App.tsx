import React from "react";
import Header from "./components/Header";
import MUIWrapper from "./context/Context";
import { ToastContainer } from "react-toastify";
// import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App(): React.ReactNode {
  return (
    <>
      <ToastContainer />
      <MUIWrapper>
        <Header />
        <SignUp />
      </MUIWrapper>
    </>
  );
}

export default App;
