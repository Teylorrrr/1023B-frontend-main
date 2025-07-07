import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

////////////////////////////////////////////////////
///////////////// Páginas ////////////////////////////
import Campeonatos from './Pages/Campeonatos.tsx'
import Equipes from './Pages/Equipes.tsx'
import Fotos from './Pages/Fotos.tsx'
import Noticias from './Pages/Noticias.tsx'
import OutrosCampeonatos from './Pages/OutrosCampeonatos.tsx'
import Atletas from './Pages/Atletas.tsx'
import Estatisticas from './Pages/Estatisticas.tsx'
import Loja from './Pages/Loja.tsx'
///////////////// Páginas estilo /////////////////////////////
/*
import './Pages/Campeonatos.css'
import './Pages/Equipes.css'
import './Pages/Fotos.css'
import './Pages/Noticias.css'
import './Pages/OutrosCampeonatos.css'*/
import './Pages/Atletas.css'
/*
import './Pages/Estatisticas.css'
import './Pages/Loja.css'*/
////////////////////////////////////////////////////////
///////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////////// Componentes comuns ////////////////////////////
import Header from './Comum/Header.tsx'
import Footer from './Comum/Footer.tsx'
///////////////// Estilos ////////////////////////////
import './Comum/Header.css'
import './Comum/Footer.css'
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


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
  element: <PaginaPadrao><Campeonatos /></PaginaPadrao>
},
{
  path: '/Campeonatos',
  element: <PaginaPadrao><Campeonatos /></PaginaPadrao>
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
