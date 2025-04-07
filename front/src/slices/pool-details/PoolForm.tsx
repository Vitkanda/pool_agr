// src/slices/pool-details/PoolForm.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  FormHelperText,
  Alert,
  CircularProgress,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Pool } from "@/types/poolsTypes";
import { metroStations } from "@/components/searchBar/metroStations";
import PoolsService from "@/api/pools.service";
import AuthService from "@/api/auth.service";

interface PoolFormProps {
  editMode?: boolean;
  poolId?: string;
}

const initialPool: Partial<Pool> = {
  name: "",
  geometry: {
    coordinates: [55.751244, 37.618423], // Центр Москвы по умолчанию
  },
  properties: {
    CompanyMetaData: {
      name: "",
      address: "",
      Phones: [{ type: "phone", formatted: "" }],
      url: "",
      Hours: { text: "" },
      Categories: [{ name: "Бассейн для детей" }],
      rating: 0,
      reviews: [],
    },
    description: "",
  },
  services: [],
  images: [],
  priceRange: {
    individual: 0,
    group: 0,
    trial: 0,
  },
  metroStations: [],
};

const PoolForm: React.FC<PoolFormProps> = ({ editMode = false, poolId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(editMode);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pool, setPool] = useState<Partial<Pool>>(initialPool);
  const [unauthorized, setUnauthorized] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // Флаг для отслеживания загрузки данных

  // Состояние для загрузки изображений
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState<string>("");

  // Получаем текущего пользователя
  const currentUser = AuthService.getCurrentUser();

  // Выносим fetchPool в useCallback, чтобы избежать пересоздания функции
  const fetchPool = useCallback(async () => {
    if (!editMode || !poolId || dataFetched) return;

    try {
      setLoadingData(true);
      console.log("Загрузка данных бассейна с ID:", poolId);

      const poolData = await PoolsService.getPoolById(poolId);

      // Проверяем права доступа для менеджера
      if (currentUser?.role === "manager") {
        const hasAccess = currentUser.managedPools?.some(
          (managedPool) => managedPool.id === poolId
        );

        if (!hasAccess) {
          setUnauthorized(true);
          setError("У вас нет прав на редактирование этого бассейна");
          setLoadingData(false);
          return;
        }
      }

      setPool(poolData);

      // Установка списка изображений
      if (poolData.images) {
        setImageUrls(poolData.images);
      }

      setDataFetched(true); // Отмечаем, что данные загружены
    } catch (err: any) {
      console.error("Ошибка при загрузке данных бассейна:", err);
      setError(err.message || "Ошибка при загрузке данных бассейна");
    } finally {
      setLoadingData(false);
    }
  }, [editMode, poolId, currentUser, dataFetched]);

  // Используем useEffect только один раз для загрузки данных
  useEffect(() => {
    fetchPool();
  }, [fetchPool]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Обработка вложенных свойств
    if (name.includes(".")) {
      const parts = name.split(".");
      setPool((prev) => {
        const newPool = { ...prev };
        let current: any = newPool;

        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }

        current[parts[parts.length - 1]] = value;
        return newPool;
      });
    } else {
      setPool((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? 0 : parseFloat(value);

    if (name.includes(".")) {
      const parts = name.split(".");
      setPool((prev) => {
        const newPool = { ...prev };
        let current: any = newPool;

        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }

        current[parts[parts.length - 1]] = numValue;
        return newPool;
      });
    } else {
      setPool((prev) => ({ ...prev, [name]: numValue }));
    }
  };

  // Обработка изменений в выпадающих списках
  const handleSelectChange = (e: SelectChangeEvent<string[]>) => {
    const { name, value } = e.target;
    setPool((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoordinateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;
    const numValue = value === "" ? 0 : parseFloat(value);

    setPool((prev) => {
      const newPool = { ...prev };
      if (!newPool.geometry) {
        newPool.geometry = { coordinates: [0, 0] };
      }

      const newCoordinates = [...newPool.geometry.coordinates];
      newCoordinates[index] = numValue;
      newPool.geometry.coordinates = newCoordinates as [number, number];

      return newPool;
    });
  };

  // Обработка добавления изображения
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");

      // Также обновляем состояние бассейна
      setPool((prev) => ({
        ...prev,
        images: [...(prev.images || []), newImageUrl.trim()],
      }));
    }
  };

  // Обработка удаления изображения
  const handleRemoveImage = (index: number) => {
    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1);
    setImageUrls(updatedUrls);

    // Также обновляем состояние бассейна
    setPool((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  // Обработка добавления метро
  const handleMetroChange = (e: SelectChangeEvent<string[]>) => {
    const selectedNames =
      typeof e.target.value === "string" ? [e.target.value] : e.target.value;

    // Создаем объекты станций метро для выбранных имен
    const selectedStations = selectedNames.map((name) => ({
      name,
      coordinates: [37.0, 55.0] as [number, number], // Заглушка
      distance: "1 км", // Заглушка
    }));

    setPool((prev) => ({
      ...prev,
      metroStations: selectedStations,
    }));
  };

  // Валидация формы
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!pool.properties?.CompanyMetaData.name) {
      newErrors["properties.CompanyMetaData.name"] = "Название обязательно";
    }

    if (!pool.properties?.CompanyMetaData.address) {
      newErrors["properties.CompanyMetaData.address"] = "Адрес обязателен";
    }

    if (!pool.priceRange?.individual) {
      newErrors["priceRange.individual"] =
        "Укажите стоимость индивидуального занятия";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Убедимся, что изображения добавлены в пул перед отправкой
    pool.images = imageUrls;

    setLoading(true);
    setError(null);

    try {
      if (editMode && poolId) {
        await PoolsService.updatePool(poolId, pool);
      } else {
        await PoolsService.createPool(pool);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/pools");
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Произошла ошибка при сохранении"
      );
    } finally {
      setLoading(false);
    }
  };

  if (unauthorized) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          У вас нет прав на редактирование этого бассейна
        </Alert>
        <Button variant="contained" onClick={() => router.push("/admin/pools")}>
          Вернуться к списку бассейнов
        </Button>
      </Box>
    );
  }

  if (loadingData) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Загрузка данных бассейна...
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Бассейн успешно {editMode ? "обновлен" : "добавлен"}!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Основная информация
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Название бассейна"
              fullWidth
              required
              name="properties.CompanyMetaData.name"
              value={pool.properties?.CompanyMetaData.name || ""}
              onChange={handleChange}
              error={!!formErrors["properties.CompanyMetaData.name"]}
              helperText={formErrors["properties.CompanyMetaData.name"]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Адрес"
              fullWidth
              required
              name="properties.CompanyMetaData.address"
              value={pool.properties?.CompanyMetaData.address || ""}
              onChange={handleChange}
              error={!!formErrors["properties.CompanyMetaData.address"]}
              helperText={formErrors["properties.CompanyMetaData.address"]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Телефон"
              fullWidth
              name="properties.CompanyMetaData.Phones[0].formatted"
              value={
                pool.properties?.CompanyMetaData.Phones?.[0]?.formatted || ""
              }
              onChange={handleChange}
              placeholder="+7 (XXX) XXX-XX-XX"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Сайт"
              fullWidth
              name="properties.CompanyMetaData.url"
              value={pool.properties?.CompanyMetaData.url || ""}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Часы работы"
              fullWidth
              name="properties.CompanyMetaData.Hours.text"
              value={pool.properties?.CompanyMetaData.Hours?.text || ""}
              onChange={handleChange}
              placeholder="Пн-Вс: 09:00-21:00"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Описание"
              fullWidth
              multiline
              rows={4}
              name="properties.description"
              value={pool.properties?.description || ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Координаты
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Широта"
              fullWidth
              type="number"
              value={pool.geometry?.coordinates[0] || 0}
              onChange={(e) => handleCoordinateChange(e, 0)}
              inputProps={{ step: "0.000001" }}
              helperText="Координата широты (первое число)"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Долгота"
              fullWidth
              type="number"
              value={pool.geometry?.coordinates[1] || 0}
              onChange={(e) => handleCoordinateChange(e, 1)}
              inputProps={{ step: "0.000001" }}
              helperText="Координата долготы (второе число)"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Цены и услуги
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Цена индивидуального занятия (₽)"
              fullWidth
              required
              type="number"
              name="priceRange.individual"
              value={pool.priceRange?.individual || ""}
              onChange={handleNumberChange}
              error={!!formErrors["priceRange.individual"]}
              helperText={formErrors["priceRange.individual"]}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Цена группового занятия (₽)"
              fullWidth
              type="number"
              name="priceRange.group"
              value={pool.priceRange?.group || ""}
              onChange={handleNumberChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Цена пробного занятия (₽)"
              fullWidth
              type="number"
              name="priceRange.trial"
              value={pool.priceRange?.trial || ""}
              onChange={handleNumberChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Услуги</InputLabel>
              <Select
                multiple
                value={pool.services || []}
                onChange={handleSelectChange}
                name="services"
                input={<OutlinedInput label="Услуги" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="Индивидуальные занятия">
                  Индивидуальные занятия
                </MenuItem>
                <MenuItem value="Групповые занятия">Групповые занятия</MenuItem>
                <MenuItem value="Аква-йога">Аква-йога</MenuItem>
                <MenuItem value="Гидро реабилитация">
                  Гидро реабилитация
                </MenuItem>
                <MenuItem value="Занятия для малышей">
                  Занятия для малышей
                </MenuItem>
                <MenuItem value="Занятия для взрослых">
                  Занятия для взрослых
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Изображения
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
              <TextField
                label="URL изображения"
                fullWidth
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={handleAddImage}
                disabled={!newImageUrl.trim()}
              >
                Добавить
              </Button>
            </Box>

            {/* Список добавленных изображений */}
            {imageUrls.length > 0 ? (
              <Grid container spacing={2}>
                {imageUrls.map((url, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={url}
                        alt={`Изображение ${index + 1}`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/400x300?text=Ошибка+загрузки";
                        }}
                      />
                      <Box
                        sx={{
                          p: 1,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ maxWidth: "80%" }}
                        >
                          {url.split("/").pop()}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary">
                Нет добавленных изображений
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Метро
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Ближайшие станции метро</InputLabel>
              <Select
                multiple
                value={pool.metroStations?.map((station) => station.name) || []}
                onChange={handleMetroChange}
                input={<OutlinedInput label="Ближайшие станции метро" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {metroStations.map((station) => (
                  <MenuItem key={station} value={station}>
                    {station}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Выберите ближайшие станции метро</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push("/admin/pools")}
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
          {editMode ? "Сохранить изменения" : "Добавить бассейн"}
        </Button>
      </Box>
    </Box>
  );
};

export default PoolForm;
