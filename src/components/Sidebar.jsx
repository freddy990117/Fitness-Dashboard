import React from "react";
import "../styles/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
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
        <FontAwesomeIcon icon={faDumbbell} className="header-awesome" />
        <h2>User1</h2>
      </div>
      <div className="sidebar-menu">
        <h3>
          <FontAwesomeIcon icon={faHouse} className="awesome-icon" />{" "}
          <a href="#">Home</a>
        </h3>
        <h3 className="disable">
          <FontAwesomeIcon icon={faChildReaching} className="awesome-icon" />{" "}
          <a href="#">
            Profile <br />
            {/* (Comming Soon...) */}
          </a>
        </h3>
        <h3 className="disable">
          <FontAwesomeIcon icon={faCalendarDays} className="awesome-icon" />
          <a href="#">
            {" "}
            Calendar <br />
            {/* (Comming Soon...) */}
          </a>
        </h3>
        <div className="line"></div>
        <h3 className="disable">
          <FontAwesomeIcon icon={faGear} className="awesome-icon" />
          <a href="#">
            {" "}
            Setting <br />
            {/* (Comming Soon...) */}
          </a>
        </h3>
        <h3>
          <FontAwesomeIcon icon={faRightFromBracket} className="awesome-icon" />
          <a href="#"> Layout</a>
        </h3>
      </div>
    </div>
  );
};

export default Sidebar;
