import React, { useEffect, useRef, useState } from "react";
import "../styles/setup.css";

const Setup = () => {
  // 用來紀錄 User 輸入的值
  const [inputWeight, setInputWeight] = useState([]); // 會是很多天的數值，所以會是 Array
  const [inputDate, setInputDate] = useState([]); // 日期
  const [inputWorkout, setInputWorkout] = useState(0); // 訓練次數
  const [inputProtein, setInputProtein] = useState(0); // 蛋白質攝取
  // 取最後一個值出來給畫面呈現使用 (Weight)
  const lastWeight =
    inputWeight.length > 0 ? inputWeight[inputWeight.length - 1] : null;
  // 上傳給 firebase 的值
  const data = {
    weight: lastWeight,
    workoutCount: inputWorkout,
    proteinPercent: inputProtein,
  };
  // 確定輸入的值
  const [currentValue, setCurrentValue] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  // !如果輸入框沒有值時觸發
  const [error, setError] = useState(false);
  // 按下 button 會觸發的行為
  const [edit, setEdit] = useState(false); // 如果變成 true 代表全部編輯完成，會傳送到 fireStore 的狀態
  const [formStep, setFormStep] = useState(1); // 整體 form 的下一步狀態 （總共三步）
  const [weightStep, setWeightStep] = useState(1); // 體重的下一步狀態 （總共七步）
  const weightCount = 7;
  const formCount = 3;
  // 綁定按下 Enter 執行下一個表單的行為 (ref) + 當 formStep 改變時執行
  const workoutRef = useRef(null);
  const proteinRef = useRef(null);

  // 按下「下一步」與「儲存」的事件
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (formStep === 1) {
        // Setp.1 Weight Step 有七步
        setWeightStep((prev) => Math.min(prev + 1, 7));
        // 確定將輸入的值傳給正確的 State
        setInputWeight((prev) => [...prev, currentValue]);
        setInputDate((prev) => [...prev, currentDate]);
        // 清空輸入的狀態
        setCurrentValue("");
        setCurrentDate("");
        if (weightStep >= weightCount) {
          setFormStep(2);
        }
      }
      if (formStep === 2) {
        setFormStep(3);
      }
      if (formStep === 3) {
        setEdit("表單皆輸入完畢");
      }
    }
  };

  // 輸入框沒有值時觸發

  // 當表單發生改變時觸發
  useEffect(() => {
    if (formStep === 2 && workoutRef.current) {
      workoutRef.current.focus();
    }
    if (formStep === 3 && proteinRef.current) {
      proteinRef.current.focus();
    }
  }, [formStep]);

  return (
    <div className="setup">
      <div className="form-setting">
        <div className="step-bar">
          <div
            className="step-progress"
            style={{
              width: `calc(${((formStep - 1) / (formCount - 1)) * 92}% )`,
            }}
          ></div>
          <div className={`step-circle ${formStep >= 1 ? "active" : ""}`}>
            1
          </div>
          <div className={`step-circle ${formStep >= 2 ? "active" : ""}`}>
            2
          </div>
          <div className={`step-circle ${formStep >= 3 ? "active" : ""}`}>
            3
          </div>
        </div>
        {/* Step 1 體重紀錄 */}
        <div className={`form ${formStep === 1 ? "weight-input" : "disable"}`}>
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
                className={error ? "error" : ""}
                type="date"
                id="date"
                // value 綁定「快取」的值，按下 Enter 會傳給「正確」的State
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
              />
            </div>
            <div className="weight">
              <h2>體重</h2>
              <input
                className={error ? "error" : ""}
                type="number"
                id="weight"
                placeholder="當時的體重"
                // 綁定 Enter 事件
                onKeyDown={handleKeydown}
                min={0}
                max={200}
                // value 綁定「快取」的值，按下 Enter 會傳給「正確」的State
                value={currentValue}
                onChange={(e) => {
                  setCurrentValue(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {/* Step 2 訓練次數 */}
        <div className={`form ${formStep === 2 ? "count-input" : "disable"}`}>
          <div className="form-input">
            <h1>今天訓練了幾次呢？</h1>
            <input
              id="workout"
              name="workout"
              type="number"
              placeholder="訓練次數"
              max={10}
              min={0}
              ref={workoutRef}
              // 綁定 Enter 事件
              onKeyDown={handleKeydown}
              onChange={(e) => {
                setInputWorkout(e.target.value);
              }}
            />
          </div>
        </div>
        {/* // Step 3 蛋白質攝取 */}
        <div className={`form ${formStep === 3 ? "protein-input" : "disable"}`}>
          <div className="form-input">
            <h1>今天攝取了多了％的蛋白質呢？</h1>
            <input
              id="protein"
              name="protein"
              type="number"
              placeholder="蛋白質攝取"
              min={0}
              max={100}
              ref={proteinRef}
              // 綁定 Enter 事件
              onKeyDown={handleKeydown}
              onChange={(e) => {
                setInputProtein(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="input-btn">
          {/* 上一步 */}
          <button
            onClick={() => {
              if (formStep === 1) {
                // Step 1 裡面走 weightStep
                setWeightStep((prev) => Math.max(prev - 1, 1));
              } else {
                // 其他步驟直接切回上一步
                setFormStep((prev) => Math.max(prev - 1, 1));
              }
            }}
          >
            {" < "}上一步
          </button>
          {/* 下一步 */}
          <button
            className={`next ${
              weightStep >= weightCount ? "disable" : "active"
            }`}
            onClick={() => {
              // 確定將輸入的值傳給正確的 State
              setInputWeight((prev) => [...prev, currentValue]);
              setInputDate((prev) => [...prev, currentDate]);
              // 清空輸入的狀態
              setCurrentValue("");
              setCurrentDate("");
            }}
          >
            下一步{" > "}
          </button>
          {/* 儲存 */}
          <button
            className={`save ${
              weightStep >= weightCount ? "active" : "disable"
            }`}
            onClick={() => {
              setFormStep((prev) => Math.min(prev + 1, 3));
              setInputWeight((prev) => [...prev, currentValue]);
              setCurrentValue("");
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
