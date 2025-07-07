import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

///////////////// Páginas ////////////////////////////
import Campeonatos from './Pages/Campeonatos.tsx'
import Equipes from './Pages/Equipes.tsx'
import Fotos from './Pages/Fotos.tsx'
import Noticias from './Pages/Noticias.tsx'
import OutrosCampeonatos from './Pages/OutrosCampeonatos.tsx'
import Atletas from './Pages/Atletas.tsx'
import Estatisticas from './Pages/Estatisticas.tsx'
import Loja from './Pages/Loja.tsx'

///////////////// Componentes comuns ////////////////////////////
import Header from './Comum/Header.tsx'
import Footer from './Comum/Footer.tsx'
import Container from './Container.tsx' // Mantido apenas o import, como pedido

///////////////// Estilos ////////////////////////////
import './Comum/Header.css'
import './Comum/Footer.css'
import './Container.css' // Mantido apenas o import, como pedido

///////////////// Página inicial ////////////////////////////
const PaginaInicial = () => (
  <>
    <Header />
    <Campeonatos />
    <Footer />
  </>
)

///////////////// Modelo para outras páginas ////////////////////////////
const PaginaPadrao = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

///////////////// Roteador ////////////////////////////
const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaInicial />
  },
  {
    path: '/Equipes',
    element: <PaginaPadrao><Equipes /></PaginaPadrao>
  },
  {
    path: '/Fotos',
    element: <PaginaPadrao><Fotos /></PaginaPadrao>
  },
  {
    path: '/Noticias',
    element: <PaginaPadrao><Noticias /></PaginaPadrao>
  },
  {
    path: '/OutrosCampeonatos',
    element: <PaginaPadrao><OutrosCampeonatos /></PaginaPadrao>
  },
  {
    path: '/Atletas',
    element: <PaginaPadrao><Atletas /></PaginaPadrao>
  },
  {
    path: '/Estatisticas',
    element: <PaginaPadrao><Estatisticas /></PaginaPadrao>
  },
  {
    path: '/Loja',
    element: <PaginaPadrao><Loja /></PaginaPadrao>
  }
])

///////////////// Renderização ////////////////////////////
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
