import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // 요청 URL 전체를 로깅
    },
  },
  /* config options here */
  images: {
    domains: ['shopping-phinf.pstatic.net'],
  },
};

export default nextConfig;
