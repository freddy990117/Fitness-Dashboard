import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <img src="/public/vite.svg" alt="user1_Photo" />
        <h2>user1</h2>
      </div>
      <div className="sidebar-menu">
        <h3>
          <a href="#">Home</a>
        </h3>
        <h3 className="disable">
          <a href="#">Profile (Under Development)</a>
        </h3>
        <h3 className="disable">
          <a href="#">Calendar (Under Development)</a>
        </h3>
        <h3 className="disable">
          <a href="#">Setting (Under Development)</a>
        </h3>
        <h3>
          <a href="#">Layout (Under Development)</a>
        </h3>
      </div>
    </div>
  );
};

export default Sidebar;
