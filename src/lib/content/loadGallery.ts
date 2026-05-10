import galleryData from '../../../content/gallery.json'

export interface GalleryItem {
  type:        'photo' | 'video'
  title:       string
  file:        string
  videoUrl?:   string
  description: string
}

export function loadGallery(): GalleryItem[] {
  return (galleryData.items as GalleryItem[]) ?? []
}
