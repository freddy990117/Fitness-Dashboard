import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import Setup from "../pages/Setup";

const Router = ({ user }) => {
  return (
    <Routes>
      {/* 沒有登入導入到 Login 畫面 */}
      {!user ? (
        <Route path="*" element={<Login />} />
      ) : (
        <>
          <Route path="/setup" element={<Setup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Login />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
