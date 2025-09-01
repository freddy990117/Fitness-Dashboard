import React, { useEffect, useRef, useState } from "react";
import "../styles/setup.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
const Setup = () => {
  // 加入導覽列
  const navigate = useNavigate();
  // 用來紀錄 User 輸入的值
  const [inputWeight, setInputWeight] = useState([]); // 會是很多天的數值，所以會是 Array
  const [inputDate, setInputDate] = useState([]); // 日期
  const [inputWorkout, setInputWorkout] = useState(0); // 訓練次數
  const [inputProtein, setInputProtein] = useState(0); // 蛋白質攝取
  // 確定輸入的值
  const [currentValue, setCurrentValue] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  // !如果輸入框沒有值時觸發
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false); // 如果變成 true 代表全部編輯完成，會傳送到 fireStore 的狀態
  const [formStep, setFormStep] = useState(1); // 整體 form 的下一步狀態 （總共三步）
  const [weightStep, setWeightStep] = useState(1); // 體重的下一步狀態 （總共七步）
  const weightCount = 7;
  const formCount = 3;
  // 綁定按下 Enter 執行下一個表單的行為 (ref) + 當 formStep 改變時執行
  const workoutRef = useRef(null);
  const proteinRef = useRef(null);
  // 取最後一個值出來給畫面呈現使用 (Weight)
  const lastWeight =
    inputWeight.length > 0 ? inputWeight[inputWeight.length - 1] : null;

  // 這邊是給 Dashborad 畫面顯示的值
  const showDataOnDashboard = {
    weight: lastWeight,
    workoutCount: inputWorkout,
    proteinPercent: inputProtein,
  };
  // 這是要給 Chart.js 使用的資料（七天份）
  const data = {
    inputWeight,
    inputDate,
  };

  // 當表單都輸入完畢後，將資料更新到 fireStore 上
  const saveToFirestore = async (userid, showDataOnDashboard, data) => {
    try {
      // 存放使用者的資料，setDoc 覆蓋原本的值
      await setDoc(doc(db, "users", userid), {
        dashboard: showDataOnDashboard, // 給 Dashboard 顯示
        history: data, // 上傳七天份的資料給 fireStore（後續給 Chart 引用）
        createdAt: new Date().toISOString(),
      });
      console.log("Firestore 更新成功！");
    } catch (error) {
      console.error("上傳失敗", error);
    }
  };

  // 用於檢測按下鍵盤是否為 Enter 的行為
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNextStep();
    }
  };

  // 按下「下一步」的事件
  const handleNextStep = () => {
    if (formStep === 1) {
      // 如果輸入框的「體重與日期」是空值，則跳出錯誤
      if (!currentDate || !currentValue) {
        setError(true);
        return;
      }
      // 將輸入的值加入到 array 中
      setError(false);
      setInputWeight((prev) => [...prev, currentValue]);
      setInputDate((prev) => [...prev, currentDate]);
      setCurrentValue("");
      setCurrentDate("");
      // 如果 Weight 表單填寫完畢 （大於7），前往下一個表單
      if (weightStep < weightCount) {
        setWeightStep((prev) => prev + 1);
      } else {
        setFormStep(2);
      }
    }

    if (formStep === 2) {
      // 如果值是空的，跳出錯誤（輸入的值會在 input 中使用 onChange 獲取，這邊主要設定邏輯）
      if (!inputWorkout) {
        setError(true);
        return;
      }
      setError(false);
      setFormStep(3);
    }

    if (formStep === 3) {
      // 如果值是空的，跳出錯誤（輸入的值會在 input 中使用 onChange 獲取，這邊主要設定邏輯）
      if (!inputProtein) {
        setError(true);
        return;
      }
      setError(false);
      // 表單完成
      setEdit("Finish");
      // 上傳資料到雲端上
      saveToFirestore("user1", showDataOnDashboard, data);
      // 到 formStep 3 完成，上傳資料後導覽到 dashboard
      navigate("/dashboard");
    }
  };

  // 當表單發生改變時觸發
  useEffect(() => {
    if (formStep === 2 && workoutRef.current) {
      workoutRef.current.focus();
    }
    if (formStep === 3 && proteinRef.current) {
      proteinRef.current.focus();
    }
  }, [formStep]);

  // 按下「儲存」的事件
  const handleSave = async () => {
    if (!inputProtein || !inputWorkout || inputWeight.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setEdit("Finish");
    try {
      await saveToFirestore("user1", showDataOnDashboard, data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

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
              className={error ? "error" : ""}
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
              className={error ? "error" : ""}
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
              // 綁定「下一步」事件
              handleNextStep();
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
              // 綁定「下一步」事件
              handleSave();
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
