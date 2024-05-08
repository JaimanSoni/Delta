import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="724214365388-u3d85tg5m1hm6s9o7toi9362a3hpsms4.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
)
