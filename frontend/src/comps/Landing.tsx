import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <Link to="/user-signup">
          <button>User Signup</button>
        </Link>
        <Link to="/instructor-signup">
          <button>Instructor Signup</button>
        </Link>
        <Link to="/instructor-login">
          <button>instructor Login</button>
        </Link>
        <Link to="/user-login">
          <button>user Login</button>
        </Link>
      </div>
      <div>This is a course selling website</div>
    </div>
  );
}

export default Landing;
