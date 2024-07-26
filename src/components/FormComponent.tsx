import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MapComponent from "./MapComponent";
import { post } from "../api/HttpHelper";
import { toastWarning } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LocationContext } from "../context/LocationContext";

// TODO remove, this demo shouldn't need to reset the theme.

export default function NewPostForm(): React.ReactNode {
  const navigate = useNavigate();
  const { location } = useContext(LocationContext);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    address: "",
    number: "",
    description: "",
  });

  console.log("re-rendered in the map form");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await post("posts", {
      body: JSON.stringify({
        ...formData,
        latlng: location,
        userId: user?.userId,
      }),
    });
    if (Object.keys(result).length === 0) {
      toastWarning("مشکلی پیش آمده است، لطفا بعدا مجددا تلاش کنید");
    } else {
      navigate("/posts");
    }
  };

  const onChangeHandler = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "5fr 2fr",
      }}
    >
      <Grid>
        <MapComponent />
      </Grid>
      <Grid item component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            آگهی جدید
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="آدرس"
              name="address"
              autoComplete="address"
              autoFocus
              multiline
              value={formData.address}
              onChange={onChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="number"
              label="تلفن همراه"
              id="number"
              autoComplete="number"
              value={formData.number}
              onChange={onChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="توضیحات"
              id="description"
              autoComplete="description"
              multiline
              value={formData.description}
              onChange={onChangeHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              افزودن آگهی
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
