import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import QuienesSomos from './components/sections/QuienesSomos'
import Historia from './components/sections/Historia'
import Menu from './components/sections/Menu'
import Resenas from './components/sections/Resenas'
import ComoLlegar from './components/sections/ComoLlegar'
import Footer from './components/sections/Footer'

function App() {
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

export default App