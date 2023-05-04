/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEPATH
      : "",
  // images: {
  //   loader: 'akamai',
  //   path: process.env.NEXT_PUBLIC_URL,
  // },
  images: {
    loader: "default",
    domains: ["localhost", "backend.crfimmadagascar.org"],
    formats: ["image/avif", "image/webp"],
  },
  redirects() {
    return [
      process.env.MAINTENANCE_MODE === "1"
        ? {
            source: "/((?!maintenance).*)",
            destination: "/maintenance",
            permanent: false,
          }
        : null,
    ].filter(Boolean);
  },
};

module.exports = nextConfig;
