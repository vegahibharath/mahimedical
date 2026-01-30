import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogManager from "./pages/admin/BlogManager";
import GalleryManager from "./pages/admin/GalleryManager";
import NewsManager from "./pages/admin/NewsManager";
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

        <Route path="/" element={<Home />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={<ProtectedRoute><BlogManager /></ProtectedRoute>}
        />

        <Route
          path="/admin/gallery"
          element={<ProtectedRoute><GalleryManager /></ProtectedRoute>}
        />

        <Route
          path="/admin/news"
          element={<ProtectedRoute><NewsManager /></ProtectedRoute>}
        />
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
