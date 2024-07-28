/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { signinValidation, toastWarning } from "./utils/utils";
import { post } from "./api/HttpHelper";
import { AuthContext } from "./context/AuthContext";

export default function SignIn() {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const onChangeHandler = (e: {
    target: { name: string; value: string };
  }): void => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signinValidation(formData.email, formData.password)) {
      const result = await post("login", {
        body: JSON.stringify({ ...formData, role: "user" }),
      });

      // console.log(result);

      if (result.accessToken) {
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            accessToken: result.accessToken,
            userId: result.user.id,
            role: "user",
          })
        );
        setUser({
          accessToken: result.accessToken,
          userId: result.user.id,
          role: result.user.role,
        });

        navigate("/posts");
      } else {
        if (result === "Incorrect password") {
          toastWarning("رمز عبور وارد شده اشتباه است");
        } else if (result === "Cannot find user") {
          toastWarning("همچین کاربری یافت نشد");
        } else {
          toastWarning(result);
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ورود
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={formData.email}
            label="آدرس ایمیل"
            name="email"
            onChange={onChangeHandler}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="رمز عبور"
            type="password"
            value={formData.password}
            onChange={onChangeHandler}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="مرا به خاطر داشته باش"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ورود
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography textAlign="center" variant="body2">
                  رمز خود را فراموش کرده اید ؟
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/sign-up"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography textAlign="center" variant="body2">
                  حساب کاربری ندارید؟ ثبت نام کنید.
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 8, mb: 4 }}
      >
        تمام حقوق این سایت متعلق به مشاورین املاک ایرانیان است
      </Typography>
    </Container>
  );
}
