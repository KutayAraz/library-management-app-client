import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Library Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate("/books")}
            sx={{
              textDecoration: location.pathname.includes("/books") ? "underline" : "none",
            }}
          >
            Books
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/users")}
            sx={{
              textDecoration: location.pathname.includes("/users") ? "underline" : "none",
            }}
          >
            Users
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
