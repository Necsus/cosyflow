import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'

function NewsCard({ news }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="cozy-card overflow-hidden group">
      {news.image_url && (
        <div className="relative h-48 overflow-hidden bg-cozy-beige">
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-cozy-brown/60 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(news.created_at)}</span>
        </div>

        <h3 className="text-xl font-display font-semibold text-cozy-darkbrown mb-3 group-hover:text-cozy-coral transition-colors duration-300">
          {news.title}
        </h3>

        {news.excerpt && (
          <p className="text-cozy-brown/80 mb-4 line-clamp-3">
            {news.excerpt}
          </p>
        )}

        <Link
          to={`/news/${news.id}`}
          className="inline-flex items-center space-x-2 text-cozy-coral font-medium hover:space-x-3 transition-all duration-300"
        >
          <span>Lire la suite</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default NewsCard
