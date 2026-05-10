import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AnimalsPage from './pages/AnimalsPage'
import AnimalDetailPage from './pages/AnimalDetailPage'
import BudgetPage from './pages/BudgetPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import GalleryPage from './pages/GalleryPage'
import GetInvolvedPage from './pages/GetInvolvedPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route path="animals/:slug" element={<AnimalDetailPage />} />
          <Route path="budget" element={<BudgetPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="get-involved" element={<GetInvolvedPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
