import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

type Course = {
  id: string;
  title: string;
  description: string;
};

export const InstructorCourse = () => {
  const location = useLocation();

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");

  const [existingLessons, setExistingLessons] = useState([]);

  const { id, title, description } = location.state || {};

  const addNewLessonToCourse = async () => {
    axios.post("http://localhost:8000/instructor/createLesson", {
      courseId: id,
      title: id,
      description: id,
      content: id,
    });
  };

  const getExistingLessons = async () => {
    const response = await axios.get(
      `http://localhost:8000/instructor/lessons?id=${id}`
    );
    setExistingLessons(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getExistingLessons();
  }, []);

  return (
    <div>
      <h1>{id}</h1>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
        <input
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          type="text"
          placeholder="Enter the title of the Lesson"
        />
        <input
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
          type="text"
          placeholder="Enter the description of the Lesson"
        />
        <input
          value={lessonVideoUrl}
          onChange={(e) => setLessonVideoUrl(e.target.value)}
          type="text"
          placeholder="Enter the video URL"
        />
        <button onClick={addNewLessonToCourse}>Submit</button>
      </div>
      <h1>Lessons of this course</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {existingLessons.map((course: Course) => {
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
              <p>{course.id}</p>
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
  );
};
