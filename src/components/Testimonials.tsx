import React from "react";

const testimonials = [
  {
    name: "Prakhar ke Pravachan",
    image: "https://yt3.googleusercontent.com/hwSmxY9VTk182w_IaiZb_tanNCFIaZXlePToJum6d1_ajGChKUIynvhXBwyo4Au23-2NfNLObw=s160-c-k-c0x00ffffff-no-rj",
    text: "Harsh is an incredible designer. The way he understands the essence of the brand and translates it into visuals is top-notch."
  },
  {
    name: "Aaditya Iyengar",
    image: "https://yt3.googleusercontent.com/VjEDkL6UnO0qtUgBJ7gq5HKT5opMqryDuKAfmVH-oSh8NNM53_0qmh7bS06j4rFHDYkvO-Flhw=s160-c-k-c0x00ffffff-no-rj",
    text: "Working with Harsh has been a game-changer for my channel. His designs are not just aesthetically pleasing but also highly converting."
  },
  {
    name: "Justin Moore",
    image: "https://yt3.ggpht.com/ZKSXqSoul2XOMXmQ74qkdzqViOWpLNAWJMAz17vX1gk5cuoRN2HSUXXYLYEZJG9KUHfTjnKF=s176-c-k-c0x00ffffff-no-rj-mo",
    text: "A true professional. The attention to detail and creativity he brings to every project is unmatched. Highly recommend!"
  }
];

export default function Testimonials() {
  return (
    <section className="testimonialsSection" style={{ padding: "8rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", background: "var(--background)" }}>
      <h2 className="title" style={{ fontSize: "4rem", fontWeight: 700, marginBottom: "4rem", color: "#fff", letterSpacing: "-0.03em" }}>What They Say</h2>
      
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", maxWidth: "1200px" }}>
        {testimonials.map((testimonial, i) => (
          <div key={i} style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
            borderRadius: "20px",
            padding: "2rem",
            maxWidth: "350px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem", lineHeight: 1.6, fontStyle: "italic", flexGrow: 1 }}>
              &quot;{testimonial.text}&quot;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto" }}>
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
              />
              <span style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}>{testimonial.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
