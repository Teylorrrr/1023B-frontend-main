import { Link, useLocation } from 'react-router-dom'
import { route, route2} from '../Router'
import './header.css'

function Header() {
  const location = useLocation()

  const isCampeonatos = location.pathname === '/' || location.pathname === '/Campeonatos'

  return (
    <header>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=sports_basketball"/>
      <div className="menu-bloco">
        {route.map(route => (
          <Link
            key={route.path}
            to={route.path}
            className={location.pathname === route.path ? 'active' : ''}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <a><span className="material-symbols-outlined">sports_basketball</span></a>
         <div className="menu-bloco">
        {route2.map(route2 => (
          <Link
            key={route2.path}
            to={route2.path}
            className={location.pathname === route2.path ? 'active' : ''}
          >
            {route2.name}
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Header
