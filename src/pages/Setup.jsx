import React, { useState } from "react";
import "../styles/setup.css";

const Setup = () => {
  // 用來紀錄 User 輸入的值
  const [inputWeight, setInputWeight] = useState([]); // 會是很多天的數值，所以會是 Array
  const [inputCount, setInputCount] = useState(1);
  const [inputDate, setInputDate] = useState([]);
  const [inputWorkoutCount, setInputWorkoutCount] = useState(0);
  const [inputProtein, setInputProtein] = useState(0);
  // 按下 button 會觸發的行為
  const [edit, setEdit] = useState(false);
  const [nextStep, setNextStep] = useState(1);
  return (
    <div className="setup">
      <container className="form-setting">
        <div className="weight-input form">
          <h1>輸入你最近的體重趨勢</h1>
          <input
            type="date"
            id="date"
            placeholder=""
            value={inputDate}
            onChange={(e) => setInputDate(Number(e.target.value))}
          />
          <input
            type="number"
            id="weight"
            placeholder="至少選取七天，圖表比較好辨識呦！"
          />
          <div className="input-btn">
            <button
              onClick={() => {
                setInputCount((prev) => prev + 1);
              }}
            >
              儲存
            </button>

            <button
              onClick={() => {
                setNextStep((prev) => prev + 1);
              }}
            >
              下一步
            </button>
          </div>
        </div>
        {/* <div className="count-input form">
          <h1>你今天訓練了嗎？</h1>
          <input type="number" placeholder="訓練次數" />
          <button
            onClick={() => {
              setNextStep((prev) => prev + 1);
            }}
          >
            下一步
          </button>
        </div>
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
        <div className="step-bar">
          <div className="bar"></div>
        </div>
      </container>
    </div>
  );
};

export default Setup;
