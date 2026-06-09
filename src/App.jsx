// App.jsx
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div
        className="min-h-screen flex flex-col"
        style={{ background: '#05060A' }}
      >
        <Navbar />

        <main className="flex-1">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}