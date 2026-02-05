import './globals.css'

export const metadata = {
  title: 'Mi Círculo — Numerología y Zodiaco Chino',
  description: 'Descubre la numerología y zodiaco chino de tus contactos. Calcula compatibilidades.',
  manifest: '/manifest.json',
  themeColor: '#2d1f0e',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-[#faf5eb]">
        {children}
      </body>
    </html>
  )
}
