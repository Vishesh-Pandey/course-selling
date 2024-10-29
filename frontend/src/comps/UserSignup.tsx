import { Link } from 'react-router-dom'
export default function  UserSignup() {
    function handleSignup(event: React.FormEvent<HTMLFormElement>) {
      console.log('inside handleSignup')
      event.preventDefault()
      fetch('http://localhost:8000/user/signup', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.currentTarget.name.value,
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
        }),
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
      <h1>User Signup</h1>
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
        <Link to="/instructor-signup">
          <button>instructor</button>
        </Link>
        <Link to="/">
          <button>Landing</button>
        </Link>
        <Link to="/instructor-login">
          <button>instructor Login</button>
        </Link>
        <Link to="/instructor-login">
          <button>instructo r Login</button>
        </Link>
      </div>
    </div>
  )
}