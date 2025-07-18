import React from "react";
import "../styles/card.css";
const Card = () => {
  return (
    <section className="card-container">
      <div className="card-header">
        <h2>
          Keep it up,Homie!
          <br />
          Stay consistent
        </h2>
      </div>
      <div className="card-body">
        <div className="card-item card-weight"></div>
        <div className="card-item card-workout"></div>
        <div className="card-item card-protein"></div>
        <div className="card-bar card-weight-change"></div>
        <div className="card-bar card-tip"></div>
      </div>
    </section>
  );
};

export default Card;

// Card 背景
// #ffffff 或 #dff6ff（淺藍白）
// 文字
// #06283d 深藍字
// Icon / 數字
// #47b5ff 活潑水藍
// 補助線條
// #8cc0de
