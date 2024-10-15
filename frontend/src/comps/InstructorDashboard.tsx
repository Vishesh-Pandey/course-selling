import React, { useEffect, useState } from "react";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);

  function getCourses() {
    // we need to fetch courses of the specific instructor
    fetch("http://localhost:8000/instructor/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getCourses();
  }, []);

  function handleCourse(event: React.FormEvent<HTMLFormElement>) {
    console.log("inside handleSignup");
    event.preventDefault();
    fetch("http://localhost:8000/instructor/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instructorId: "cm2anejub0000msa29ibhahtj",
        title: title,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div>Dashboard</div>
      <h1>Your Courses</h1>
      {courses.map((course) => {
        return (
          <div style={{ border: "solid", borderColor: "white" }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        );
      })}

      <div>
        <h1>Create Course </h1>
        <form onSubmit={handleCourse}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="password">Description:</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id=""
          ></textarea>
          <br />
          <button type="submit">Create Course</button>
        </form>
      </div>
    </>
  );
}
export default Dashboard;
