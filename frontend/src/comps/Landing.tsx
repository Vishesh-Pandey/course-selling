import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div>

    
        <Link to="/user-signup">
          <button>user</button>
        </Link>
        <Link to="/instructor-signup">
          <button>instructor</button>
        </Link> 

      </div>
  )
}

export default Landing