"use client";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";

export default function Footer({}) {
  return (
    <Box mb={5}>
      <Stack
        width={48}
        height={48}
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundImage: "url(/assets/images/logoBarbecue.png)",
        }}
      />
    </Box>
  );
}
