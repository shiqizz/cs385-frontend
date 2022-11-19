import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/user/login'
import Signup from './pages/user/signup'
import Home from './App'

const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter