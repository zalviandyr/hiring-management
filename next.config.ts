import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/regencies": ["./node_modules/idn-area-data/data/**/*.csv"],
  },
};

export default nextConfig;
