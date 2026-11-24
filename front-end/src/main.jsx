import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppMarion } from './marion/AppMarion.jsx'
import { AuthProvider } from './services/authProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppMarion />
    </AuthProvider>
  </StrictMode>,
)