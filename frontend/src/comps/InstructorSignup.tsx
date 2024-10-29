import { Link, useNavigate } from "react-router-dom";

type BodyData = {
  name: string;
  email: string;
  password: string;
};

export default function InstructorSignup() {
  const navigate = useNavigate();

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("inside handleSignup");

    try {
      const bodyData: BodyData = {
        name: event.currentTarget.name.value,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      };

      console.log("bodyData", bodyData);

      const response = await fetch("http://localhost:8000/instructor/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (response.status !== 200) {
        alert("Something went wrong");
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      navigate("/instructor-dashboard");
    } catch (error) {
      alert("Something went wrong ");
      console.log(error);
    }
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
  );
}
