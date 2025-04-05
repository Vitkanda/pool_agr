// src/slices/users/UserForm.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  SelectChangeEvent,
} from '@mui/material';
import UsersService, { CreateUserDTO, UpdateUserDTO } from '@/api/users.service';
import PoolsService from '@/api/pools.service';
import { Pool } from '@/types/poolsTypes';
import { User } from '@/api/auth.service';

interface UserFormProps {
  editMode?: boolean;
  userId?: string;
}

const UserForm: React.FC<UserFormProps> = ({ editMode = false, userId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pools, setPools] = useState<Pool[]>([]);
  const [user, setUser] = useState<Partial<User & { password: string }>>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [selectedPools, setSelectedPools] = useState<string[]>([]);

  // Загрузка пользователя при редактировании
  useEffect(() => {
    const fetchUserAndPools = async () => {
      if (editMode && userId) {
        try {
          setLoading(true);
          const userData = await UsersService.getUserById(userId);
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            password: '',
          });
          
          // Если есть управляемые бассейны, устанавливаем их
          if (userData.managedPools) {
            setSelectedPools(userData.managedPools.map(pool => pool.id));
          }

          // Загрузка всех бассейнов для выбора
          const poolsData = await PoolsService.getAllPools();
          setPools(poolsData.items);
        } catch (err: any) {
          setError(err.message || 'Ошибка при загрузке данных');
        } finally {
          setLoading(false);
        }
      } else {
        // Просто загружаем список бассейнов для новых пользователей
        try {
          const poolsData = await PoolsService.getAllPools();
          setPools(poolsData.items);
        } catch (err: any) {
          setError(err.message || 'Ошибка при загрузке бассейнов');
        }
      }
    };

    fetchUserAndPools();
  }, [editMode, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setUser(prev => ({ ...prev, role: e.target.value }));
  };

  const handlePoolsChange = (e: SelectChangeEvent<string[]>) => {
    setSelectedPools(e.target.value as string[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (editMode && userId) {
        // Подготавливаем объект для обновления
        const updateData: UpdateUserDTO = {
          name: user.name,
          email: user.email,
          role: user.role,
        };
        
        // Включаем пароль только если он был изменен
        if (user.password) {
          updateData.password = user.password;
        }
        
        // Обновляем пользователя
        await UsersService.updateUser(userId, updateData);
        
        // Обновляем назначенные бассейны
        // Здесь нужна будет реализация на бэкенде для обновления привязок
        // ...
        
      } else {
        // Создаем нового пользователя
        const createData: CreateUserDTO = {
          name: user.name!,
          email: user.email!,
          password: user.password!,
          role: user.role!,
        };
        
        const newUser = await UsersService.createUser(createData);
        
        // Назначаем выбранные бассейны новому пользователю
        if (selectedPools.length > 0) {
          for (const poolId of selectedPools) {
            await UsersService.assignPoolToUser(newUser.id, poolId);
          }
        }
      }
      
      setSuccess(true);
      
      // Редирект через небольшую задержку
      setTimeout(() => {
        router.push('/admin/users');
      }, 1500);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Произошла ошибка при сохранении');
    } finally {
      setLoading(false);
    }
  };

  if (loading && editMode) {
    return <Box sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Box>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Пользователь успешно {editMode ? 'обновлен' : 'создан'}!
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editMode ? 'Редактирование пользователя' : 'Создание пользователя'}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Имя пользователя"
              name="name"
              value={user.name || ''}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={user.email || ''}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label={editMode ? "Новый пароль" : "Пароль"}
              name="password"
              type="password"
              value={user.password || ''}
              onChange={handleChange}
              fullWidth
              required={!editMode}
              helperText={editMode ? "Оставьте пустым, чтобы не менять" : ""}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Роль</InputLabel>
              <Select
                name="role"
                value={user.role || 'user'}
                onChange={handleRoleChange}
                label="Роль"
              >
                <MenuItem value="admin">Администратор</MenuItem>
                <MenuItem value="manager">Менеджер</MenuItem>
                <MenuItem value="user">Пользователь</MenuItem>
              </Select>
              <FormHelperText>
                Администраторы имеют полный доступ. Менеджеры управляют назначенными бассейнами.
              </FormHelperText>
            </FormControl>
          </Grid>
          
          {user.role === 'manager' && (
            <Grid item xs={12}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Управляемые бассейны</InputLabel>
                <Select
                  multiple
                  value={selectedPools}
                  onChange={handlePoolsChange}
                  label="Управляемые бассейны"
                >
                  {pools.map((pool) => (
                    <MenuItem key={pool.id} value={pool.id}>
                      {pool.properties.CompanyMetaData.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Выберите бассейны, которыми будет управлять этот пользователь
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/admin/users')}
          disabled={loading}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {editMode ? "Сохранить" : "Создать"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;