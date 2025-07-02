import React from 'react'
import { Metadata } from 'next'
import Navigation from '../../components/Navigation'

export const metadata: Metadata = {
  title: 'Community Forum - Persistent Object',
  description: 'Join the Persistent Object community forum. Discuss game development, share feedback, connect with other players, and stay updated on the latest news and releases.',
  alternates: {
    canonical: 'https://persistent-object.gridbased.dev/forum',
  },
  openGraph: {
    title: 'Community Forum - Persistent Object',
    description: 'Connect with the Persistent Object gaming community. Share feedback, discuss features, and be part of the development journey.',
    url: 'https://persistent-object.gridbased.dev/forum',
    type: 'website',
  },
}

export default function Forum() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['BIZ_UDMincho']">
              Community Forum
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with fellow players, share feedback, and discuss all things Persistent Object
            </p>
          </header>

          <div className="grid gap-6 md:gap-8">
            <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-lg border border-blue-800/50">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Community Coming Soon</h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  We're building an amazing community platform where players can connect, share experiences, 
                  and help shape the future of Persistent Object. Stay tuned for launch updates!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="https://discord.gg/your-discord" 
                    className="btn-primary inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2">💬</span>
                    Join Discord
                  </a>
                  <a 
                    href="https://x.com/_Gridbased" 
                    className="btn-ghost inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2">🐦</span>
                    Follow on X
                  </a>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-green-400">📢 Announcements</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Stay updated with the latest development news, release dates, and important updates.
                </p>
                <div className="text-xs text-gray-500">
                  Coming Soon
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">🎮 General Discussion</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Share your thoughts, theories, and excitement about Persistent Object with the community.
                </p>
                <div className="text-xs text-gray-500">
                  Coming Soon
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">🛠️ Feedback & Suggestions</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Help shape the game by sharing your ideas, feedback, and feature requests.
                </p>
                <div className="text-xs text-gray-500">
                  Coming Soon
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">🎨 Creative Showcase</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Share fan art, screenshots, videos, and other creative content inspired by the game.
                </p>
                <div className="text-xs text-gray-500">
                  Coming Soon
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-red-400">🐛 Bug Reports</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Help improve the game by reporting bugs and technical issues you encounter.
                </p>
                <div className="text-xs text-gray-500">
                  Coming Soon
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-orange-400">💬 Off-Topic</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Connect with community members about gaming in general and other interests.
                </p>
                <div className="text-xs text-gray-500">
                  Coming Soon
                </div>
              </div>
            </div>

            <section className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-white">Community Guidelines</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-400">Be Respectful</h3>
                  <p className="text-gray-300 text-sm">
                    Treat all community members with respect and kindness. No harassment, discrimination, or toxic behavior.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Stay on Topic</h3>
                  <p className="text-gray-300 text-sm">
                    Keep discussions relevant to the forum section. Use appropriate channels for different types of content.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">No Spam</h3>
                  <p className="text-gray-300 text-sm">
                    Avoid posting repetitive content, excessive self-promotion, or irrelevant links.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-yellow-400">Constructive Feedback</h3>
                  <p className="text-gray-300 text-sm">
                    When providing feedback, be specific and constructive. Help make the game better for everyone.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center bg-gradient-to-r from-green-900/30 to-blue-900/30 p-8 rounded-lg border border-green-800/50">
              <h2 className="text-2xl font-bold mb-4 text-white">Ready to Get Involved?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                While our forum is in development, you can join our Discord community for real-time discussions 
                and connect with other excited players and the development team.
              </p>
              <a 
                href="https://discord.gg/your-discord" 
                className="btn-primary inline-flex items-center text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mr-2">🚀</span>
                Join the Community
              </a>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}