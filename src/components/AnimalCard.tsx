import { Link } from 'react-router-dom'
import { PawPrint, Calendar } from 'lucide-react'
import type { Animal } from '../lib/content/loadAnimals'

interface Props {
  animal:    Animal
  showLink?: boolean
}

const PLACEHOLDER = 'data:image/svg+xml;base64,' + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#FDE68A"/>
  <g fill="#D97706" opacity="0.4">
    <ellipse cx="200" cy="200" rx="70" ry="55"/>
    <circle cx="130" cy="145" r="28"/>
    <circle cx="175" cy="115" r="28"/>
    <circle cx="225" cy="115" r="28"/>
    <circle cx="270" cy="145" r="28"/>
  </g>
</svg>`)

export default function AnimalCard({ animal, showLink = true }: Props) {
  const genderColor = animal.gender?.toLowerCase() === 'female' ? 'text-pink-500' : 'text-blue-500'

  const inner = (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100/60 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Photo */}
      <div className="relative h-52 bg-amber-50 overflow-hidden">
        <img
          src={animal.photo || PLACEHOLDER}
          alt={animal.name}
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
        />
        {animal.gender && (
          <span className={`absolute top-3 end-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm text-xs font-bold ${genderColor}`}>
            {animal.gender === 'Female' ? '♀' : '♂'}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-shelter-bark mb-1">{animal.name}</h3>

        <div className="flex items-center gap-4 text-xs text-shelter-bark2 mb-3">
          {animal.age && (
            <span className="flex items-center gap-1"><PawPrint className="w-3 h-3" /> {animal.age}</span>
          )}
          {animal.rescued && (
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {animal.rescued}</span>
          )}
        </div>

        {animal.needs && (
          <p className="text-sm text-shelter-bark2 line-clamp-2">{animal.needs}</p>
        )}
      </div>
    </div>
  )

  if (!showLink) return inner

  return <Link to={`/animals/${animal.slug}`}>{inner}</Link>
}
