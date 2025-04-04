import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/slices/auth/authSlice";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  //   IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PoolIcon from "@mui/icons-material/Pool";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";

const AdminSidebar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin/login");
  };

  const isActive = (path: string) => router.pathname === path;

  const menuItems = [
    {
      text: "Панель управления",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      text: "Все бассейны",
      icon: <PoolIcon />,
      path: "/admin/pools",
    },
    {
      text: "Добавить бассейн",
      icon: <AddCircleOutlineIcon />,
      path: "/admin/pools/add",
    },
  ];

  return (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: "background.paper",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* User Profile Section */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mb: 1,
            bgcolor: "primary.main",
          }}
        >
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="h6" component="div">
          {user?.name || "Администратор"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email || "admin@example.com"}
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, pt: 0 }}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            passHref
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={isActive(item.path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(item.path)
                      ? "primary.contrastText"
                      : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      {/* Logout Section */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminSidebar;
