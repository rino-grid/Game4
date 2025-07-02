'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navigation from '../../components/Navigation'
import SteamAuth from '../components/SteamAuth'
import dynamic from 'next/dynamic'

// Dynamically import the same shader used on the home page to ensure identical visuals
const ShaderCanvas = dynamic(() => import('../../components/ShaderCanvas'), { ssr: false })

interface SteamUser {
  steamid: string
  personaname: string
  avatar: string
  avatarfull: string
}

export default function DashboardClient() {
  const [user, setUser] = useState<SteamUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/steam/verify', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSuccess = (userData: SteamUser) => {
    setUser(userData)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/steam/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background shader */}
      <ShaderCanvas />
      <Navigation />
      
              <div className="container mx-auto px-4 pt-20 pb-8 relative z-10">
          <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">GAME DASHBOARD</h1>
          
          {!user ? (
            <div className="text-center">
              <div className="dashboard-card p-8 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Welcome to Persistent Object</h2>
                <p className="text-gray-400 mb-6">
                  Connect your Steam account to access the full game dashboard experience.
                </p>
                <SteamAuth onLoginSuccess={handleLoginSuccess} />
              </div>
              
              <div className="dashboard-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Coming Soon</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="dashboard-card-inner p-4 rounded">
                    <h4 className="font-bold mb-2">Game Progress</h4>
                    <p className="text-gray-400">Track your achievements and progress</p>
                  </div>
                  <div className="dashboard-card-inner p-4 rounded">
                    <h4 className="font-bold mb-2">Community</h4>
                    <p className="text-gray-400">Connect with other players</p>
                  </div>
                  <div className="dashboard-card-inner p-4 rounded">
                    <h4 className="font-bold mb-2">Updates</h4>
                    <p className="text-gray-400">Latest game news and patches</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className="dashboard-card p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Image 
                    src={user.avatarfull} 
                    alt={user.personaname}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full"
                    unoptimized
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{user.personaname}</h2>
                    <p className="text-gray-400">Steam ID: {user.steamid}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              </div>

              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="dashboard-card p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Game Status</h3>
                  <div className="text-center py-8">
                    <div className="text-orange-400 text-2xl mb-2">🚧</div>
                    <p className="text-gray-400">Game in Development</p>
                    <p className="text-sm text-gray-500 mt-2">Expected Release: 2025</p>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Community</h3>
                  <div className="text-center py-8">
                    <div className="text-blue-400 text-2xl mb-2">👥</div>
                    <p className="text-gray-400">Join the community</p>
                    <p className="text-sm text-gray-500 mt-2">Discord & Forums</p>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Settings</h3>
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-2xl mb-2">⚙️</div>
                    <p className="text-gray-400">Game Preferences</p>
                    <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
                  </div>
                </div>
              </div>

              {/* News/Updates Section */}
              <div className="dashboard-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Latest Updates</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-bold">Website Launch</h4>
                    <p className="text-gray-400 text-sm">The official Persistent Object website is now live with Steam integration!</p>
                    <p className="text-gray-500 text-xs mt-1">Today</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-bold">Development Progress</h4>
                    <p className="text-gray-400 text-sm">Unity 6 engine integration complete. Working on core gameplay mechanics.</p>
                    <p className="text-gray-500 text-xs mt-1">This week</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}