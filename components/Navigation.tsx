'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === ''
  const isDashboard = pathname === '/dashboard' || pathname === '/dashboard/'
  const showTitle = isDashboard

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {showTitle ? (
          <Link href="/" className="text-white hover:text-gray-300 transition-colors">
            <span className="font-bold text-lg">PERSISTENT OBJECT</span>
          </Link>
        ) : (
          <div></div>
        )}
        
        <div className="flex items-center gap-2">
          {/* Home Icon - only show when NOT on home page */}
          {!isHome && (
            <Link 
              href="/" 
              className="text-white hover:text-gray-300 transition-colors p-2 rounded-md hover:bg-white/10" 
              title="Home"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </Link>
          )}
          
          {/* Globe/Network Icon for Dashboard - only show when NOT on dashboard */}
          {!isDashboard && (
            <Link 
              href="/dashboard" 
              className="text-white hover:text-gray-300 transition-colors p-2 rounded-md hover:bg-white/10" 
              title="Game Dashboard"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12h20" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}