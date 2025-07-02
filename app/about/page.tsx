import React from 'react'
import { Metadata } from 'next'
import Navigation from '../../components/Navigation'

export const metadata: Metadata = {
  title: 'About - Persistent Object by Gridbased',
  description: 'Learn about the technology behind Persistent Object. Built with Next.js 14, TypeScript, and advanced web technologies for optimal performance and user experience.',
  alternates: {
    canonical: 'https://persistent-object.gridbased.dev/about',
  },
  openGraph: {
    title: 'About Persistent Object - Next.js Game Website',
    description: 'Discover the modern tech stack powering Persistent Object website. Built with Next.js 14, TypeScript, and cutting-edge web technologies.',
    url: 'https://persistent-object.gridbased.dev/about',
    type: 'website',
  },
}

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['BIZ_UDMincho']">
              About This Site
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built with modern web technologies for optimal performance and user experience
            </p>
          </header>

          <div className="grid gap-8 md:gap-12">
            <section className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Tech Stack</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Frontend</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Next.js 14 (App Router)</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• React 18 with Server Components</li>
                    <li>• WebGL shaders for visual effects</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Performance</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Static site generation (SSG)</li>
                    <li>• Optimized image loading</li>
                    <li>• Font optimization</li>
                    <li>• Code splitting</li>
                    <li>• SEO optimization</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">User Experience</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Responsive design</li>
                    <li>• Dark theme optimized</li>
                    <li>• Smooth animations</li>
                    <li>• WebGL background effects</li>
                    <li>• Fast page transitions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Architecture</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Component-based structure</li>
                    <li>• File-based routing</li>
                    <li>• TypeScript interfaces</li>
                    <li>• ESLint code quality</li>
                    <li>• Modern ES modules</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Scalability</h2>
              <p className="text-gray-300 mb-4">
                This upgraded foundation enables easy expansion with:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-black/30 p-4 rounded border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">User Features</h3>
                  <p className="text-sm text-gray-400">Authentication, profiles, preferences</p>
                </div>
                <div className="bg-black/30 p-4 rounded border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">Community</h3>
                  <p className="text-sm text-gray-400">Forums, chat, comments system</p>
                </div>
                <div className="bg-black/30 p-4 rounded border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">Content</h3>
                  <p className="text-sm text-gray-400">Blog, news, documentation</p>
                </div>
              </div>
            </section>

            <section className="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-lg border border-blue-800/50">
              <h2 className="text-2xl font-bold mb-4 text-white">Ready for the Future</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Built with scalability in mind, this site is ready to grow alongside Persistent Object.
                From simple landing page to full gaming community platform.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}