import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppMarion } from './marion/AppMarion.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppMarion />
  </StrictMode>,
)
