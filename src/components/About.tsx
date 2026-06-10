import React from "react";

export default function About() {
  return (
    <section id="about" className="aboutSection">
      <div className="aboutContainer">
        <h2 className="title">About Me</h2>
        
        <div className="aboutContent">
          <p className="aboutText">
            My name is <span className="highlight">Harsh.</span> I'm freelance thumbnail designer, been designing <span className="highlight">since 2021.</span>
          </p>
          
          <p className="aboutText">
            but, journey of learning about YouTube started, when I was in <span className="highlight">8th Standard</span> with a dream of becoming <span className="highlight">a Tech YouTuber ;)</span>
          </p>
          
          <p className="aboutText">
            I'm super grateful that I got a chance to work with some really amazing Creators, with <span className="highlight">Audience of 20M+ & still counting ...</span>
          </p>
        </div>
      </div>
    </section>
  );
}
