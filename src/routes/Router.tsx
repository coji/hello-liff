import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Top = lazy(() => import('../pages/Top'))
const Error = lazy(() => import('../pages/Error'))

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
