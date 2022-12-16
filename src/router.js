import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import App from './App'
import Test from './test'
import All from './pages/all'
import Detail from './pages/detail'
import Get from './pages/get'
import Give from './pages/give'
import Profile from './pages/profile'

const BaseRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App/>}>
        <Route path="" element={<All/>}></Route>
        <Route path='detail/:id' element={<Detail/>}></Route>
        <Route path="give" element={<Give/>}></Route>
        <Route path="get" element={<Get/>}></Route>
        <Route path="profile" element={<Profile/>}></Route>
      </Route>
      <Route path="test" element={<Test/>}></Route>
    </Routes>
  </BrowserRouter>
)

export default BaseRouter