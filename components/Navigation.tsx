import React from 'react'
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-white hover:text-gray-300 transition-colors">
          <span className="font-bold text-lg">PERSISTENT OBJECT</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Dashboard/Forum Icon */}
          <Link 
            href="/dashboard" 
            className="text-white hover:text-gray-300 transition-colors p-2 rounded-md hover:bg-white/10" 
            title="Game Dashboard"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}