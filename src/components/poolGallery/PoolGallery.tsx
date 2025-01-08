import React, { useState } from "react";
import { Box, IconButton, Typography, Card, CardMedia } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Image from "next/image";

interface PoolGalleryProps {
  images: string[];
  title: string;
}

const PoolGallery: React.FC<PoolGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        mt: 4,
        pb: 4,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "white",
          textAlign: "center",
          pt: 2,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Занятия в &quot;{title}&quot;
      </Typography>

      {/* Слайдер */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Стрелка "Назад" */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: { xs: 5, sm: 10 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
          }}
        >
          <ArrowBackIos
            sx={{ color: "black", fontSize: { xs: "1rem", sm: "1.5rem" } }}
          />
        </IconButton>

        {/* Основное изображение */}
        <CardMedia
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: { xs: "200px", sm: "300px", md: "400px" },
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Фото ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: "12px" }}
          />
        </CardMedia>

        {/* Стрелка "Вперед" */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: { xs: 5, sm: 10 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
          }}
        >
          <ArrowForwardIos
            sx={{ color: "black", fontSize: { xs: "1rem", sm: "1.5rem" } }}
          />
        </IconButton>
      </Box>

      {/* Миниатюры */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mt: 2,
          overflowX: "auto",
          pb: 2,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(255, 255, 255, 0.7)",
            borderRadius: 4,
          },
        }}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              cursor: "pointer",
              borderRadius: "8px",
              transition: "transform 0.3s, border 0.3s",
              border:
                currentIndex === index
                  ? "2px solid rgba(255, 255, 255, 0.9)"
                  : "2px solid transparent",
              boxShadow:
                currentIndex === index
                  ? "0 0 8px rgba(255, 255, 255, 0.9)"
                  : "none",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardMedia
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
              }}
            >
              <Image
                src={image}
                alt={`Миниатюра ${index + 1}`}
                width={80}
                height={80}
                objectFit="cover"
                style={{ borderRadius: "8px" }}
              />
            </CardMedia>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PoolGallery;
