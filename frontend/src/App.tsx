import { useState } from 'react'
import './App.css'
import InstructorSignup from './comps/InstructorSignup'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [] = useState(0)
// /instructor and /user
  return (
    <>
    <Routes>
      <Route path='/instructor' element={<InstructorSignup />} />
    </Routes>
      <div>
        <Link to="/user">
          <button>user</button>
        </Link>
        <Link to="/instructor">
          <button>instructor</button>
        </Link> 
        
      </div>
    
    </>
  )
}

export default App
