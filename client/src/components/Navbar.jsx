import { useState } from "react"
import { useAuth } from "../context/authcontext.jsx"
import { useNavigate ,Link } from "react-router-dom"
import { LogOut, NotebookPen } from "lucide-react"
 
function Navbar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)
 
  const name = user?.name || user?.email?.split("@")[0] || "there"
  const initial = name.charAt(0).toUpperCase()
 
  function logoutHandler() {
    setLoggingOut(true)
    logout()
    navigate("/login")
  }
 
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#3a31d8] via-[#4338e0] to-[#5b4ce6] shadow-lg shadow-indigo-900/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
            <NotebookPen className="h-4.5 w-4.5 text-white" strokeWidth={2.25} />
          </span>
          <h1 className="flex items-baseline gap-1.5 leading-none">
            <span className="text-2xl font-extrabold tracking-tight text-white">
             <Link to="/">COLLAB</Link>
            </span>
            <span className="text-xl font-light text-indigo-100">Notes</span>
          </h1>
        </div>
 
        {/* User area */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2.5 sm:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-sm font-semibold text-white ring-1 ring-white/30">
              {initial}
            </span>
            <p className="text-[15px] text-indigo-50">
              Hey, <span className="font-semibold text-white">{name}</span>
            </p>
          </div>
 
          <button
            onClick={logoutHandler}
            disabled={loggingOut}
            className="group flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/20 active:scale-95 disabled:opacity-60"
          >
            <LogOut className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            {loggingOut ? "Logging out…" : "Logout"}
          </button>
        </div>
      </div>
    </header>
  )
}
 
export default Navbar
 
