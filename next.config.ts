import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/processes',
                permanent: true
            },
        ]
    },
  /* config options here */
};

export default nextConfig;
