import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { newsApi, categoryApi } from '../services/api'
import NewsCard from '../components/NewsCard'
import { ArrowLeft } from 'lucide-react'

function CategoryNews() {
  const { categoryId } = useParams()
  const [news, setNews] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsResponse, categoryResponse] = await Promise.all([
          newsApi.getByCategory(categoryId),
          categoryApi.getById(categoryId),
        ])
        setNews(newsResponse.data.items)
        setCategory(categoryResponse.data)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryId])

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
    <div>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-cozy-brown hover:text-cozy-coral transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Retour</span>
      </Link>

      {category && (
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cozy-darkbrown mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-cozy-brown/80">
              {category.description}
            </p>
          )}
        </div>
      )}

      {news.length === 0 ? (
        <div className="cozy-card p-12 text-center">
          <p className="text-cozy-brown/60 text-lg">
            Aucune actualité dans cette catégorie pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryNews
