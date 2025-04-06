/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,

  images: {
    domains: ["storage.yandexcloud.net"],
  },
};

export default nextConfig;
