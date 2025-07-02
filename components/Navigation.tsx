'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const showTitle = pathname === '/dashboard'

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
        
        <div className="flex items-center gap-4">
          {/* Globe/Network Icon for Dashboard */}
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
        </div>
      </div>
    </nav>
  )
}