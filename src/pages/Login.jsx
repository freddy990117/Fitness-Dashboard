import React from "react";

export const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-section">
          <div className="login-page__form">
            <form>
              <input type="email" name="" id="accout" placeholder="Email...." />
              <input
                type="password"
                name=""
                id="password"
                placeholder="Password...."
              />
              <input type="checkbox" /> Remeber me
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="login-page__image">
            <img src="/assets/Login.png" alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};
