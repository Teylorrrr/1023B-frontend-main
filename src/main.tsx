import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './Header.css'
import './Container.css'
import './Footer.css'
import Header from './Header.tsx'
import Container from './Container.tsx'
import Footer from './Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header/>
    <Container/>
    <Footer/>
  </StrictMode>,
)
