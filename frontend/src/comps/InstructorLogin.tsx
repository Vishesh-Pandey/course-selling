import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function InstructorSignup() {
  const navigate = useNavigate();
  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    console.log("inside handleSignup");
    event.preventDefault();
    fetch("http://localhost:8000/instructor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if ( data.message === "Invalid email or password"){
          alert("Invalid password")
        }
        else {
          console.log(data);
          localStorage.setItem("token", data.token);
          navigate("/instructor-dashboard");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div>
      <h1>Instructor Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>

      <div>
        <Link to="/instructor-signup">
          <button>instructor</button>
        </Link>

        <Link to="/user-signup">
          <button>user</button>
        </Link>
        <Link to="/">
          <button>Landing</button>
        </Link>

        <Link to="/user-login">
          <button>user Login</button>
        </Link>
      </div>
    </div>
  );
}
