import React from 'react'
import { Metadata } from 'next'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  title: 'Game Dashboard - Persistent Object',
  description: 'Access your Persistent Object game dashboard. Connect with Steam, view your profile, and manage game settings.',
  alternates: {
    canonical: 'https://po.gridbased.dev/dashboard',
  },
  openGraph: {
    title: 'Game Dashboard - Persistent Object',
    description: 'Your personal game dashboard for Persistent Object. Connect with Steam and manage your gaming experience.',
    url: 'https://po.gridbased.dev/dashboard',
    type: 'website',
  },
}

export default function Dashboard() {
  return <DashboardClient />
}