import { styled } from "@mui/material/styles";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled("div")(() => ({
  display: "flex",
  width: "900px",
  justifyContent: "space-between",
  margin: "30px auto",
}));

export default function SignInComponent() {
  const navigate = useNavigate();
  console.log(sessionStorage.getItem("user"));
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <SignIn />
      <SignUp />
    </Container>
  );
}
