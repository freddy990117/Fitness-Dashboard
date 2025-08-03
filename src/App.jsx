import { React, useEffect } from "react";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import useAuth from "./hooks/useAuth";

const App = () => {
  //帶入認證
  const { user, loading } = useAuth();

  if (loading) return <p>載入中.....</p>;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* 如果 user 沒登入，跳轉到「登入頁面」，有登入則跳轉到「dashboard」 */}
          <Route
            path="/Login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/Dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          {/* 預設的路由是登入的畫面 */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// ! 需要新增一個設定的頁面給第一次登入者使用，目前已從 Dashboard-setup -> feature/auth-reduect-setup -> feature/setup-page 開了 branch
// 設定 Setup 畫面 UI + 邏輯
// feature/setup-page
// 實作 Firebase Auth 登入流程
// feature/auth-flow
// Dashboard 畫面 CRUD
// feature/dashboard-crud
