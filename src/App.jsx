import { useEffect, useState } from 'react'
import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import QuienesSomos from './components/sections/QuienesSomos'
import Historia from './components/sections/Historia'
import Menu from './components/sections/Menu'
import Resenas from './components/sections/Resenas'
import ComoLlegar from './components/sections/ComoLlegar'
import Footer from './components/sections/Footer'
import Admin from './components/sections/Admin'

function useRoute() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

function PublicSite() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuienesSomos />
      <Historia />
      <Menu />
      <Resenas />
      <ComoLlegar />
      <Footer />
    </main>
  )
}

export default function App() {
  const path = useRoute()
  if (path.startsWith('/admin')) return <Admin />
  return <PublicSite />
}