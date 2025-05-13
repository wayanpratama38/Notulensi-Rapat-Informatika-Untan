// tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // Jika menggunakan Next.js App Router
      "./src/**/*.{js,ts,jsx,tsx}", // Jika struktur Anda berbeda
      "./src/app/globals.css", 
    ],
    theme: {
      extend: {
        colors : {
          textColor: ({ theme }) => ({
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            tertiary: 'var(--color-text-tertiary)',
            disabled: 'var(--color-text-disabled)',
            'on-brand': 'var(--color-text-on-brand)',
            'on-dark-bg': 'var(--color-text-on-dark-bg)',
            link: 'var(--color-text-link)',
            placeholder: 'var(--color-text-placeholder)',
            error: 'var(--color-text-error)',
            success: 'var(--color-text-success)',
            warning: 'var(--color-text-warning)',
          }),
          backgroundColor: ({ theme }) => ({
            body: 'var(--color-background-body)',
            primary: 'var(--color-background-primary)',
            secondary: 'var(--color-background-secondary)',
            tertiary: 'var(--color-background-tertiary)',
            brand: 'var(--color-background-brand)',
            'brand-hover': 'var(--color-background-brand-hover)',
            'brand-subtle': 'var(--color-background-brand-subtle)',
            overlay: 'var(--color-background-overlay)',
          }),
          borderColor: ({ theme }) => ({
            DEFAULT: 'var(--color-border-default)', 
            strong: 'var(--color-border-strong)',
            subtle: 'var(--color-border-subtle)',
            brand: 'var(--color-border-brand)',
            focus: 'var(--color-border-focus)',
            
          }),
          ringColor: ({ theme }) => ({
            DEFAULT: 'var(--color-border-focus)',
            brand: 'var(--color-border-focus)',
          }),
          brand: {
            DEFAULT: 'var(--color-brand-500)', 
            25: 'var(--color-brand-25)',
            50: 'var(--color-brand-50)',
            100: 'var(--color-brand-100)',
            200: 'var(--color-brand-200)',
            300: 'var(--color-brand-300)',
            400: 'var(--color-brand-400)',
            500: 'var(--color-brand-500)',
            600: 'var(--color-brand-600)',
            700: 'var(--color-brand-700)',
            800: 'var(--color-brand-800)',
            900: 'var(--color-brand-900)',
            950: 'var(--color-brand-950)',
          },
          gray: { 
            DEFAULT: 'var(--color-gray-500)',
            25: 'var(--color-gray-25)',
            
            950: 'var(--color-gray-950)',
          },
          fontFamily: {
            outfit: ['var(--font-outfit)', 'sans-serif'], 
          },
          zIndex: {
            '1': 'var(--z-index-1)',
            '9': 'var(--z-index-9)',
            '99': 'var(--z-index-99)',
            '999': 'var(--z-index-999)',
            '9999': 'var(--z-index-9999)',
            '99999': 'var(--z-index-99999)',
            '999999': 'var(--z-index-999999)',
          },
        }
      },
    },
    plugins: [],
  }