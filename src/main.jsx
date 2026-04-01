import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CV from './CV.jsx'
import './index.css'
import { initMetaPixel } from './utils/pixel.js'

initMetaPixel();

const path = window.location.pathname;
const RootComponent = path === '/cv' ? CV : App;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RootComponent />
    </React.StrictMode>,
)
