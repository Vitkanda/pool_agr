// import React from "react";
// import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
// import Carousel from "react-material-ui-carousel";
// import Image from "next/image";

// interface Pool {
//   id: string;
//   name: string;
//   coordinates: [number, number];
//   district: string;
//   metroStation: string;
//   address: string;
//   ageGroups: string[];
//   priceRange: {
//     individual: number;
//     group: number;
//   };
//   description: string;
//   images: string[];
//   schedule: string;
//   rating: number;
// }

// interface PoolCardsProps {
//   pools: Pool[];
// }

// const PoolCards: React.FC<PoolCardsProps> = ({ pools }) => {
//   const chunkPools = (arr: Pool[], size: number) =>
//     arr.reduce<Pool[][]>((acc, _, i) => {
//       if (i % size === 0) acc.push(arr.slice(i, i + size));
//       return acc;
//     }, []);

//   const poolChunks = chunkPools(pools, 3);

//   return (
//     <Box sx={{ my: 4 }}>
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ fontWeight: 700, mb: 4 }}
//       >
//         Наши бассейны
//       </Typography>
//       <Carousel
//         autoPlay={true}
//         indicators={true}
//         animation="slide"
//         navButtonsAlwaysVisible={true}
//         sx={{ maxWidth: "100%" }}
//       >
//         {poolChunks.map((chunk, index) => (
//           <Box
//             key={index}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               gap: 2,
//               px: 2,
//             }}
//           >
//             {chunk.map((pool) => (
//               <Card
//                 key={pool.id}
//                 sx={{
//                   maxWidth: 400,
//                   boxShadow: 3,
//                   borderRadius: 2,
//                   overflow: "hidden",
//                 }}
//               >
//                 <CardMedia>
//                   <Image
//                     src={pool.images[0]}
//                     alt={pool.name}
//                     width={400}
//                     height={250}
//                     style={{ objectFit: "cover" }}
//                   />
//                 </CardMedia>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                     {pool.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Район: {pool.district}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Метро: {pool.metroStation}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Цена: Индивидуально - {pool.priceRange.individual}₽,
//                     Групповой - {pool.priceRange.group}₽
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     График: {pool.schedule}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="primary"
//                     sx={{ mt: 1, fontWeight: 500 }}
//                   >
//                     Рейтинг: {pool.rating} ★
//                   </Typography>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         ))}
//       </Carousel>
//     </Box>
//   );
// };

// export default PoolCards;

import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";

interface Pool {
  id: string;
  name: string;
  coordinates: [number, number];
  district: string;
  metroStation: string;
  address: string;
  ageGroups: string[];
  priceRange: {
    individual: number;
    group: number;
  };
  description: string;
  images: string[];
  schedule: string;
  rating: number;
}

interface PoolCardsProps {
  pools: Pool[];
}

const PoolCards: React.FC<PoolCardsProps> = ({ pools }) => {
  const router = useRouter();

  const chunkPools = (arr: Pool[], size: number) =>
    arr.reduce<Pool[][]>((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const poolChunks = chunkPools(pools, 3);

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 4 }}
      >
        Наши бассейны
      </Typography>
      <Carousel
        autoPlay={true}
        indicators={true}
        animation="slide"
        navButtonsAlwaysVisible={true}
        sx={{ maxWidth: "100%" }}
      >
        {poolChunks.map((chunk, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              px: 2,
            }}
          >
            {chunk.map((pool) => (
              <Card
                key={pool.id}
                sx={{
                  maxWidth: 400,
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer", // Добавляем указатель
                }}
                onClick={() => router.push(`/pool/${pool.id}`)} // Переход по клику
              >
                <CardMedia>
                  <Image
                    src={pool.images[0]}
                    alt={pool.name}
                    width={400}
                    height={250}
                    style={{ objectFit: "cover" }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {pool.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Район: {pool.district}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Метро: {pool.metroStation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Цена: Индивидуально - {pool.priceRange.individual}₽,
                    Групповой - {pool.priceRange.group}₽
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    График: {pool.schedule}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 1, fontWeight: 500 }}
                  >
                    Рейтинг: {pool.rating} ★
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default PoolCards;
