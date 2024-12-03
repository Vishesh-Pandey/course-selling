import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import InstructorSignup from "./comps/InstructorSignup";
import UserSignup from "./comps/UserSignup";
import InstructorLogin from "./comps/InstructorLogin";
import UserLogin from "./comps/UserLogin";
import InstructorDashboard from "./comps/InstructorDashboard";
import UserDashboard from "./comps/UserDashboard";
import Landing from "./comps/Landing";
import { InstructorCourse } from "./comps/InstructorCourse";

function App() {
  const [] = useState(0);
  // /instructor and /user
  return (
    <>
      <Routes>
        <Route path="/instructor-signup" element={<InstructorSignup />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/instructor-login" element={<InstructorLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor-course" element={<InstructorCourse />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
