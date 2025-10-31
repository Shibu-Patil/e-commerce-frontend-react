import React from 'react'
import "./style/style.css"
import { RouterProvider } from 'react-router-dom'
import { routes } from './components/routes/routes'

const App = () => {
  return (
   <RouterProvider router={routes}></RouterProvider>
  )
}

export default App