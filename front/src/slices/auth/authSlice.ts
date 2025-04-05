import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Попытка восстановить состояние авторизации из localStorage
const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        return {
          user,
          isAuthenticated: true,
        };
      } catch (e) {
        console.error(
          "Ошибка при парсинге пользовательского объекта из localStorage:",
          e
        );
        localStorage.removeItem("user");
      }
    }
  }

  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Сохраняем в localStorage для сохранения сессии
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Удаляем из localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
