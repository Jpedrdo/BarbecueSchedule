"use client";
import { Button, Stack, Box, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ILogin } from "@/interfaces";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = e.target as typeof e.target & ILogin;

    if (email.value && password.value) router.push("/home");
  };

  return (
    <Stack
      direction="column"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "34ch" },
      }}
      alignItems="center"
      mt={-16}
      onSubmit={handleSubmit}
    >
      <Box pl={2} fontWeight="bold">
        Email
      </Box>
      <TextField
        name="email"
        placeholder="e-mail"
        variant="outlined"
        type="email"
        required
      />
      <Box pt={2} pl={2} fontWeight="bold">
        Password
      </Box>
      <TextField
        name="password"
        placeholder="password"
        variant="outlined"
        type="password"
        required
      />
      <Stack pt={5}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            background: "#000",
            color: "#fff",
            height: 50,
            "&:hover": {
              opacity: 0.8,
              color: "#fff",
              background: "#3d3b44",
            },
            textTransform: "none",
            fontSize: 16,
            borderRadius: "30px",
          }}
        >
          Login
        </Button>
        <Box pt={1} sx={{ fontSize: 12 }} textAlign="center">
          *You can use any email and password to login*
        </Box>
      </Stack>
    </Stack>
  );
}
