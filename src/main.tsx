import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './main.css'
import Header from './Header.tsx'
import Container from './Container.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header/>
    <Container/>
  </StrictMode>,
)
