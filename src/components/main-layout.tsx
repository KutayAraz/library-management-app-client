import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { NavBar } from "@/components/navbar";

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <Container component="main" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
