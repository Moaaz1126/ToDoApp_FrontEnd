import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import favicon from './favicon.ico'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To Do App',
  description: 'Generated by create next app',
  // icons: {
  //   icon:  "https://cdn-icons-png.flaticon.com/512/11087/11087877.png",
  //   apple: "https://cdn-icons-png.flaticon.com/512/11087/11087877.png"
  // }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
