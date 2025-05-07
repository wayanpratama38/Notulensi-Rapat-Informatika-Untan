// tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // Jika menggunakan Next.js App Router
      "./src/**/*.{js,ts,jsx,tsx}", // Jika struktur Anda berbeda
      "/src/app/global.css", // Tambahkan ini jika Anda benar-benar ingin @apply di global.css
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }