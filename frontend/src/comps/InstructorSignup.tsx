import { Link } from 'react-router-dom'
export default function InstructorSignup() {
    function handleSignup(event: React.FormEvent<HTMLFormElement>) {
      console.log('inside handleSignup')
      event.preventDefault()
      let bodyData = {
        name: event.currentTarget.name.value,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      }
      console.log('bodyData', bodyData)
      fetch('http://localhost:8000/instructor/signup', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  return (
    <div>
      <h1>Instructor Signup</h1>
      <form onSubmit={handleSignup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
      
      <div>
      <Link to="/user-signup">
          <button>user</button>
        </Link>
        <Link to="/">
          <button>Landing</button>
        </Link>
        <Link to="/instructor-login">
          <button>instructor Login</button>
        </Link>
        <Link to="/user-login">
          <button>user Login</button>
        </Link>
      </div>
    </div>
  )
}