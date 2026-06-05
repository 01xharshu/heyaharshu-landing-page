import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Progressive blur background at the top */}
      <div className="topBlur"></div>
      <nav className="navbarContainer">
        <div className="logoContainer">
          <span className="logoText">Harsh Mishra</span>
        </div>
        
        <div className="navLinks">
          <Link href="#about" className="navItem">About Us</Link>
          <Link href="#experiences" className="navItem">Experiences</Link>
          <Link href="#partners" className="navItem">Partners</Link>
        </div>
        
        <Link href="#contact" className="signUpBtn">Hire me</Link>
      </nav>
    </>
  );
}
