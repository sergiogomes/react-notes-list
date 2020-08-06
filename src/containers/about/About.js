import React from "react";

import notesImg from "../../assets/images/notes.png";

const About = () => (
  <div className="about">
    <h1>Note.js</h1>
    <small>Version 1.0.0</small>
    <p>
      With Note.js you can list all your notes and prioritize them. All notes
      will stay saved on the device you created them.
    </p>
    <img src={notesImg} alt="Notes Img" className="img" />
  </div>
);

export default About;
