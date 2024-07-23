/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const validation = (email: string, password: string) => {
    let validate = true;
    if (!email) {
      toast.warning("Please enter your email");
      validate = false;
    } else if (!password) {
      toast.warning("Please enter your password");
      validate = false;
    }

    return validate;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      validation(data.get("email") as string, data.get("password") as string)
    ) {
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });
    } else {
      console.log("not Validated");
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
            // value={email}
            label="آدرس ایمیل"
            name="email"
            // onChange={(event) => setEmail((_prevState) => event.target.value)}
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
            // value={password}
            // onChange={(event) =>
            //   setPassword((_prevState) => event.target.value)
            // }
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
              <Link href="#" variant="body2">
                رمز خود را فراموش کرده اید؟
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"حساب کاربری ندارید؟ ثبت نام کنید."}
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
