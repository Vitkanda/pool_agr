import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "@/slices/auth/authSlice";

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // В реальном проекте здесь был бы запрос к API
      // Для демонстрации используем простую проверку
      if (email === "admin@example.com" && password === "password") {
        dispatch(login({
          id: "1",
          email: email,
          name: "Администратор",
          role: "admin"
        }));
      } else {
        setError("Неверный email или пароль");
      }
    } catch (err) {
      setError("Ошибка авторизации. Попробуйте позже.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)", // Вычитаем высоту хедера
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          align="center"
          fontWeight="bold"
          mb={3}
        >
          Вход в административную панель
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Войти"}
          </Button>
        </form>
        
        <Typography variant="caption" display="block" mt={2} align="center" color="text.secondary">
          Для демо: Email: admin@example.com, Пароль: password
        </Typography>
      </Paper>
    </Box>
  );
};

export default AuthForm;