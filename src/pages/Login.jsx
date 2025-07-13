import { React, useState } from "react";
// 帶入 firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  // 儲存使用者輸入的狀態（email,password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // 設定提交資料與驗證的函式
  const handleLoginSubmit = async (e) => {
    // 終止表單的預設送出行為
    e.preventDefault();
    try {
      // signInWithEmailAndPassword 是 firebase 提供的非同步函式，會自動比對 email,password
      await signInWithEmailAndPassword(auth, email, password);
      // 比對成功在執行下一步（正確就跳轉頁面）
      navigate("/dashboard");
    } catch (error) {
      console.log("登入失敗，因為：" + error.message);
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
