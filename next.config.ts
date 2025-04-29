// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/producto',
        destination: 'http://localhost:4000/producto', // ← Puerto real del backend
      },
    ]
  },
}

module.exports = {
  images: {
    domains: ['tudominio.com', 'res.cloudinary.com'], // Añade tus dominios
  },
};
