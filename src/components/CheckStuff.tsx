import { Box, Typography } from "@mui/material";

export default function CheckStuff() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      <Typography>این یک متن ساده است</Typography>
    </Box>
  );
}
