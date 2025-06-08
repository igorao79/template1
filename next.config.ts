import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

// Создаем анализатор бандлов
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Базовый путь для GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/template1' : '',
  
  // Настройка ассетов для GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://igorao79.github.io/template1' : '',
  
  // Включаем оптимизацию изображений
  images: {
    formats: ['image/avif', 'image/webp'],
    // Включаем оптимизацию изображений в production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production', // Для GitHub Pages
  },
  
  // Оптимизация для production
  productionBrowserSourceMaps: false, // Отключаем source maps в production для уменьшения размера бандла
  
  // Настройки компрессии
  compress: true,
  
  // Оптимизация для статических ресурсов
  staticPageGenerationTimeout: 120, // Увеличиваем таймаут для генерации статических страниц
  
  // Настройка для экспорта статических файлов
  output: 'export',
  
  // Оптимизация для webpack
  webpack: (config, { dev, isServer }) => {
    // Оптимизация только для production сборки
    if (!dev) {
      // Оптимизация для CSS
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true,
        },
      };
    }

    return config;
  },
};

// Применяем анализатор бандлов
export default bundleAnalyzer(nextConfig);
