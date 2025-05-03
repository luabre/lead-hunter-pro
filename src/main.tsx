
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { SidebarProvider } from './components/ui/sidebar'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </BrowserRouter>
);
