import React, { useState } from "react";
import "../styles/setup.css";

const Setup = () => {
  // 用來紀錄 User 輸入的值
  const [inputWeight, setInputWeight] = useState([]); // 會是很多天的數值，所以會是 Array
  const [inputDate, setInputDate] = useState([]); // 日期
  const [inputWorkout, setInputWorkout] = useState(0); // 訓練次數
  const [inputProtein, setInputProtein] = useState(0); // 蛋白質攝取
  // 按下 button 會觸發的行為
  const [edit, setEdit] = useState(false); // 如果變成 true 代表全部編輯完成，會傳送到 fireStore 的狀態
  const [fromStep, setFromStep] = useState(1); // 整體 form 的下一步狀態 （總共三步）
  const [weightStep, setWeightStep] = useState(1); // 體重的下一步狀態 （總共七步）
  const weightCount = 7;
  const formCount = 3;
  return (
    <div className="setup">
      <div className="form-setting">
        <div className="step-bar">
          <div
            className="step-progress"
            style={{
              width: `calc(${((fromStep - 1) / (formCount - 1)) * 92}% )`,
            }}
          ></div>
          <div className={`step-circle ${fromStep >= 1 ? "active" : ""}`}>
            1
          </div>
          <div className={`step-circle ${fromStep >= 2 ? "active" : ""}`}>
            2
          </div>
          <div className={`step-circle ${fromStep >= 3 ? "active" : ""}`}>
            3
          </div>
        </div>
        {/* Step 1 體重紀錄 */}
        <div className={`form ${fromStep === 1 ? "weight-input" : "disable"}`}>
          <div className="weight-bar">
            <div
              className="progress"
              style={{
                width: `calc(${((weightStep - 1) / (weightCount - 1)) * 93}% )`,
              }}
            ></div>
            <div className={`circle ${weightStep >= 1 ? "active" : ""}`}>1</div>
            <div className={`circle ${weightStep >= 2 ? "active" : ""}`}>2</div>
            <div className={`circle ${weightStep >= 3 ? "active" : ""}`}>3</div>
            <div className={`circle ${weightStep >= 4 ? "active" : ""}`}>4</div>
            <div className={`circle ${weightStep >= 5 ? "active" : ""}`}>5</div>
            <div className={`circle ${weightStep >= 6 ? "active" : ""}`}>6</div>
            <div className={`circle ${weightStep >= 7 ? "active" : ""}`}>7</div>
          </div>
          {/* Step 1 體重 */}
          <h1>輸入你最近的體重</h1>
          <div className="form-input">
            <div className="date">
              <h2>選取日期</h2>
              <input
                type="date"
                id="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>
            <div className="weight">
              <h2>體重</h2>
              <input type="number" id="weight" placeholder="當時的體重" />
            </div>
          </div>
        </div>
        {/* Step 2 訓練次數 */}
        <div className={`form ${fromStep === 2 ? "count-input" : "disable"}`}>
          <div className="form-input">
            <h1>今天訓練了幾次呢？</h1>
            <input
              id="workout"
              name="workout"
              type="number"
              placeholder="訓練次數"
              max={10}
              min={0}
            />
          </div>
        </div>
        {/* // Step 3 蛋白質攝取 */}
        <div className={`form ${fromStep === 3 ? "protein-input" : "disable"}`}>
          <div className="form-input">
            <h1>今天攝取了多了％的蛋白質呢？</h1>
            <input
              id="protein"
              name="protein"
              type="number"
              placeholder="蛋白質攝取"
              min={0}
              max={100}
            />
          </div>
        </div>
        <div className="input-btn">
          <button
            onClick={() => {
              if (fromStep === 1) {
                // Step 1 裡面走 weightStep
                setWeightStep((prev) => Math.max(prev - 1, 1));
              } else {
                // 其他步驟直接切回上一步
                setFromStep((prev) => Math.max(prev - 1, 1));
              }
            }}
          >
            {" < "}上一步
          </button>
          <button
            className={`next ${
              weightStep >= weightCount ? "disable" : "active"
            }`}
            onClick={() => {
              setWeightStep((prev) => Math.min(prev + 1, 7));
            }}
          >
            下一步{" > "}
          </button>

          <button
            className={`save ${
              weightStep >= weightCount ? "active" : "disable"
            }`}
            onClick={() => {
              setFromStep((prev) => Math.min(prev + 1, 3));
            }}
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setup;
