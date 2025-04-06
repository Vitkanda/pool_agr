// src/api/users.service.ts
import api from "./api";
import { User } from "./auth.service";

// interface UsersResponse {
//   items: User[];
//   total: number;
// }

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

const UsersService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  createUser: async (user: CreateUserDTO): Promise<User> => {
    const response = await api.post<User>("/users", user);
    return response.data;
  },

  updateUser: async (id: string, user: UpdateUserDTO): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  assignPoolToUser: async (userId: string, poolId: string): Promise<User> => {
    const response = await api.post<User>(`/users/${userId}/pools`, { poolId });
    return response.data;
  },

  removePoolFromUser: async (userId: string, poolId: string): Promise<User> => {
    const response = await api.delete<User>(`/users/${userId}/pools/${poolId}`);
    return response.data;
  },
};

export default UsersService;
