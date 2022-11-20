import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/user/login'
import Signup from './pages/user/signup'
import Home from  './pages/home/'
import App from './App'
import 'antd/dist/antd.min.css'

const BaseRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/app" element={<App/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
  </BrowserRouter>
)

export default BaseRouter