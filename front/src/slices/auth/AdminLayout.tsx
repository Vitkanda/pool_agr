import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminSidebar from "./AdminSidebar";
import AdminRouteGuard from "./AdminRouteGuard";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AdminRouteGuard>
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
        {/* Mobile Drawer */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
            },
          }}
        >
          <AdminSidebar />
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar
            position="sticky"
            color="primary"
            sx={{
              width: { md: `calc(100% - 250px)` },
              ml: { md: "250px" },
            }}
          >
            <Toolbar>
              {isMobile && (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h6" noWrap component="div">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Page Content */}
          <Box
            sx={{
              p: 3,
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </AdminRouteGuard>
  );
};

export default AdminLayout;
