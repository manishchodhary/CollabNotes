import { AuthProvider } from "./context/authcontext.jsx"
import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Register from "./pages/Register.jsx"


function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Navigate to="/dashboard"/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/register" element={<Register/>} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
