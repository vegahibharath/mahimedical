import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { logout } from "../../utils/Auth";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [blogCount, setBlogCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {

    const blogsRes = await api.get("/blogs");
    const newsRes = await api.get("/news");

    const blogs = blogsRes.data;

    setBlogCount(blogs.length);
    setNewsCount(newsRes.data.length);

    // Calculate total likes & views
    let likes = 0;
    let views = 0;

    blogs.forEach(b => {
      likes += b.likes;
      views += b.views;
    });

    setTotalLikes(likes);
    setTotalViews(views);
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* LEFT SIDEBAR */}
        <div className="col-md-2 bg-primary text-white vh-100 p-3">

          <h5>Mahi Admin</h5>

          <ul className="list-unstyled mt-4">

            <li onClick={() => navigate("/admin/dashboard")} style={{ cursor: "pointer" }}>
              Dashboard
            </li>

            <li onClick={() => navigate("/admin/blogs")} style={{ cursor: "pointer" }}>
              Blogs
            </li>

            <li onClick={() => navigate("/admin/news")} style={{ cursor: "pointer" }}>
              News
            </li>

            <li onClick={() => navigate("/admin/gallery")} style={{ cursor: "pointer" }}>
              Gallery
            </li>

            <li onClick={logout} style={{ cursor: "pointer", color: "#ffdddd" }}>
              Logout
            </li>

          </ul>

        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-10 p-4">

          <h4 className="mb-3">Admin Dashboard</h4>

          {/* METRIC TILES */}
          <div className="row mb-4">

            <div className="col-md-3">
              <div className="card shadow text-center p-3">
                <h6>Total Blogs</h6>
                <h3>{blogCount}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center p-3">
                <h6>Total News</h6>
                <h3>{newsCount}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center p-3">
                <h6>Total Likes</h6>
                <h3>{totalLikes}</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center p-3">
                <h6>Total Views</h6>
                <h3>{totalViews}</h3>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
