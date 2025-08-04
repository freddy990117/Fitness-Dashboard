import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import Setup from "../pages/Setup";
import useAuth from "../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const Router = () => {
  const { user, loading } = useAuth();
  // useNavigate 是一個 hook，要先調用參數
  const navigate = useNavigate();

  useEffect(() => {
    // 如果已經登入（user != null)，則顯示對應的資料
    if (user) {
      const checkUserData = async () => {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        // 這邊判斷登入後是否有資料，沒有的話則導向至 setup 頁面
        if (userSnap.exists()) {
          navigate("/dashboard"); // 有資料，去 dashboard
        } else {
          navigate("/setup"); // 沒資料，去 setup
        }
      };
      checkUserData();
    }
  }, [user]);

  if (loading) return <p>載入中...</p>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default Router;
