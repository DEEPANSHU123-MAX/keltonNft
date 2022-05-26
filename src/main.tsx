import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './App'
// import FormComponent from './components/Form'
// import './App.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
    {/* <FormComponent /> */}
  </React.StrictMode>
)
