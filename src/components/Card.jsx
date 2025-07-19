import React from "react";
import "../styles/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faEgg,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
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
        <div className="card-item card-weight">
          <FontAwesomeIcon icon={faWeightScale} />
          Weight
        </div>
        <div className="card-item card-workout">
          <FontAwesomeIcon icon={faDumbbell} />
          Workout
        </div>
        <div className="card-item card-protein">
          <FontAwesomeIcon icon={faEgg} />
          Protein
        </div>
        <div className="card-bar card-weight-change">
          <h1>Weight Change Line Chart</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quos
          nam eius, numquam dolore omnis odit necessitatibus exercitationem
          dolorem, optio dolores ipsum ad animi ullam mollitia dolor illo
          obcaecati. Nulla!
        </div>
        <div className="card-bar card-tip">
          <h1>Health Tip</h1>
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
