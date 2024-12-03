import React from "react";
import { useLocation } from "react-router-dom";

type Course = {
  id: string;
  title: string;
  description: string;
};

export const InstructorCourse = () => {
  const location = useLocation();
  const { id, title, description } = location.state || {};
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
        <input type="text" placeholder="Enter the title of the Lesson" />
        <input type="text" placeholder="Enter the description of the Lesson" />
        <input type="text" placeholder="Enter the video URL" />
        <button>Submit</button>
      </div>
    </div>
  );
};
