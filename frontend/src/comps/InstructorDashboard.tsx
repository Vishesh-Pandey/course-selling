import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Course = {
  id: string;
  title: string;
  description: string;
};

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
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
        getYourCourses();
      })

      .catch((error) => {
        console.log("Error : ", error);
        console.error(error);
      });
  }

  const navigate = useNavigate();

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
          <div style={{ display: "flex" }}>
            {yourCourses.map((course: Course) => {
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
                  <img
                    width="100%"
                    src="https://img.freepik.com/free-vector/maths-online-course-economics-university-department-internet-classes-accounting-lessons-bookkeeping-mathematics-textbooks-digital-archive_335657-3441.jpg?semt=ais_hybrid"
                    alt=""
                  />
                  <h3>{course.id}</h3>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button
                    onClick={() => {
                      console.log("Trying to navigate");
                      navigate(`/instructor-course`, { state: course });
                    }}
                  >
                    Edit
                  </button>
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
                  <img
                    width="100%"
                    src="https://img.freepik.com/free-vector/maths-online-course-economics-university-department-internet-classes-accounting-lessons-bookkeeping-mathematics-textbooks-digital-archive_335657-3441.jpg?semt=ais_hybrid"
                    alt=""
                  />

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
