import { useState } from 'react'
import { Share2, Copy, Check, MessageCircle, Facebook, Twitter } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CAMPAIGN } from '../lib/constants'

interface Props {
  title?:     string
  url?:       string
  compact?:   boolean
}

export default function ShareButtons({ title, url, compact = false }: Props) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const shareUrl   = url   ?? CAMPAIGN.siteUrl
  const shareTitle = title ?? t('site.tagline')

  const wa       = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} — ${shareUrl}`)}`
  const fb       = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  const tw       = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareTitle}`)}&url=${encodeURIComponent(shareUrl)}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const btnBase = compact
    ? 'p-2 rounded-full transition-colors'
    : 'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors'

  return (
    <div className={`flex items-center gap-2 flex-wrap ${compact ? '' : ''}`}>
      {!compact && (
        <span className="text-sm text-shelter-bark2 flex items-center gap-1">
          <Share2 className="w-4 h-4" /> {t('site.share')}:
        </span>
      )}

      <a href={wa} target="_blank" rel="noopener noreferrer"
         className={`${btnBase} bg-green-50 text-green-700 hover:bg-green-100`}
         aria-label="Share on WhatsApp">
        <MessageCircle className="w-4 h-4" />
        {!compact && 'WhatsApp'}
      </a>

      <a href={fb} target="_blank" rel="noopener noreferrer"
         className={`${btnBase} bg-blue-50 text-blue-700 hover:bg-blue-100`}
         aria-label="Share on Facebook">
        <Facebook className="w-4 h-4" />
        {!compact && 'Facebook'}
      </a>

      <a href={tw} target="_blank" rel="noopener noreferrer"
         className={`${btnBase} bg-sky-50 text-sky-700 hover:bg-sky-100`}
         aria-label="Share on Twitter">
        <Twitter className="w-4 h-4" />
        {!compact && 'Twitter'}
      </a>

      <button onClick={handleCopy}
              className={`${btnBase} bg-gray-50 text-gray-700 hover:bg-gray-100`}
              aria-label="Copy link">
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        {!compact && (copied ? 'Copied!' : 'Copy link')}
      </button>
    </div>
  )
}
