import { Link } from 'react-router-dom'

const categoryColors = {
  default: 'bg-cozy-peach text-cozy-brown',
  gaming: 'bg-cozy-lavender text-cozy-darkbrown',
  tips: 'bg-cozy-mint text-cozy-brown',
  news: 'bg-cozy-rose text-cozy-brown',
}

function CategoryBadge({ category, className = '' }) {
  const colorClass = categoryColors[category.slug] || categoryColors.default

  return (
    <Link
      to={`/category/${category.id}`}
      className={`cozy-badge ${colorClass} hover:scale-105 transition-transform duration-300 ${className}`}
    >
      {category.name}
    </Link>
  )
}

export default CategoryBadge
