import { useState, useEffect } from 'react'
import { newsApi, categoryApi } from '../services/api'
import NewsCard from '../components/NewsCard'
import CategoryBadge from '../components/CategoryBadge'
import { Sparkles, TrendingUp } from 'lucide-react'

function Home() {
  const [news, setNews] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsResponse, categoriesResponse] = await Promise.all([
          newsApi.getAll(0, 12),
          categoryApi.getAll(),
        ])
        setNews(newsResponse.data.items)
        setCategories(categoriesResponse.data)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cozy-coral border-t-transparent"></div>
          <p className="mt-4 text-cozy-brown font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <div className="inline-flex items-center space-x-2 bg-cozy-peach/30 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-cozy-coral" />
          <span className="text-sm font-medium text-cozy-brown">
            Bienvenue dans l'univers cozy
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-cozy-darkbrown mb-4">
          CozyFlow
        </h1>
        <p className="text-xl text-cozy-brown/80 max-w-2xl mx-auto">
          Découvrez les dernières news et astuces pour profiter pleinement de vos moments cozy gaming
        </p>
      </section>

      {categories.length > 0 && (
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-cozy-coral" />
            <h2 className="text-2xl font-display font-semibold text-cozy-darkbrown">
              Catégories
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center space-x-3 mb-8">
          <Sparkles className="w-6 h-6 text-cozy-coral" />
          <h2 className="text-3xl font-display font-semibold text-cozy-darkbrown">
            Dernières actualités
          </h2>
        </div>

        {news.length === 0 ? (
          <div className="cozy-card p-12 text-center">
            <p className="text-cozy-brown/60 text-lg">
              Aucune actualité pour le moment. Revenez bientôt !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
