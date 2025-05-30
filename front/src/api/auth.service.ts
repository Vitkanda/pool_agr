// // src/api/auth.service.ts
// import api from "./api";
// import { Pool } from "@/types/poolsTypes"; // Импортируйте тип Pool

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: string;
//   managedPools?: Pool[]; // Добавляем необязательное свойство managedPools
// }

// export interface AuthResponse {
//   user: User;
//   access_token: string;
// }

// const AuthService = {
//   login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
//     const response = await api.post<AuthResponse>("/auth/login", credentials);

//     // Сохраняем токен и данные пользователя в localStorage
//     localStorage.setItem("token", response.data.access_token);
//     localStorage.setItem("user", JSON.stringify(response.data.user));

//     return response.data;
//   },

//   logout: (): void => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   },

//   getCurrentUser: (): User | null => {
//     if (typeof window === "undefined") return null;

//     const userStr = localStorage.getItem("user");
//     if (!userStr) return null;

//     try {
//       return JSON.parse(userStr) as User;
//     } catch (e) {
//       console.error("Ошибка при парсинге пользователя из localStorage", e);
//       return null;
//     }
//   },

//   isAuthenticated: (): boolean => {
//     if (typeof window === "undefined") return false;
//     return !!localStorage.getItem("token");
//   },

//   isAdmin: (): boolean => {
//     const user = AuthService.getCurrentUser();
//     return user?.role === "admin";
//   },
// };

// export default AuthService;


// src/api/auth.service.ts
import api from "./api";
import { Pool } from "@/types/poolsTypes"; // Импортируйте тип Pool

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  managedPools?: Pool[]; // Добавляем необязательное свойство managedPools
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

const AuthService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);

    // Сохраняем токен и данные пользователя в localStorage
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;

    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch (e) {
      console.error("Ошибка при парсинге пользователя из localStorage", e);
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },

  isAdmin: (): boolean => {
    const user = AuthService.getCurrentUser();
    return user?.role === "admin";
  },

  isManager: (): boolean => {
    const user = AuthService.getCurrentUser();
    return user?.role === "manager";
  },

  // Проверяем, имеет ли текущий пользователь доступ к редактированию бассейна
  canEditPool: (poolId: string): boolean => {
    const user = AuthService.getCurrentUser();
    
    // Админы могут редактировать любой бассейн
    if (user?.role === "admin") return true;

    // Менеджеры могут редактировать только назначенные им бассейны
    if (user?.role === "manager" && user.managedPools) {
      return user.managedPools.some(pool => pool.id === poolId);
    }

    return false;
  }
};

export default AuthService;