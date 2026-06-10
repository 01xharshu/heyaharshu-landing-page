import React from "react";

export default function About() {
  return (
    <section id="about" className="aboutSection">
      <div className="aboutContainer">
        <h2 className="title">About Me</h2>
        
        <div className="aboutContent">
          <p className="aboutText">
            My name is <span className="highlight">Harsh.</span> I am a freelance thumbnail designer, and I have been designing <span className="highlight">since 2021.</span>
          </p>
          
          <p className="aboutText">
            However, my journey of learning about YouTube started when I was in the <span className="highlight">8th Standard</span>, driven by a dream of becoming <span className="highlight">a Tech YouTuber ;)</span>
          </p>
          
          <p className="aboutText">
            I am incredibly grateful to have had the opportunity to work with some truly amazing creators, reaching a combined <span className="highlight">audience of over 20M+ and counting...</span>
          </p>
        </div>
      </div>
    </section>
  );
}
