<<<<<<< HEAD
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../utils/Auth";

const AdminDashboard = () => {
  const [openTherapists, setOpenTherapists] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2 bg-primary text-white vh-100 p-3">
          <h5 className="mb-4">Mahi Admin</h5>

          <ul className="list-unstyled">

            {/* Dashboard */}
            <li className="mb-2">
              <Link className="text-white" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>

            {/* Therapists Dropdown */}
            <li className="mb-2">
              <div
                onClick={() => setOpenTherapists(!openTherapists)}
                style={{ cursor: "pointer" }}
                className="d-flex justify-content-between align-items-center"
              >
                <span>Therapists</span>
                <span>{openTherapists ? "▲" : "▼"}</span>
              </div>

              {openTherapists && (
                <ul className="list-unstyled ml-3 mt-2">
                  <li className="mb-1">
                    <Link className="text-white" to="/admin/therapists/getall">
                      View Therapists
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link className="text-white" to="/admin/therapists/add">
                      Add Therapist
                    </Link>
                  </li>
                 
                </ul>
              )}
            </li>

            {/* Blogs */}
            <li className="mb-2">
              <Link className="text-white" to="/admin/blogs">
                Blogs
              </Link>
            </li>

            {/* Logout */}
            <li
              className="mt-4"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </li>

          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h4>Admin Dashboard</h4>
          <p className="text-muted">
            Use the sidebar to manage therapists and content.
          </p>
        </div>

      </div>
=======
import { useEffect, useState } from "react";
import api from "../../api/api";

const AdminDashboard = () => {

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
    <div>

      <h4 className="mb-4">Admin Dashboard</h4>

      <div className="row">

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

>>>>>>> origin/sruthi
    </div>
  );
};

export default AdminDashboard;
