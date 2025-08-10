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
  return (
    <div className="setup">
      <container className="form-setting">
        <div className="step-bar">
          <div className="bar">
            <div className="progress" id="progress"></div>
            <div className="circle active">1</div>
            <div className="circle">2</div>
            <div className="circle">3</div>
          </div>
        </div>
        <div className="weight-input form">
          <div className="weight-bar">
            <div className="progress"></div>
            <div className="circle active">1</div>
            <div className="circle">2</div>
            <div className="circle">3</div>
            <div className="circle">4</div>
            <div className="circle">5</div>
            <div className="circle">6</div>
            <div className="circle">7</div>
          </div>
          {/* Step 1 體重 */}
          <h1>輸入你最近的體重趨勢</h1>
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
              <input type="number" id="weight" placeholder="請輸入當時的體重" />
            </div>
          </div>
          <div className="input-btn">
            <button
              onClick={() => {
                setWeightStep((prev) => prev - 1);
              }}
            >
              {" < "}上一步
            </button>
            <button
              onClick={() => {
                setWeightStep((prev) => prev + 1);
              }}
            >
              下一步{" > "}
            </button>

            {/* // TODO 前往下一個表格的按鈕，後面會做條件判斷，先 command */}
            {/* <button
              onClick={() => {
                setFromStep((prev) => prev + 1);
              }}
            >
              儲存
            </button> */}
          </div>
        </div>
        {/* Step 2 訓練次數 */}
        {/* <div className="count-input form">
          <h1>你今天訓練了嗎？</h1>
          <input type="number" placeholder="訓練次數" />
          <button
            onClick={() => {
              setFromStep((prev) => prev + 1);
            }}
          >
            下一步
          </button>
        </div>
     
        // Step 3 蛋白質攝取
        <div className="protein-input form">
          <h1>今天吃了多少所需的蛋白質？</h1>
          <input type="number" placeholder="蛋白質攝取" />
          <button
            onClick={() => {
              setEdit(true);
            }}
          >
            下一步
          </button>
        </div> */}
      </container>
    </div>
  );
};

export default Setup;
