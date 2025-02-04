
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Routers } from './Components/Routes/Router.jsx'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={Routers} >
        <App />
    </RouterProvider>
)
