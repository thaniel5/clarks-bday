import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { HashRouter, Route, Routes } from 'react-router'
import Admin from './Admin.tsx'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <HashRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </HashRouter>
    </ConvexProvider>
  </StrictMode>,
)
