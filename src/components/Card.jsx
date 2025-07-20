import React from "react";
import "../styles/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "./Chart";
import {
  faDumbbell,
  faEgg,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
const Card = () => {
  // User info (之後會依照 User 輸入而變更)
  const proteinPercent = 60;
  const weight = 80;
  const workoutCount = 0;
  // HealthTips
  const healthTips = [
    "每天至少喝足 2000c.c 水，維持身體代謝與健康。",
    "每週至少休息一天，避免訓練過度導致疲勞累積。",
    "訓練後 30 分鐘內攝取蛋白質，有助肌肉修復。",
    "充足睡眠 7 至 8 小時，有助身體與肌肉成長。",
    "飲食均衡攝取蛋白質、碳水與健康脂肪最穩健。",
    "每週進行重量訓練 3-4 次，增進肌力與代謝。",
    "搭配有氧與重訓，能更有效提升身體機能。",
    "良好姿勢與正確動作能降低運動受傷風險。",
    "養成記錄飲食與運動習慣，幫助長期追蹤。",
    "不要忽略熱身與收操，提升訓練表現與安全。",
    "規律運動比短期衝刺更容易達成理想體態。",
    "減脂不等於不吃油脂，攝取健康脂肪很重要。",
    "保持水分平衡，適時補充電解質與礦物質。",
    "深蹲、硬舉等多關節訓練能提升整體表現。",
    "增肌期需足夠熱量支持，避免攝取不足停滯。",
    "合理碳水攝取有助恢復訓練所消耗的能量。",
    "高蛋白飲食搭配蔬菜水果，幫助消化與吸收。",
    "控制體重不急躁，穩健調整才更容易維持。",
    "適量拉伸提升柔軟度，減少日常不適與僵硬。",
    "避免熬夜有助內分泌穩定，提升訓練效果。",
  ];
  const randomTips = healthTips[Math.floor(Math.random() * healthTips.length)];

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
          <div className="card-item-header">
            <FontAwesomeIcon className="icon" icon={faWeightScale} />
            <h1>Weight</h1>
          </div>
          <div className="card-item-body">
            <h1>{weight}kg</h1>
          </div>
        </div>
        <div className="card-item card-workout">
          <div className="card-item-header">
            <FontAwesomeIcon className="icon workout" icon={faDumbbell} />
            <h1>Workout</h1>
          </div>
          <div className="card-item-body">
            <h1>{workoutCount} times</h1>
          </div>
        </div>
        <div className="card-item card-protein">
          <div className="card-item-header">
            <FontAwesomeIcon className="icon" icon={faEgg} />
            <h1>Protein</h1>
          </div>
          <div className="card-item-body">
            {/*  依照 User 的輸入而改變 */}
            <h1>{proteinPercent}%</h1>
            <div className="protein-bar">
              <div
                className="protein-bar-fill"
                // 依照 User 的輸入而改變
                style={{ width: `${proteinPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="card-bar card-weight-change">
          <h1>Weight Trend Line </h1>
          <Chart />
        </div>
        <div className="card-bar card-tip">
          <h1>Health Tip</h1>
          <h2>{randomTips}</h2>
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
 