import React from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
export const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="card">
        <Card />
        {/* 先預留給 CARD 後面帶入時比較方便 */}
      </div>
    </div>
  );
};
