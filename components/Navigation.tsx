import React from 'react'
import Link from 'next/link'

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 right-0 z-50 p-6">
      <div className="flex gap-4">
        <Link href="/about" className="btn-ghost text-sm">
          About
        </Link>
        <Link href="/forum" className="btn-ghost text-sm">
          Forum
        </Link>
      </div>
    </nav>
  )
}

export default Navigation