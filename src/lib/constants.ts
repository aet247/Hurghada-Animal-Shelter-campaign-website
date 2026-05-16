export const CAMPAIGN = {
  goalAmount:  Number(import.meta.env.VITE_WHYDONATE_GOAL) || 5000,
  raisedAmount: 0,        // Update manually as donations come in
  donorCount:   0,        // Update manually
  animalsHelped: 12,      // Update manually
  donateUrl:   import.meta.env.VITE_WHYDONATE_URL  || 'https://whydonate.com',
  whatsapp:    import.meta.env.VITE_WHATSAPP_NUMBER  || '+201234567890',
  email:       import.meta.env.VITE_CAMPAIGN_EMAIL   || 'ahmed@hurghada-shelter.org',
  instagram:   import.meta.env.VITE_INSTAGRAM_URL    || 'https://instagram.com/hurghada_shelter',
  facebook:    import.meta.env.VITE_FACEBOOK_URL     || 'https://facebook.com/hurghada.shelter',
  siteUrl:     import.meta.env.VITE_SITE_URL         || 'https://hurghada-animal-shelter.netlify.app',
} as const

export const NAV_LINKS = [
  { key: 'home',        path: '/' },
  { key: 'about',       path: '/about' },
  { key: 'animals',     path: '/animals' },
  { key: 'budget',      path: '/budget' },
  { key: 'blog',        path: '/blog' },
  { key: 'gallery',     path: '/gallery' },
  { key: 'getInvolved', path: '/get-involved' },
  { key: 'contact',     path: '/contact' },
] as const
