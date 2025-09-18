import { React, useState } from "react";
// 帶入 firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  // 儲存使用者輸入的狀態（email,password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // 儲存帳戶錯誤的狀態
  const [errorMessage, setErrorMessage] = useState("");
  // 設定提交資料與驗證的函式
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 回傳使用者的物件
      const user = userCredential.user;
      const uid = user.uid;
      console.log(uid);
      // 拿到使用者的資料(users 子集合中的 uid，uid 會是 FireStore 自己生成的唯一值)
      const docRef = doc(db, "users", user.uid);
      // 取得內部資料
      const docSnap = await getDoc(docRef);
      // 如果資料存在，則開始判斷
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.isSetupComplete) {
          navigate("/dashboard"); // 已設定 → 去 Dashboard
        } else {
          navigate("/setup"); // 第一次登入 → 去 Setup
        }
      } else {
        // 如果沒有資料，就先建立一份
        await setDoc(docRef, {
          createdAt: new Date().toISOString(),
          isSetupComplete: false,
          dashboard: {
            weight: 0,
            proteinPercent: 0,
            workoutCount: 0,
          },
          history: {},
        });
        // 導入登入畫面
        navigate("/setup");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-section">
          <div className="login-page__form">
            <form onSubmit={handleLoginSubmit}>
              <h2>🧑‍💻 Freddy</h2>
              <h1>
                Hello,
                <br />
                Welcome Back
              </h1>
              <p>Hey,welcome back to your fitness space</p>
              {/* Email */}
              <input
                type="email"
                id="accout"
                placeholder="Email...."
                // 將輸入的值提供給 state
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              {/* Password */}
              <input
                type="password"
                id="password"
                placeholder="Password...."
                // 將輸入的值提供給 state
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              {/* Remember me + Forgot password */}
              <div className="form-options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
              {/* 新增登入錯誤提示 */}
              {errorMessage && (
                <p className="error-message">帳號或是密碼錯誤！</p>
              )}
              <button type="submit">Sign In</button>
            </form>
            <p className="signup-link">
              Don't have an accout?<a href="#">Sign Up</a>
            </p>
          </div>
          <div className="login-page__image">
            <img src="/assets/Login.png" alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};
