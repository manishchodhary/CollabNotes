import { useAuth } from "../context/authcontext.jsx";
import {Navigate} from "react-router-dom"



function ProtectedRoute({children}) {
    const {user,loading} = useAuth();
    if(loading) return <div className="text-center mt-20 text-grey-500">Loading...</div>
    return user ? children : <Navigate to ={'/login'} />
}

export default ProtectedRoute
