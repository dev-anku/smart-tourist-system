import { Route, Routes } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/login"
import Home from "./pages/home"

function App() {


  return (
  <Routes>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Login />}/>
    <Route path="/home" element={<Home/>}/>
  </Routes>
  )
}

export default App
