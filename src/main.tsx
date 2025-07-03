import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './Header.css'
import './Container.css'
import './Footer.css'
import Componente1 from './Componente1.tsx'
import Componente2 from './Componente2.tsx'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Container from './Container.tsx'

// Página inicial: Header, Componente1, Footer
const PaginaInicial = () => (
  <>
    <Header />
    <Componente1 />
    <Footer />
  </>
)

// Página 2: Container + Componente2
const PaginaContainer = () => (
  <Container>
    <Componente2 />
  </Container>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaInicial />
  },
  {
    path: '/componente2',
    element: <PaginaContainer />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
