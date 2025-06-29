import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'pitchdeck App',
  description: 'Created by Athreya',
  generator: 'athreya.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
