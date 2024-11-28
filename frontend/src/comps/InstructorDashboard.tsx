import React, { useEffect, useState } from "react";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);
  const [yourCourses, setYourCourses] = useState([]);

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

  function getYourCourses() {
    fetch("http://localhost:8000/instructor/your-courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setYourCourses(data);
      });
  }

  useEffect(() => {
    getCourses();
    getYourCourses();
  }, []);

  function handleCourse(event: React.FormEvent<HTMLFormElement>) {
    console.log("inside handleSignup");
    console.log("Data is ", title, description);
    event.preventDefault();
    fetch("http://localhost:8000/instructor/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response is ", data);
        console.log(data);
      })

      .catch((error) => {
        console.log("Error : ", error);
        console.error(error);
      });
  }

  return (
    <>
      <div>Dashboard</div>
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

      <div>
        <div>
          <h1>Your Courses </h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {yourCourses.map((course) => {
              return (
                <div
                  style={{
                    border: "solid",
                    borderColor: "white",
                    padding: "10px",
                    width: "200px",
                    margin: "10px",
                  }}
                >
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button> Edit </button>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1>Explore all courses </h1>

          <div
            style={{
              display: "flex",

              flexWrap: "wrap",
            }}
          >
            {courses.map((course) => {
              return (
                <div
                  style={{
                    border: "solid",
                    borderColor: "black",
                    padding: "10px",
                    width: "200px",
                    margin: "10px",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderRadius: "5px",
                  }}
                >
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button>Open</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
