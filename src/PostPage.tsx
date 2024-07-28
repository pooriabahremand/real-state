import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { del, get } from "./api/HttpHelper";
import { AuthContext } from "./context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { PostInterface } from "./interface/interface";
import { Button, Typography } from "@mui/material";
import { LatLngExpression } from "leaflet";

export default function PostPage(): React.ReactNode {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState<PostInterface | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await del(`posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    navigate("/posts");
  };

  const handleEdit = () => {};

  const location: LatLngExpression =
    post && post.latlng && post.latlng.lat && post.latlng.lng
      ? [post.latlng.lat, post.latlng.lng]
      : [35.7219, 51.3347]; // default location

  useEffect(() => {
    const fetchedData = async () => {
      if (id) {
        const result = await get(`posts/${id}`);
        setPost(result);
      }
    };
    fetchedData();
  }, [id]);

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
      <Grid item sx={{ position: "relative", height: "100%" }}>
        <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
          <MapContainer center={location} zoom={11}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location} />
          </MapContainer>
        </Box>
      </Grid>
      <Grid
        item
        component={Paper}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        square
      >
        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "column",
            paddingRight: "2rem",
            paddingLeft: "0.5rem",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ paddingBottom: "2rem" }}>
            <Typography component="h1" variant="h4">
              مشخصات آگهی
            </Typography>
          </Box>

          <Box sx={{ paddingBottom: "2.5rem" }}>
            <Typography sx={{ paddingBottom: "1rem" }}>آدرس : </Typography>
            <Typography>{post?.address}</Typography>
          </Box>
          <Box sx={{ paddingBottom: "2.5rem" }}>
            <Typography sx={{ paddingBottom: "1rem" }}>جزئیات : </Typography>
            <Typography>{post?.description}</Typography>
          </Box>

          {user?.role !== "owner" ? (
            <Box sx={{ paddingBottom: "2.5rem" }}>
              <Typography sx={{ paddingBottom: "1rem" }} variant="h6">
                تنها مالک این آگهی میتواند آن را تغییر دهد یا حذف کند.{" "}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "auto",
              }}
            >
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                ویرایش
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleDelete}
              >
                حدف
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
