import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signupValidation, toastWarning } from "./utils/utils";
import { post } from "./api/HttpHelper";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function SignUp(): React.ReactNode {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passConfirm: "",
    allowExtraEmails: false,
  });

  const onChangeHandler = (e: {
    target: { name: string; value: string };
  }): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      signupValidation(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.passConfirm
      )
    ) {
      const result = await post("users", {
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          allowExtraEmails: formData.allowExtraEmails,
        }),
      });
      if (result.accessToken) {
        setUser({
          accessToken: result.accessToken,
          userId: result.user.id,
        });
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            accessToken: result.accessToken,
            userId: result.user.id,
          })
        );
        navigate("/posts");
      } else {
        if (result === "Email already exists") {
          toastWarning("این ایمیل در سیستم ثبت شده است");
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
          ثبت نام
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                value={formData.firstName}
                required
                fullWidth
                id="firstName"
                label="نام"
                autoFocus
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="نام خانوادگی"
                name="lastName"
                value={formData.lastName}
                autoComplete="family-name"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="آدرس ایمیل"
                name="email"
                value={formData.email}
                autoComplete="email"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                value={formData.password}
                label="رمز عبور"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passConfirm"
                value={formData.passConfirm}
                label="تکرار رمز عبور"
                type="password"
                id="password-confirm"
                autoComplete="password-confirm"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={formData.allowExtraEmails}
                    color="primary"
                    name="allowExtraEmails"
                    onChange={() => {
                      formData.allowExtraEmails
                        ? setFormData((state) => ({
                            ...state,
                            allowExtraEmails: false,
                          }))
                        : setFormData((state) => ({
                            ...state,
                            allowExtraEmails: true,
                          }));
                    }}
                  />
                }
                label="مایل به اطلاع از پروفایل های جدید هستم."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ثبت نام
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                حساب کاربری دارید؟ ورود
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}
      >
        تمام حقوق این سایت متعلق به مشاورین املاک ایرانیان است
      </Typography>
    </Container>
  );
}
