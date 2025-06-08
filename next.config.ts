import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

// Создаем анализатор бандлов
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
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
  },
  
  // Оптимизация для production
  productionBrowserSourceMaps: false, // Отключаем source maps в production для уменьшения размера бандла
  
  // Оптимизация для сборки
  swcMinify: true, // Использовать SWC для минификации
  
  // Настройки компрессии
  compress: true,
  
  // Оптимизация для статических ресурсов
  staticPageGenerationTimeout: 120, // Увеличиваем таймаут для генерации статических страниц
  
  // Оптимизация для кэширования
  headers: async () => {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|woff|woff2|ttf|eot)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
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
