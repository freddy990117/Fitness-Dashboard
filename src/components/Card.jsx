import { React, useState, useEffect, useRef } from "react";
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
import { db, auth } from "../services/firebase";

const Card = () => {
  // FireStore Database
  // 先將 Database 的資料預設為 0，防止錯誤訊息跳出 (null)
  const [fitnessData, setFitnessData] = useState({
    weight: 0,
    proteinPercent: 0,
    workoutCount: 0,
  });
  // 提供給 chart 的 data
  const [chartData, setChartData] = useState({
    inputWeight: [],
    inputDate: [],
  });
  // 放置快取的資料，當按下 save 時在進行變更
  const [editWeight, setEditWeight] = useState(null);
  const [editWorkout, setEditWorkout] = useState(null);
  const [editProtein, setEditProtein] = useState(null);
  // 設定編輯蛋白質的狀態
  const [isEditProtein, setIsEditProtein] = useState(false);
  // 設定點選 Modify btn 後會自動跳到 input 視窗的 State
  const proteinRef = useRef(null);

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

  const randomTips = useRef(
    healthTips[Math.floor(Math.random() * healthTips.length)]
  );

  const user = auth.currentUser;

  // 將最新的 weight data 即時更新到 fireStore 上
  const updateWeight = async (newWeight) => {
    await updateDoc(doc(db, "users", user.uid), {
      "dashboard.weight": newWeight,
    });
  };
  // 將最新的 workoutCount data 即時更新到 fireStore 上
  const updateWorkoutTime = async (newWorkoutTime) => {
    await updateDoc(doc(db, "users", user.uid), {
      "dashboard.workoutCount": newWorkoutTime,
    });
  };
  // 將最新的 proteinPercent data 即時更新到 fireStore 上
  const updateProtein = async (newProtein) => {
    await updateDoc(doc(db, "users", user.uid), {
      "dashboard.proteinPercent": newProtein,
    });
  };

  // 在畫面 Render 後執行，使用 onSnapshot 監聽 Firestore 的變化，自動推送資料至 state，因此無需指定 dependency
  useEffect(() => {
    if (!user) return;
    // onSnapshot 是官方提供的函式，用於「即時」監聽資料庫的變化，第一個參數是「指定要使用哪一筆資料」
    const unsub = onSnapshot(
      // 取得的資料是 users (Collection) 內 user.id (Document) 的 Database
      doc(db, "users", user.uid),
      // onSnapshot 第二個參數是一個 callBack fn
      (doc) => {
        // exists 檢查資料庫中是否有這筆資料
        if (doc.exists()) {
          // data() 以物件的方式返回資料 {..,..,..}
          const data = doc.data();
          // 設定值給各項參數
          setFitnessData(data.dashboard);
          setChartData(data.history);
        }
      }
    );
    return () => unsub();
  }, [user]);

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
            {/* editWeight 如果是 null，顯示 firestore 的內容，不是的話則顯示更改的值 */}
            <h1>{editWeight !== null ? editWeight : fitnessData.weight}kg</h1>
          </div>
          <div className="card-crud-item">
            <div className="card-crud-btn minus">
              <button
                onClick={() => {
                  setEditWeight((prev) =>
                    // setEditWeight 如果是 null 值會是 => 初始值開始，如果不是則是從 editWeight 開始
                    prev === null ? fitnessData.weight - 0.5 : prev - 0.5
                  );
                }}
              >
                -
              </button>
            </div>
            <div className="card-crud-btn plus">
              <button
                onClick={() => {
                  setEditWeight((prev) =>
                    // setEditWeight 如果是 null 會是從初始值開始，如果不是則是從 editWeight 開始
                    prev === null ? fitnessData.weight + 0.5 : prev + 0.5
                  );
                }}
              >
                +
              </button>
            </div>
            <div className="card-crud-btn save">
              <button
                onClick={() => {
                  if (editWeight !== null) {
                    updateWeight(editWeight); // 上傳 editWeight 給 setEditWeight(async fn)，使其將資料傳給 Firestore
                    setEditWeight(null); // 清空狀態
                  }
                }}
              >
                Save
              </button>
            </div>
            <div className="card-crud-btn cancel">
              <button
                onClick={() => {
                  // 清空狀態，返回初始值 (null)
                  setEditWeight(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="card-item card-workout">
          <div className="card-item-header">
            <FontAwesomeIcon className="icon workout" icon={faDumbbell} />
            <h1>Workout</h1>
          </div>
          <div className="card-item-body">
            <h1>
              {/* editWorkout 如果是 null，顯示 firestore 的內容，不是的話則顯示更改的值 */}
              {editWorkout !== null ? editWorkout : fitnessData.workoutCount}{" "}
              times
            </h1>
          </div>
          <div className="card-crud-item">
            <div className="card-crud-btn minus">
              <button
                onClick={() => {
                  setEditWorkout((prev) => {
                    // 如果 editWorkout 的值不是 null，current 會是 workoutCount，是的話則是 editWorkout
                    const current =
                      prev === null ? fitnessData.workoutCount : prev;
                    // 防止 current < 0
                    return current > 0 ? current - 1 : 0;
                  });
                }}
              >
                -
              </button>
            </div>
            <div className="card-crud-btn plus">
              <button
                onClick={() => {
                  // setEditWorkout 如果是 null 值會是 => 初始值開始，如果不是則是從 workoutCount 開始
                  setEditWorkout((prev) => {
                    return prev === null
                      ? fitnessData.workoutCount + 1
                      : prev + 1;
                  });
                }}
              >
                +
              </button>
            </div>
            <div className="card-crud-btn save">
              <button
                onClick={() => {
                  if (editWorkout !== null) {
                    updateWorkoutTime(editWorkout); // 上傳 editWorkout 給 updateWorkoutTime(async fn)，使其將資料傳給 Firestore
                    setEditWorkout(null); // 清空狀態
                  }
                }}
              >
                Save
              </button>
            </div>
            <div className="card-crud-btn cancel">
              <button
                onClick={() => {
                  // 返回初始值
                  setEditWorkout(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="card-item card-protein">
          <div className="card-item-header">
            <FontAwesomeIcon className="icon" icon={faEgg} />
            <h1>Protein</h1>
          </div>
          <div className="card-item-body">
            {/* 如果按下 Modify btn 則顯示 input，沒有的話則顯示 fireStore 上的 ProteinData */}
            {isEditProtein ? (
              <input
                // 綁定 ref，用於 focus
                ref={proteinRef}
                type="number"
                value={editProtein}
                // 設定最低與最高的值
                min={0}
                max={100}
                onChange={(e) => {
                  // 先取得輸入的值之後
                  const current = Number(e.target.value);
                  // 如果大於或是小於的話，就跳出提示視窗並結束，返回的是上次輸入的值
                  if (current > 100 || current < 0) {
                    alert("請輸入 0-100 的值");
                    return;
                  }
                  // 沒有大於或是小於的話，就儲存輸入的值
                  setEditProtein(current);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateProtein(editProtein);
                    setEditProtein(null);
                    setIsEditProtein(false);
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "2.5rem",
                  fontWeight: "bolder",
                  padding: "0.2rem",
                  marginBottom: "0.3rem",
                  border: "none",
                  textAlign: "center",
                }}
              ></input>
            ) : (
              <h1>
                {/* editProtein 如果是 null，顯示 firestore 的內容，不是的話則顯示更改的值 */}
                {editProtein !== null
                  ? editProtein
                  : fitnessData.proteinPercent}
                %
              </h1>
            )}

            <div className="protein-bar">
              <div
                className="protein-bar-fill"
                // 依照 User 的輸入而改變％數
                style={{
                  width: `${
                    editProtein !== null
                      ? editProtein
                      : fitnessData.proteinPercent
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="card-crud-item">
            <div className="card-crud-btn add">
              <button
                onClick={() => {
                  setEditProtein((prev) => {
                    const current =
                      prev === null ? fitnessData.proteinPercent + 5 : prev + 5;
                    // 設定最大不超過 100
                    return Math.min(current, 100);
                  });
                }}
              >
                +
              </button>
            </div>
            <div className="card-crud-btn minus">
              <button
                onClick={() => {
                  setEditProtein((prev) => {
                    const current =
                      prev === null ? fitnessData.proteinPercent - 5 : prev - 5;
                    // 設定最小不超過 0
                    return Math.max(current, 0);
                  });
                }}
              >
                -
              </button>
            </div>
            <div className="card-crud-btn modify">
              <button
                onClick={() => {
                  setIsEditProtein(true);
                  setEditProtein(fitnessData.proteinPercent);

                  // 等畫面更新後再 focus（用 setTimeout 是因為 isEditProtein 還沒切換完）
                  setTimeout(() => {
                    proteinRef.current?.focus();
                  }, 0);
                }}
              >
                Modify
              </button>
            </div>
            <div className="card-crud-btn save">
              <button
                onClick={() => {
                  if (editProtein !== null) {
                    updateProtein(editProtein);
                    setEditProtein(null);
                    setIsEditProtein(false);
                  }
                }}
              >
                Save
              </button>
            </div>
            <div className="card-crud-btn cancel">
              <button
                onClick={() => {
                  setEditProtein(null);
                  setIsEditProtein(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="card-bar card-weight-change">
          <h1>Weight Trend Line </h1>
          <Chart chartData={chartData} />
        </div>
        <div className="card-bar card-tip">
          <h1>Health Tip</h1>
          <h2>{randomTips.current}</h2>
        </div>
      </div>
    </section>
  );
};
export default Card;
