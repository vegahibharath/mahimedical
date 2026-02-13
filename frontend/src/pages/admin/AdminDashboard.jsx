import { useEffect, useState } from "react";
import api from "../../api/api";

const AdminDashboard = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const blogsRes = await api.get("/blogs");
      const newsRes = await api.get("/news");

      const blogs = blogsRes.data;

      setBlogCount(blogs.length);
      setNewsCount(newsRes.data.length);

      let likes = 0;

      blogs.forEach(b => {
        likes += b.likes || 0;
      });

      setTotalLikes(likes);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* HEADER */}
    

      {/* CARDS */}
      <div className="row g-4">

        {/* BLOGS */}
        <div className="col-md-4">
          <div className="card dashboard-card shadow border-0 text-center p-4">
            <div className="fs-2 mb-2 text-primary">📝</div>
            <h6>Total Blogs</h6>
            <h2 className="fw-bold">{blogCount}</h2>
          </div>
        </div>

        {/* NEWS */}
        <div className="col-md-4">
          <div className="card dashboard-card shadow border-0 text-center p-4">
            <div className="fs-2 mb-2 text-success">📰</div>
            <h6>Total News</h6>
            <h2 className="fw-bold">{newsCount}</h2>
          </div>
        </div>

        {/* LIKES */}
        <div className="col-md-4">
          <div className="card dashboard-card shadow border-0 text-center p-4">
            <div className="fs-2 mb-2 text-danger">❤️</div>
            <h6>Total Likes</h6>
            <h2 className="fw-bold">{totalLikes}</h2>
          </div>
        </div>

      </div>

      {/* STYLE */}
      <style>{`
        .dashboard-card {
          transition: 0.3s;
          border-radius: 14px;
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,.12);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
