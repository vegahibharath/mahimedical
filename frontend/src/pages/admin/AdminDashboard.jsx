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

    </div>
  );
};

export default AdminDashboard;
