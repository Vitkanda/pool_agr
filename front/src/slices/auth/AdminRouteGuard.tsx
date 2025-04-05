import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Box, CircularProgress, Typography } from "@mui/material";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Проверка авторизации
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/admin/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, user]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" mt={2}>
          Проверка авторизации...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AdminRouteGuard;