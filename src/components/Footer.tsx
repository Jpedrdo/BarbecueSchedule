"use client";
import Image from "next/image";
import Box from "@mui/material/Box";

export default function Footer({}) {
  return (
    <Box mb={5}>
      <Image
        src="/assets/images/logoBarbecue.png"
        alt="logoBarbecue"
        width={48}
        height={48}
      />
    </Box>
  );
}
