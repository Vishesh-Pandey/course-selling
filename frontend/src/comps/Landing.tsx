import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Are you?</p>

      <Link to="/user-signup">
        <button>user</button>
      </Link>
      <Link to="/instructor-signup">
        <button>instructor</button>
      </Link>
    </div>
  );
}

export default Landing;
