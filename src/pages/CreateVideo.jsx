import React, { useState } from "react";
import "./style.css";
const CreateVideo = () => {
  const [text, setText] = useState("");

  const generateVideo = () => {
    // Logic to generate video using the text input
    // ...
  };

  return (
    <div>
      <label htmlFor="inputbox"> enter a prompt to generate video</label>
      <input
        className="border-2 border-gray-500 inputbox"
        type="text"
        value={text}
        placeholder="Enter a prompt"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={generateVideo}>Generate Video</button>
    </div>
  );
};

export default CreateVideo;
