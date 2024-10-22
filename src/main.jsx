import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './modules/App.jsx'
import './css/style.css'

createRoot( document.getElementById('root') ).render(
    
    <React.StrictMode>
        <App />
    </React.StrictMode>

)
