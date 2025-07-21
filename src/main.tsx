import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

////////////////////////////////////////////////////
///////////////// Páginas ////////////////////////////
import Campeonatos from './Pages/Campeonatos.tsx'
import Times from './Pages/Times.tsx'
import Fotos from './Pages/Fotos.tsx'
import Noticias from './Pages/Noticias.tsx'
import OutrosCampeonatos from './Pages/OutrosCampeonatos.tsx'
import Atletas from './Pages/Atletas.tsx'
import Estatisticas from './Pages/Estatisticas.tsx'
import Loja from './Pages/Loja.tsx'
/////////////////////////paginas-especificas///////////////////////////////
import PerfilAtleta from './Pages/PerfilAtleta.tsx'
import PerfilTime from './Pages/perfilTime.tsx'
import Admin from './Pages/Admin.tsx'
///////////////// Componentes comuns ////////////////////////////
import Header from './Comum/Header.tsx'
import Footer from './Comum/Footer.tsx'
///////////////// Estilos ////////////////////////////
import './Comum/Header.css'
import './Comum/Footer.css'
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

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
    element: <PaginaPadrao><Atletas /></PaginaPadrao>
  },
   {
    path: '/Admin23',
    element: <PaginaPadrao><Admin /></PaginaPadrao>
  },
  {
    path: '/campeonatos',
    element: <PaginaPadrao><Campeonatos /></PaginaPadrao>
  },
  {
    path: '/times',
    element: <PaginaPadrao><Times /></PaginaPadrao>
  },
  {
    path: '/times/:id',  
    element: <PaginaPadrao><PerfilTime /></PaginaPadrao>
  },
  {
    path: '/fotos',
    element: <PaginaPadrao><Fotos /></PaginaPadrao>
  },
  {
    path: '/noticias',
    element: <PaginaPadrao><Noticias /></PaginaPadrao>
  },
  {
    path: '/outroscampeonatos',
    element: <PaginaPadrao><OutrosCampeonatos /></PaginaPadrao>
  },
  {
    path: '/atletas',
    element: <PaginaPadrao><Atletas /></PaginaPadrao>
  },
  {
    path: '/atleta/:registroAtleta',
    element: <PaginaPadrao><PerfilAtleta /></PaginaPadrao>
  },
  {
    path: '/estatisticas',
    element: <PaginaPadrao><Estatisticas /></PaginaPadrao>
  },
  {
    path: '/loja',
    element: <PaginaPadrao><Loja /></PaginaPadrao>
  }
]);


///////////////// Renderização ////////////////////////////
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
