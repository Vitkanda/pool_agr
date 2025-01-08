import { Pool } from "@/types/poolsTypes";

export const allPools: Pool[] = [
  {
    id: "1",
    name: "Академия",
    geometry: {
      coordinates: [55.66076, 37.54356],
    },
    properties: {
      CompanyMetaData: {
        name: "Академия",
        address: "ул. Профсоюзная, д. 76",
        Phones: [
          {
            type: "phone",
            formatted: "+7 (495) 500-63-64",
          },
        ],
        url: "https://academy.ru",
        Hours: {
          text: "Пн-Вс: 09:00–21:00",
        },
        Categories: [
          { name: "Бассейн для детей" },
          { name: "Занятия плаванием" },
        ],
        rating: 4.8,
        reviews: [
          { author: "Мария Иванова", comment: "Прекрасное место!", rating: 5 },
          { author: "Олег Петров", comment: "Дети в восторге.", rating: 4 },
        ],
      },
      description:
        "«Академия плавания» — это бассейн, который специализируется на занятиях плаванием для детей всех возрастов.",
    },
    services: ["Индивидуальные занятия", "Групповые занятия", "Аква-йога"],
    images: [
      "https://storage.yandexcloud.net/pools-photos/akademy/large-194.jpg",
      "https://storage.yandexcloud.net/pools-photos/akademy/large-196.jpg",
      "https://storage.yandexcloud.net/pools-photos/akademy/large-203.jpg",
      "https://storage.yandexcloud.net/pools-photos/akademy/large-207.jpg",
      "https://storage.yandexcloud.net/pools-photos/akademy/large-209.jpg",
      "https://storage.yandexcloud.net/pools-photos/akademy/large-213.jpg",
    ],
    priceRange: { individual: 1500, group: 1000, trial: 800 },
    metroStations: [
      {
        name: "Калужская",
        coordinates: [37.540829, 55.656232],
        distance: "400 м",
      },
      {
        name: "Новые Черемушки",
        coordinates: [37.554262, 55.670063],
        distance: "1.2 км",
      },
    ],
  },

  {
    id: "2",
    name: "Аквапупс",
    geometry: {
      coordinates: [55.889361, 37.614554],
    },
    properties: {
      CompanyMetaData: {
        name: "Аквапупс",
        address: "ул. Плещеева, 11",
        Phones: [
          {
            type: "phone",
            formatted: "+7 (495) 085-95-00",
          },
        ],
        url: "www.aquapups.ru/bibirevo",
        Hours: {
          text: "Пн-Вс: 09:00–21:00",
        },
        Categories: [
          { name: "Бассейн для малышей" },
          { name: "Занятия для детей" },
        ],
        rating: 5.0,
        reviews: [
          {
            author: "Наталья Б.",
            comment:
              "Дочка ходит в этот бассейн с января месяца, ей очень нравится. Там чисто, просторно, есть игровая комната большая, место ожидания, экраны, на которых можно смотреть как идёт занятие, и целых три разных бассейна. Девушки на ресепшн всегда помогут и подскажут. Тренера все разные, были у нескольких, каждый по своему чем то хорош, все умеют находить подход к ребёнку. Такие занятия очень важны, чтобы потом у ребёнка не было страха воды, с этой задачей хорошо справляются тренера)",
            rating: 5,
          },

          {
            author: "Евгения Люкшина",
            comment:
              "Отличный бассейн. Всегда чисто, уютно (Есть с чем сравнить). Вежливые и приятные администраторы. Ходим к тренеру Малышеву Илье! Это восторг! Его отношение к ребенку, индивидуальный подход просто восхищают! Дочка с удовольствием с ним занимается, доверяет, не истерит не во время занятия не после. Занятия проходят на одном дыхании) Илья дает еще много полезной информации. Так же хочется отметить тренера Хитрову Татьяну. Отлично ладит с младенцами, находит подход, дает хорошую нагрузку при этом не перегружая ребенка.",
            rating: 5,
          },
        ],
      },
      description: "Идеально подходит для обучения плаванию малышей.",
    },
    services: ["Индивидуальные занятия"],
    images: ["/images/kiteonok.webp"],
    priceRange: { individual: 1800, group: 1300, trial: 1000 },
    metroStations: [],
  },
  {
    id: "3",
    name: "Акваклуб Baby Boss",
    geometry: {
      coordinates: [55.744409, 37.639374],
    },
    properties: {
      CompanyMetaData: {
        name: "Акваклуб Baby Boss",
        address: "Космодамианская наб., 4/22кБ",
        Phones: [
          {
            type: "phone",
            formatted: "+7(901)468-42-45",
          },
        ],
        url: "https://babybossclub.ru",
        Hours: {
          text: "Пн-Вс: 09:00–21:00",
        },
        Categories: [{ name: "Грудничковый бассейн" }],
        rating: 5.0,
        reviews: [
          {
            author: "P",
            comment:
              "Нравится, ходим давно. Всегда чисто, приятное оформление, нравится игровой уголок, комната для переодевания и мытья. Две комнаты с приватным бассейном и множеством игрушек. Всем советую.Пожелания есть к ванной: установить держатель для душа и проверить на протекание, ухожу с мокрыми носками.Разовое занятие за 30 минут - 3 тысячи. Для многих это не мало, жалко, что угостить гостя напитком нельзя бесплатно. Если даже жалко кофе, всегда можно поставить кулер с чайными пакетиками- не дорого, а гостю приятна забота.Частая смена тренерского состава, к постоянному тренеру ни разу не попали на занятие.",
            rating: 5,
          },

          {
            author: "Гасан Мехтизаде",
            comment:
              "Ходим давно, всё нравится. Всегда чисто, приветливые администраторы, попали к тренеру Павлу, ребёнку нравится, вижу прогрессы. Рекомендую.",
            rating: 5,
          },
        ],
      },
      description: "Научный подход к грудничковому и детскому плаванию.",
    },
    services: ["Индивидуальные занятия", "Групповые занятия"],
    images: ["https://storage.yandexcloud.net/pools-photos/babyBoss/DSCF0180_1.jpg",
      "https://storage.yandexcloud.net/pools-photos/babyBoss/DSCF0197_1.jpg",
      "https://storage.yandexcloud.net/pools-photos/babyBoss/DSCF0247_1.jpg",
      "https://storage.yandexcloud.net/pools-photos/babyBoss/SOK_7610.jpg",
      "https://storage.yandexcloud.net/pools-photos/babyBoss/SOK_8089.jpg",
      "https://storage.yandexcloud.net/pools-photos/babyBoss/___11.jpg",
      "https://storage.yandexcloud.net/pools-photos/babyBoss/___9.jpg",
      

    ],
    priceRange: { individual: 3000, trial: 1500 },
    metroStations: [
      {
        name: "Новокузнецкая",
        coordinates: [55.7425889, 37.6303559],
        distance: "920 м",
      },
      {
        name: "Третьяковская",
        coordinates: [55.7403863, 37.6297282],
        distance: "1.25 км",
      },
    ],
  },
  {
    id: "4",
    name: "Аквапарк Веселый Дельфин",
    geometry: {
      coordinates: [37.628423, 55.751244],
    },
    properties: {
      CompanyMetaData: {
        name: "Аквапарк Веселый Дельфин",
        address: "ул. Зеленая, д. 7",
        Phones: [
          {
            type: "phone",
            formatted: "+7 321 654 98 76",
          },
        ],
        url: "https://dolphinpark.ru",
        Hours: {
          text: "Пн-Вс: 08:00–20:00",
        },
        Categories: [{ name: "Аквапарк" }, { name: "Развлекательный центр" }],
        rating: 4.6,
        reviews: [
          {
            author: "Евгений Попов",
            comment: "Детям очень нравится!",
            rating: 4,
          },
        ],
      },
      description: "Большой выбор групповых программ.",
    },
    services: ["Индивидуальные занятия", "Групповые занятия"],
    images: ["/images/kiteonok.webp"],
    priceRange: { individual: 2500, group: 1800 },
    metroStations: [],
  },
  {
    id: "5",
    name: "Малыш и вода",
    geometry: {
      coordinates: [37.608423, 55.761244],
    },
    properties: {
      CompanyMetaData: {
        name: "Малыш и вода",
        address: "ул. Морская, д. 3",
        Phones: [
          {
            type: "phone",
            formatted: "+7 654 321 87 65",
          },
        ],
        url: "https://malyshivoda.ru",
        Hours: {
          text: "Пн-Вс: 10:00–20:00",
        },
        Categories: [
          { name: "Детский бассейн" },
          { name: "Занятия с малышами" },
        ],
        rating: 4.4,
        reviews: [
          {
            author: "Людмила Фомина",
            comment: "Ребенку очень нравится тренер!",
            rating: 5,
          },
        ],
      },
      description: "Отлично оборудованный бассейн для самых маленьких.",
    },
    services: ["Индивидуальные занятия", "Групповые занятия"],
    images: ["/images/akademy.webp"],
    priceRange: { individual: 1600, trial: 1200 },
    metroStations: [],
  },
  {
    id: "6",
    name: "Аква-Пупс",
    geometry: {
      coordinates: [37.662102, 55.832879],
    },
    properties: {
      CompanyMetaData: {
        name: "Аква-Пупс",
        address: "ул. Бажова, д. 8",
        Phones: [
          {
            type: "phone",
            formatted: "+7 987 123 45 67",
          },
        ],
        url: "https://aquapups.ru",
        Hours: {
          text: "Пн-Вс: 10:00–20:00",
        },
        Categories: [
          { name: "Детский бассейн" },
          { name: "Гидро реабилитация" },
        ],
        rating: 4.9,
        reviews: [
          {
            author: "Людмила Фомина",
            comment: "Ребенку очень нравится тренер!",
            rating: 5,
          },
        ],
      },
      description: "Отлично оборудованный бассейн для самых маленьких.",
    },
    services: [
      "Индивидуальные занятия",
      "Групповые занятия",
      "Гидро реабилитация",
      "Занятия для взрослых",
    ],
    images: ["/images/akademy.webp"],
    priceRange: { individual: 1600, trial: 600 },
    metroStations: [],
  },
];
