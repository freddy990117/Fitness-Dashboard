import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "../src/Routes/Router";
import { auth } from "../src/services/firebase"; // 從 firebase 引入使用者資訊
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 監聽使用者是否有登入，auth 從 firebase 取，會在 Login Component 驗證並發回 Token，此處檢查是否有效
    const isLogin = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 有登入使用者
      } else {
        setUser(null);
      }
      setLoading(false); // 沒有則返回 loading
    });

    return () => {
      isLogin(); //生命週期結束，清理監聽
    };
  }, []);

  if (loading) {
    return <div>載入中.....</div>;
  }
  return (
    <div>
      <BrowserRouter>
        {/* 將 Router 分離，以便維護使用 */}
        <Router user={user} />
      </BrowserRouter>
    </div>
  );
};

export default App;
