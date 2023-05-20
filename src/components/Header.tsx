"use client";
import { Stack } from "@mui/material";

export default function Header() {
  return (
    <Stack
      width="100%"
      height="60%"
      minHeight="250px"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: "url(/assets/images/headerpattern.png)",
      }}
    >
      <Stack mb={4}>
        <h1>Barbecue Schedule</h1>
      </Stack>
    </Stack>
  );
}
