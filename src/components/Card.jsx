import { React, useState, useEffect } from "react";
import "../styles/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "./Chart";
import {
  faDumbbell,
  faEgg,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
// import FireStore
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const Card = () => {
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

  // FireStore Database
  // 先將 Database 的資料預設為 0，防止錯誤訊息跳出 (null)
  const [fitnessData, setFitnessData] = useState({
    weight: 0,
    proteinPercent: 0,
    workoutCount: 0,
  });
  // 初始 User 體重、訓練次數與蛋白質的初始值（後續透過 useEffect doc 取得即時的資料,並在 button 設定 onClick，即時變更畫面顯示）
  const [weight, setWeight] = useState(0);
  const [workout, setWorkout] = useState(0);
  const [protein, setProtein] = useState(0);

  // 將最新的 weight data 即時更新到 fireStore 上
  const updateWeight = async (newWeight) => {
    await updateDoc(doc(db, "users", "user1"), { weight: newWeight });
  };

  // 將最新的 workoutCount data 即時更新到 fireStore 上
  const updateWorkoutTime = async (newWorkoutTime) => {
    await updateDoc(doc(db, "users", "user1"), {
      workoutCount: newWorkoutTime,
    });
  };

  // 將最新的 proteinPercent data 即時更新到 fireStore 上
  const updateProtein = async (newProtein) => {
    await updateDoc(doc(db, "users", "user1"), { proteinPercent: newProtein });
  };
  // 在畫面 Render 後執行，使用 onSnapshot 監聽 Firestore 的變化，自動推送資料至 state，因此無需指定 dependency
  useEffect(() => {
    // onSnapshot 是官方提供的函式，用於「即時」監聽資料庫的變化，第一個參數是「指定要使用哪一筆資料」
    const unsub = onSnapshot(
      // 取得的資料是 users (Collection) 內 user1 (Document) 的 Database
      doc(db, "users", "user1"),
      // onSnapshot 第二個參數是一個 callBack fn
      (doc) => {
        // exists 檢查資料庫中是否有這筆資料
        if (doc.exists()) {
          // data() 以物件的方式返回資料 {..,..,..}
          const data = doc.data();
          // 設定值給各項參數
          setFitnessData(data);
          setWeight(data.weight);
          setWorkout(data.workoutCount);
          setProtein(data.protein);
        }
      }
    );
    return () => unsub();
  }, []);

  return (
    <section className="card-container">
      <div className="card-header">
        <h1>Keep it up, Homie！ Stay Hard！</h1>
      </div>
      <div className="card-body">
        <div className="card-item card-weight">
          <div className="card-item-header">
            <FontAwesomeIcon className="icon" icon={faWeightScale} />
            <h1>Weight</h1>
          </div>
          <div className="card-item-body">
            <h1>{fitnessData.weight}kg</h1>
          </div>
          <div className="card-crud-item">
            <div className="card-crud-btn minus">
              <button
                onClick={() => {
                  const updated = weight - 0.5;
                  setWeight(updated);
                  updateWeight(updated);
                }}
              >
                -
              </button>
            </div>
            <div className="card-crud-btn plus">
              <button
                onClick={() => {
                  const updated = weight + 0.5;
                  setWeight(updated);
                  updateWeight(updated);
                }}
              >
                +
              </button>
            </div>
            <div className="card-crud-btn save">
              <button>Save</button>
            </div>
            <div className="card-crud-btn cancel">
              <button>Cancel</button>
            </div>
          </div>
        </div>
        <div className="card-item card-workout">
          <div className="card-item-header">
            <FontAwesomeIcon className="icon workout" icon={faDumbbell} />
            <h1>Workout</h1>
          </div>
          <div className="card-item-body">
            <h1>{fitnessData.workoutCount} times</h1>
          </div>
          <div className="card-crud-item">
            <div className="card-crud-btn minus">
              <button
                onClick={() => {
                  const updated = workout - 1;
                  setWorkout(updated);
                  updateWorkoutTime(updated);
                }}
              >
                -
              </button>
            </div>
            <div className="card-crud-btn plus">
              <button
                onClick={() => {
                  const updated = workout + 1;
                  setWorkout(updated);
                  updateWorkoutTime(updated);
                }}
              >
                +
              </button>
            </div>
            <div className="card-crud-btn save">
              <button>Save</button>
            </div>
            <div className="card-crud-btn cancel">
              <button>Cancel</button>
            </div>
          </div>
        </div>
        <div className="card-item card-protein">
          <div className="card-item-header">
            <FontAwesomeIcon className="icon" icon={faEgg} />
            <h1>Protein</h1>
          </div>
          <div className="card-item-body">
            {/*  依照 User 的輸入而改變 */}
            <h1>{fitnessData.proteinPercent}%</h1>
            <div className="protein-bar">
              <div
                className="protein-bar-fill"
                // 依照 User 的輸入而改變
                style={{ width: `${fitnessData.proteinPercent}%` }}
              ></div>
            </div>
          </div>
          <div className="card-crud-item">
            <div className="card-crud-btn add">
              <button>Add</button>
            </div>
            <div className="card-crud-btn modify">
              <button>Modify</button>
            </div>
            <div className="card-crud-btn save">
              <button>Save</button>
            </div>
            <div className="card-crud-btn cancel">
              <button>Cancel</button>
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

{
  /* <div className="card-crud-item">
  <div className="card-crud-btn minus">-</div>
  <div className="card-crud-btn plus">+</div>
  <div className="card-crud-btn finish">Finish</div>{" "}
</div>; */
}
