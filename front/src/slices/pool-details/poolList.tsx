// src/slices/pool-details/PoolsList.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PoolsService from "@/api/pools.service";
import { Pool } from "@/types/poolsTypes";
// Удалены неиспользуемые импорты
import AuthService from "@/api/auth.service";

const PoolsList: React.FC = () => {
  const router = useRouter();
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [poolToDelete, setPoolToDelete] = useState<string | null>(null);
  
  // Получаем текущего пользователя
  const currentUser = AuthService.getCurrentUser();

  const fetchPools = async () => {
    setLoading(true);
    try {
      const response = await PoolsService.getAllPools();
      
      // Если пользователь админ, показываем все бассейны
      // Если менеджер - только те, которые ему назначены
      if (currentUser?.role === "admin") {
        setPools(response);
      } else if (currentUser?.role === "manager" && currentUser.managedPools) {
        // Получаем только бассейны, которыми управляет менеджер
        const filteredPools = response.filter(pool => 
          currentUser.managedPools?.some(managedPool => managedPool.id === pool.id)
        );
        setPools(filteredPools);
      } else {
        setPools([]);
      }
    } catch (err: any) {
      setError(err.message || "Ошибка при загрузке данных бассейнов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, []);

  const handleEditPool = (id: string) => {
    router.push(`/admin/pools/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setPoolToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (poolToDelete) {
      try {
        await PoolsService.deletePool(poolToDelete);
        setPools(pools.filter((pool) => pool.id !== poolToDelete));
      } catch (err: any) {
        setError(err.message || "Ошибка при удалении бассейна");
      }
    }
    setDeleteDialogOpen(false);
    setPoolToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPoolToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Загрузка списка бассейнов...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h2">
          {currentUser?.role === "manager" 
            ? "Ваши бассейны" 
            : "Все бассейны"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/admin/pools/add")}
        >
          Добавить бассейн
        </Button>
      </Box>

      {pools.length === 0 ? (
        <Alert severity="info">
          {currentUser?.role === "manager" 
            ? "Вам не назначены бассейны для управления" 
            : "Список бассейнов пуст"}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Адрес</TableCell>
                <TableCell>Метро</TableCell>
                <TableCell>Рейтинг</TableCell>
                <TableCell>Цена (₽)</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pools.map((pool) => (
                <TableRow key={pool.id}>
                  <TableCell>{pool.properties.CompanyMetaData.name}</TableCell>
                  <TableCell>{pool.properties.CompanyMetaData.address}</TableCell>
                  <TableCell>
                    {pool.metroStations && pool.metroStations.length > 0
                      ? pool.metroStations[0].name
                      : "Не указано"}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={pool.properties.CompanyMetaData.rating.toFixed(1)} 
                      color="primary" 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>от {pool.priceRange.individual}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditPool(pool.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    {currentUser?.role === "admin" && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(pool.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Диалог подтверждения удаления */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Удаление бассейна</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот бассейн? Это действие нельзя отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Отмена</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PoolsList;