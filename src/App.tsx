import React from "react";
import Header from "./components/Header";
import MUIWrapper from "./context/Context";
import SignIn from "./components/SignIn";

function App(): React.ReactNode {
  return (
    <>
      <MUIWrapper>
        <Header />
        <SignIn />
      </MUIWrapper>
    </>
  );
}

export default App;
