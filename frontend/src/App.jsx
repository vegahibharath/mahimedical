import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogManager from "./pages/admin/BlogManager";
import GalleryManager from "./pages/admin/GalleryManager";
import NewsManager from "./pages/admin/NewsManager";
import AdminLayout from "./pages/admin/AdminLayout";
import AddTherapist from "./pages/admin/AddTherapist";
import Therapists from "./pages/admin/Therapists";

import UserLayout from "./layouts/UserLayout";

import Home from "./pages/user/Home";
import NewsPage from "./pages/user/NewsPage";
import GalleryPage from "./pages/user/GalleryPage";
import ContactPage from "./pages/user/ContactPage";
import ImageBlogs from "./pages/user/ImageBlogs";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= ADMIN LOGIN ================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= ADMIN PANEL ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route index element={<AdminDashboard />} />

          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="blogs" element={<BlogManager />} />

          <Route path="gallery" element={<GalleryManager />} />

          <Route path="news" element={<NewsManager />} />

          {/* THERAPISTS ROUTES */}
          <Route path="therapists/getall" element={<Therapists />} />

          <Route path="therapists/add" element={<AddTherapist />} />

        </Route>

        {/* ================= USER WEBSITE ================= */}

        <Route path="/" element={<UserLayout />}>

          <Route index element={<Home />} />

          <Route path="blogs" element={<ImageBlogs />} />

          <Route path="news" element={<NewsPage />} />

          <Route path="gallery" element={<GalleryPage />} />

          <Route path="contact" element={<ContactPage />} />

          <Route path="blogs/images" element={<ImageBlogs />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
