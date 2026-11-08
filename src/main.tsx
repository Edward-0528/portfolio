import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource/archivo-black/400.css'
import '@fontsource/caveat/700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
