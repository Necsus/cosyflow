import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { newsApi } from '../services/api'
import { Calendar, ArrowLeft } from 'lucide-react'
import CategoryBadge from '../components/CategoryBadge'

function NewsDetail() {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApi.getById(id)
        setNews(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement de l\'actualité:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

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

  if (!news) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-display font-semibold text-cozy-darkbrown mb-4">
          Actualité introuvable
        </h2>
        <Link to="/" className="cozy-button-primary">
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-cozy-brown hover:text-cozy-coral transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Retour</span>
      </Link>

      <article className="cozy-card overflow-hidden">
        {news.image_url && (
          <div className="relative h-96 bg-cozy-beige">
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          {news.category && (
            <CategoryBadge category={news.category} className="mb-4" />
          )}

          <h1 className="text-4xl md:text-5xl font-display font-bold text-cozy-darkbrown mb-6">
            {news.title}
          </h1>

          <div className="flex items-center space-x-2 text-cozy-brown/60 mb-8">
            <Calendar className="w-5 h-5" />
            <span>{formatDate(news.created_at)}</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-cozy-brown leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default NewsDetail
