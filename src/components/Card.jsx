import React from "react";
import "../styles/card.css";
const Card = () => {
  return (
    <section className="card-container">
      <div className="card-header">
        <h1>
          Keep it up, Homie！
          <br />
          Stay Hard！
        </h1>
      </div>
      <div className="card-body">
        <div className="card-item card-weight">Weight</div>
        <div className="card-item card-workout">Workout</div>
        <div className="card-item card-protein">Protein</div>
        <div className="card-bar card-weight-change">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quos
          nam eius, numquam dolore omnis odit necessitatibus exercitationem
          dolorem, optio dolores ipsum ad animi ullam mollitia dolor illo
          obcaecati. Nulla!
        </div>
        <div className="card-bar card-tip">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
          placeat necessitatibus consequuntur quisquam neque dolorum explicabo
          distinctio ab numquam a eos dignissimos quo atque tempora libero ut,
          cum quam rerum.
        </div>
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
