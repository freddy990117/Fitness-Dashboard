import React from "react";
import "../styles/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChildReaching,
  faCalendarDays,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <img src="/vite.svg" alt="user1_Photo" />
        <h2>user1</h2>
      </div>
      <div className="sidebar-menu">
        <h3>
          <FontAwesomeIcon icon={faHouse} /> <a href="#">Home</a>
        </h3>
        <h3 className="disable">
          <FontAwesomeIcon icon={faChildReaching} />{" "}
          <a href="#">Profile (Under Development)</a>
        </h3>
        <h3 className="disable">
          <FontAwesomeIcon icon={faCalendarDays} />
          <a href="#">Calendar (Under Development)</a>
        </h3>
        <h3 className="disable">
          <FontAwesomeIcon icon={faGear} />
          <a href="#">Setting (Under Development)</a>
        </h3>
        <h3>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <a href="#">Layout</a>
        </h3>
      </div>
    </div>
  );
};

export default Sidebar;
