import React, { useState } from "react";
import "../CSS/Navbar.css";
import { NavLink,Link } from "react-router-dom";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <Link to="/">
            <h1>
              <span>N</span>ft
              <span>M</span>arket
              <span>P</span>lace
            </h1>
          </Link>
        
        </div>
    {}
       <div className="Search">
          <form role="search" id="form">
            <input type="search"id="query" name="search" placeholder="Search items,collections,accounts"  aria-label="Search through site content" />
            <button>
              <svg viewBox="0 0 1024 1024"><path className="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
            </button>
          </form>
        </div>

        {/* 2nd menu part  */}
        <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
        }>
          <ul className="nav">
            <li>
              <NavLink to="/AllNFT" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Explore&nbsp;</NavLink>
            </li>
            <li>
              <NavLink to="/MyNFT" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>MyNFTs&nbsp;</NavLink>
            </li>
            <li>
              <NavLink to="/Create" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Create&nbsp;</NavLink>
            </li>
            
            <li>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile</NavLink>
            </li>
          </ul>
        </div>
      </nav>

    </>
  );
};

export default Navbar;