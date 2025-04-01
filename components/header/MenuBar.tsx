import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";

import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import { companyName } from "../../variables.tsx";
import { useUserContext } from "../../context/userContext.tsx";
import toast from "react-hot-toast";

function MenuBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = Boolean(anchorEl);

  const navigate = useNavigate();
  const theme = useTheme();
  const { token, setToken } = useUserContext();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("calendarData");
    setToken("");
    toast.success("You’ve been logged out successfully. See you soon!");
    navigate("/");
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: theme.palette.primary.main, zIndex: 1000 }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => (token ? navigate("/home") : navigate("/"))}
            sx={{
              mr: 2,
              display: { xs: "none", md: "inline-table" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: theme.palette.orange.main,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {companyName}
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => (token ? navigate("/home") : navigate("/"))}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {companyName}
          </Typography>

          {token && (
            <Stack
              flexDirection="row"
              alignItems="center"
              gap={1}
              sx={{ position: "absolute", right: "0" }}
            >
              <Box>
                <IconButton
                  size="medium"
                  edge="end"
                  color="inherit"
                  sx={{ flexGrow: 0 }}
                  id="basic-button"
                  aria-controls={openMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleMenuClick}
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <IconButton
                    disableRipple={true}
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                  >
                    <AccountCircle />
                    <Typography ml={1}>Profile</Typography>
                  </IconButton>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <IconButton
                    disableRipple={true}
                    size="large"
                    aria-label="Logout"
                    aria-controls="Logout"
                    aria-haspopup="true"
                  >
                    <LogoutSharpIcon />
                    <Typography ml={1}>Logout</Typography>
                  </IconButton>
                </MenuItem>
              </Menu>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuBar;
