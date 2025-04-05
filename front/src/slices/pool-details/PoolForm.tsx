/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
  Grid2,
} from "@mui/material";
import { Pool } from "@/types/poolsTypes";
// import { allPools } from "@/lib/allPools";
import { metroStations } from "@/components/searchBar/metroStations";
import PoolsService from "@/api/pools.service";

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
  // const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [pool, setPool] = useState<Partial<Pool>>({
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
  });

  // Загрузка данных бассейна при редактировании
  useEffect(() => {
    if (editMode && poolId) {
      const fetchPool = async () => {
        try {
          setLoadingData(true);
          const poolData = await PoolsService.getPoolById(poolId);
          setPool(poolData);
        } catch (err: any) {
          setError(err.message || "Ошибка при загрузке данных бассейна");
        } finally {
          setLoadingData(false);
        }
      };

      fetchPool();
    }
  }, [editMode, poolId]);

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

    // setError(newErrors);
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

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

  if (loadingData) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
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

        <Grid2 container spacing={3}>
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
        </Grid2>
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
          Местоположение
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Ближайшее метро</InputLabel>
              <Select
                multiple
                value={pool.metroStations?.map((station) => station.name) || []}
                onChange={(e: SelectChangeEvent<string[]>) => {
                  const selectedNames =
                    typeof e.target.value === "string"
                      ? [e.target.value]
                      : e.target.value;

                  // Создаем объекты станций метро для выбранных имен
                  const selectedStations = selectedNames.map((name) => ({
                    name,
                    coordinates: [37.0, 55.0] as [number, number], // Заглушка
                    distance: "Н/Д", // Заглушка
                  }));

                  setPool((prev) => ({
                    ...prev,
                    metroStations: selectedStations,
                  }));
                }}
                input={<OutlinedInput label="Ближайшее метро" />}
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
