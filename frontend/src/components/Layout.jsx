import { Link } from 'react-router-dom'
import { Coffee, Home, Sparkles } from 'lucide-react'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cozy-cream via-cozy-beige to-cozy-lavender">
      <nav className="bg-white/80 backdrop-blur-sm shadow-cozy sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-cozy-coral to-cozy-peach p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-cozy-brown">
                  CozyFlow
                </h1>
                <p className="text-xs text-cozy-brown/60">Cozy Gaming News</p>
              </div>
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="flex items-center space-x-2 text-cozy-brown hover:text-cozy-coral transition-colors duration-300"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Accueil</span>
              </Link>
              <button className="flex items-center space-x-2 text-cozy-brown hover:text-cozy-coral transition-colors duration-300">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Catégories</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-cozy-darkbrown text-cozy-cream mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Coffee className="w-5 h-5" />
              <span className="font-display font-semibold">CozyFlow</span>
            </div>
            <p className="text-sm text-cozy-cream/70">
              © 2026 CozyFlow. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
