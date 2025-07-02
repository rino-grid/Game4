import React from 'react'
import { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Persistent Object - Revolutionary Game by Gridbased',
  description: 'Explore Persistent Object, an innovative videogame built with Unity 6. Experience cutting-edge graphics, immersive gameplay, and join our growing community. Coming 2025.',
  alternates: {
    canonical: 'https://po.gridbased.dev',
  },
  openGraph: {
    title: 'Persistent Object - Revolutionary Game by Gridbased',
    description: 'Explore Persistent Object, an innovative videogame built with Unity 6. Experience cutting-edge graphics, immersive gameplay, and join our growing community.',
    url: 'https://po.gridbased.dev',
    type: 'website',
  },
}

export default function HomePage() {
  return <HomePageClient />
}