interface Review {
    author: string;
    comment: string;
    rating: number;
  }
  
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
    reviews: Review[];
  }
  
  export const allPools: Pool[] = [
    {
      id: "1",
      name: "Аквацентр Белый Кит",
      coordinates: [55.751244, 37.618423],
      district: "center",
      metroStation: "Белорусская",
      address: "ул. Пушкина, д. 10",
      ageGroups: ["0-1", "1-3", "3-5"],
      priceRange: { individual: 1500, group: 1000 },
      description: "Современный аквацентр с опытными инструкторами и уютной атмосферой.",
      images: ["/images/akademy.webp"],
      schedule: "08:00 - 22:00",
      rating: 4.8,
      reviews: [
        { author: "Мария Иванова", comment: "Прекрасное место!", rating: 5 },
        { author: "Олег Петров", comment: "Дети в восторге.", rating: 4 },
      ],
    },
    {
      id: "2",
      name: "Китенок Юг",
      coordinates: [55.741244, 37.608423],
      district: "south",
      metroStation: "Красная Пресня",
      address: "ул. Ленина, д. 15",
      ageGroups: ["1-3", "3-5"],
      priceRange: { individual: 1800, group: 1300 },
      description: "Идеально подходит для обучения плаванию малышей.",
      images: ["/images/kiteonok.webp"],
      schedule: "09:00 - 21:00",
      rating: 4.5,
      reviews: [
        { author: "Ирина Смирнова", comment: "Очень хорошие тренеры!", rating: 5 },
      ],
    },
    {
      id: "3",
      name: "Бассейн Лазурный",
      coordinates: [55.761244, 37.628423],
      district: "north",
      metroStation: "Киевская",
      address: "пр. Победы, д. 25",
      ageGroups: ["0-1", "1-3"],
      priceRange: { individual: 2000, group: 1500 },
      description: "Чистый бассейн с профессиональными инструкторами.",
      images: ["/images/akademy.webp"],
      schedule: "07:00 - 23:00",
      rating: 4.7,
      reviews: [
        { author: "Анна Крылова", comment: "Удобный график занятий.", rating: 5 },
      ],
    },
    {
      id: "4",
      name: "Аквапарк Веселый Дельфин",
      coordinates: [55.751244, 37.628423],
      district: "center",
      metroStation: "Тверская",
      address: "ул. Зеленая, д. 7",
      ageGroups: ["3-5", "5-8"],
      priceRange: { individual: 2500, group: 1800 },
      description: "Большой выбор групповых программ.",
      images: ["/images/kiteonok.webp"],
      schedule: "08:00 - 20:00",
      rating: 4.6,
      reviews: [
        { author: "Евгений Попов", comment: "Детям очень нравится!", rating: 4 },
      ],
    },
    {
      id: "5",
      name: "Малыш и вода",
      coordinates: [55.761244, 37.608423],
      district: "north",
      metroStation: "Охотный ряд",
      address: "ул. Морская, д. 3",
      ageGroups: ["0-1", "1-3"],
      priceRange: { individual: 1600, group: 1200 },
      description: "Отлично оборудованный бассейн для самых маленьких.",
      images: ["/images/akademy.webp"],
      schedule: "10:00 - 20:00",
      rating: 4.4,
      reviews: [
        { author: "Людмила Фомина", comment: "Ребенку очень нравится тренер!", rating: 5 },
      ],
    },
    {
        id: "6",
        name: "Аква-Пупс",
        coordinates: [55.832879, 37.662102],
        district: "north",
        metroStation: "Ростокино",
        address: "ул. Бажова, д. 8",
        ageGroups: ["0-1", "1-3"],
        priceRange: { individual: 1600, group: 1200 },
        description: "Отлично оборудованный бассейн для самых маленьких.",
        images: ["/images/akademy.webp"],
        schedule: "10:00 - 20:00",
        rating: 4.9,
        reviews: [
          { author: "Людмила Фомина", comment: "Ребенку очень нравится тренер!", rating: 5 },
        ],
      },
  ];
  