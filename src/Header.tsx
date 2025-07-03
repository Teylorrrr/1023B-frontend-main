import { Link, useLocation } from 'react-router-dom'
import { routes } from './Routes'
import './header.css'

function Header() {
  const location = useLocation()

  const isComponente1 = location.pathname === '/' || location.pathname === '/componente1'

  return (
    <header>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=sports_basketball"
      />

      <div className="menu-bloco">
        <a href="#">CAMPEONATOS</a>
        <a href="#">EQUIPES</a>
        <a href="#">ATLETAS</a>
        <a href="#">ESTATÍSTICAS</a>
      </div>

      <a><span className="material-symbols-outlined">sports_basketball</span></a>

      <div className="menu-bloco">
        <a href="#">OUTROS CAMPEONATOS</a>
        <a href="#">NOTÍCIAS</a>
        <a href="#">FOTOS</a>
        <a href="#">LOJA</a>
      </div>

      <div className="menu-bloco">
        {routes.map(route => (
          <Link
            key={route.path}
            to={route.path}
            className={location.pathname === route.path ? 'active' : ''}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Header
