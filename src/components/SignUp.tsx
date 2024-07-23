import * as React from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp(): React.ReactNode {
  const validation = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passConfirm: string
  ) => {
    let validate = true;
    if (!email) {
      toast.warning("ایمیل خود را وارد کنید");
      validate = false;
    }
    if (!password) {
      toast.warning("رمز عبور خود را وارد کنید");
      validate = false;
    }
    if (!passConfirm) {
      toast.warning("بخش تکرار رمز عبور را تکمیل کنید");
      validate = false;
    }
    if (!firstName) {
      toast.warning("نام خود را وارد کنید");
      validate = false;
    }
    if (!lastName) {
      toast.warning("نام خانوادگی خود را وارد کنید");
      validate = false;
    }

    return validate;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      validation(
        data.get("firstName") as string,
        data.get("lastName") as string,
        data.get("email") as string,
        data.get("password") as string,
        data.get("password-confirm") as string
      )
    ) {
      console.log({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        passConfirm: data.get("password-confirm"),
        allowExtraEmails: data.get("checkBox") ? true : false,
      });
    } else {
      console.log("not validated");
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
                required
                fullWidth
                id="firstName"
                label="نام"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="نام خانوادگی"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="آدرس ایمیل"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="رمز عبور"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password-confirm"
                label="تکرار رمز عبور"
                type="password"
                id="password-confirm"
                autoComplete="password-confirm"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    name="checkBox"
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
