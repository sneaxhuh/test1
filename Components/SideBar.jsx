import React, { useState } from "react";

const SideBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add functionality to handle search here
    console.log("Search for:", searchTerm);
  };

  return (
    <aside className="slide-bar" aria-label="Sidebar Navigation">
      <div className="close-mobile-menu">
        <a href="/" className="tx-close" aria-label="Close menu"></a>
      </div>
      <nav className="side-mobile-menu">
        <a href="/" className="header_logo mb-30">
          <img src="assets/img/logo/logo.svg" alt="Logo" />
        </a>
        <div className="header-mobile-search">
          <form onSubmit={handleSearchSubmit} role="search">
            <input
              type="text"
              placeholder="Search Keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search Keywords"
            />
            <button type="submit" aria-label="Submit Search">
              <i className="ti-search" />
            </button>
          </form>
        </div>
        <ul id="mobile-menu-active">
          <li>
            <a href="#about" className="scrollspy-btn">About</a>
          </li>
          <li>
            <a href="#roadmap" className="scrollspy-btn">RoadMap</a>
          </li>
          <li>
            <a href="#team" className="scrollspy-btn">Team</a>
          </li>
          <li>
            <a href="#blog" className="">Blog</a> {/* Provide actual link */}
          </li>
          <li>
            <a href="#contact" className="">Get In Touch</a> {/* Provide actual link */}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
