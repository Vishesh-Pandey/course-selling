import React from 'react'

function Dashboard() {
    function handleCourse(event: React.FormEvent<HTMLFormElement>) {
      console.log('inside handleSignup')
      event.preventDefault()
      fetch('http://localhost:8000/instructor/createCourse', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: event.currentTarget.email.value,
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
  <>
      <div>Dashboard</div>
      <div>
      <h1>Instructor Login</h1>
      <form onSubmit={handleCourse}>
        <label htmlFor="title">Title:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
      
      </div>
    </>
  )
}
export default Dashboard