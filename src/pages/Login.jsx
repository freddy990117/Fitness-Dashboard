import React from "react";

export const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-section">
          <div className="login-page__form">
            <form>
              <h2>🧑‍💻 Freddy</h2>
              <h1>
                Hello,
                <br />
                Welcome Back
              </h1>
              <p>Hey,welcome back to your fitness space</p>
              {/* Email */}
              <input type="email" id="accout" placeholder="Email...." />
              {/* Password */}
              <input type="password" id="password" placeholder="Password...." />
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
