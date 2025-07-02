import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://persistent-object.gridbased.dev'),
  title: {
    default: 'Persistent Object - Game by Gridbased',
    template: '%s | Persistent Object'
  },
  description: 'Persistent Object is an innovative videogame developed with Unity 6. Join our community for development updates, discussions, and more. Coming 2025.',
  keywords: [
    'Persistent Object',
    'Unity 6',
    'game development',
    'indie game',
    'videogame',
    'gridbased',
    'gaming community',
    '2025 release',
    'WebGL',
    'shader effects'
  ],
  authors: [{ name: 'Gridbased', url: 'https://gridbased.dev' }],
  creator: 'Gridbased',
  publisher: 'Gridbased',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://persistent-object.gridbased.dev',
    title: 'Persistent Object - Innovative Game by Gridbased',
    description: 'Experience the future of gaming with Persistent Object. Built with Unity 6, featuring cutting-edge technology and immersive gameplay. Join our community today.',
    siteName: 'Persistent Object',
    images: [
      {
        url: '/assets/images/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Persistent Object - Game Preview',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Persistent Object - Innovative Game by Gridbased',
    description: 'Experience the future of gaming with Persistent Object. Built with Unity 6, coming 2025.',
    creator: '@_Gridbased',
    images: ['/assets/images/preview.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'gaming',
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark',
    'application-name': 'Persistent Object',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Persistent Object',
  description: 'An innovative videogame developed with Unity 6 by Gridbased',
  creator: {
    '@type': 'Organization',
    name: 'Gridbased',
    url: 'https://gridbased.dev',
    sameAs: [
      'https://x.com/_Gridbased',
      'https://discord.com',
      'https://youtube.com'
    ]
  },
  gameEngine: 'Unity 6',
  genre: 'Video Game',
  url: 'https://persistent-object.gridbased.dev',
  image: 'https://persistent-object.gridbased.dev/assets/images/preview.jpg',
  datePublished: '2025',
  operatingSystem: 'PC',
  applicationCategory: 'Game',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/PreOrder',
    url: 'https://store.steampowered.com'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to font domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Load BIZ UDMincho and Inter fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=BIZ+UDMincho:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://persistent-object.gridbased.dev" />
      </head>
      <body className={`min-h-screen bg-black text-white ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}