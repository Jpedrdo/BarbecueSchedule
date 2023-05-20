"use client";
import { ReactNode } from "react";
import { Stack } from "@mui/material";
import { Header, Footer } from "@/components";
import { usePathname } from "next/navigation";

export default function Container({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const isHome = pathName.includes("/home");

  return (
    <Stack height="100vh" width="100%" minHeight={isHome ? "705px" : ""}>
      <Header />
      <Stack
        direction="column"
        alignItems="center"
        columnGap={1}
        pt={2}
        width="100%"
        height="100%"
        mt={2}
        sx={{
          boxShadow:
            "0px 0px 44px 73px rgba(255,215,54,1); -moz-box-shadow: 0px 0px 44px 73px rgba(255,215,54,1); box-shadow: 0px 0px 44px 73px rgba(255,215,54,1);",
          background: isHome ? "#fafafa" : "",
        }}
      >
        {children}
        <Stack marginTop="auto" pt={5}>
          <Footer />
        </Stack>
      </Stack>
    </Stack>
  );
}
