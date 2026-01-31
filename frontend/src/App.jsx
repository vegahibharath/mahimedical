import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogManager from "./pages/admin/BlogManager";
import GalleryManager from "./pages/admin/GalleryManager";
import NewsManager from "./pages/admin/NewsManager";
import AdminLayout from "./pages/admin/AdminLayout";

import UserLayout from "./layouts/UserLayout";

import Home from "./pages/user/Home";
import BlogPage from "./pages/user/BlogPage";
import NewsPage from "./pages/user/NewsPage";
import GalleryPage from "./pages/user/GalleryPage";
import ContactPage from "./pages/user/ContactPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL WITH SIDEBAR */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="blogs" element={<BlogManager />} />

          <Route path="gallery" element={<GalleryManager />} />

          <Route path="news" element={<NewsManager />} />

        </Route>

        {/* USER WEBSITE */}
        <Route path="/" element={<UserLayout />}>

          <Route index element={<Home />} />

          <Route path="blogs" element={<BlogPage />} />

          <Route path="news" element={<NewsPage />} />

          <Route path="gallery" element={<GalleryPage />} />

          <Route path="contact" element={<ContactPage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
