import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/user/Home";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddTherapist from "../pages/admin/AddTherapist";

import ProtectedRoute from "../components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import Therapists from "../pages/admin/Therapists";
import BlogManager from "../pages/admin/BlogManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Route */}
        <Route path="/" element={<Home />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* View Therapists */}
        <Route
          path="/admin/therapists"
          element={
            <ProtectedRoute>
              <AddTherapist />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/blogs"
          element={<ProtectedRoute><BlogManager /></ProtectedRoute>}
        />

        {/* Add Therapist */}
        <Route
          path="/admin/therapists/add"
          element={
            <ProtectedRoute>
              <AddTherapist />
            </ProtectedRoute>
          }
        />
<Route
          path="/admin/therapists/getall"
          element={
            <ProtectedRoute>
              <Therapists/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
