import Navbar from "../components/Navbar.jsx"
import NoteCard from "../components/Notecard.jsx"

function Dashboard() {
  return (
    <div className="bg-[#010104] min-h-screen">
      <Navbar/>
      <NoteCard/>
    </div>
  )
}

export default Dashboard
