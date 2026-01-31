import { useEffect, useState } from "react";
import api, { IMAGE_BASE_URL } from "../../api/api";

const BlogPage = () => {

  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    const res = await api.get("/blogs");
    setBlogs(res.data);
  };

  // ================= OPEN BLOG =================
  const openBlog = async (blog) => {

    const viewedBlogs =
      JSON.parse(localStorage.getItem("viewedBlogs")) || [];

    // Increase view only once
    if (!viewedBlogs.includes(blog._id)) {

      try {

        await api.get(`/blogs/${blog._id}`);

        viewedBlogs.push(blog._id);
        localStorage.setItem("viewedBlogs", JSON.stringify(viewedBlogs));

        fetchBlogs();

      } catch (error) {
        console.log(error);
      }
    }

    // Lock background scroll
    document.body.style.overflow = "hidden";

    // Show focus card
    setActiveBlog(blog);
  };

  // ================= LIKE BLOG =================
  const likeBlog = async (id) => {

    const likedBlogs =
      JSON.parse(localStorage.getItem("likedBlogs")) || [];

    if (likedBlogs.includes(id)) {
      alert("You already liked this blog");
      return;
    }

    try {

      await api.post(`/blogs/like/${id}`);

      likedBlogs.push(id);
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));

      fetchBlogs();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= CLOSE BLOG =================
  const closeBlog = () => {
    document.body.style.overflow = "auto";
    setActiveBlog(null);
  };

  return (
    <div className="container py-4">

      <h4 className="mb-4">Blogs</h4>

      {/* BLOG GRID */}
      <div className="row">

        {blogs.map(blog => (

          <div key={blog._id} className="col-md-4 mb-4">

            <div
              className="card shadow h-100"
              role="button"
              onClick={() => openBlog(blog)}
            >

              <img
                src={`${IMAGE_BASE_URL}/${blog.image}`}
                className="card-img-top"
                height="180"
                style={{ objectFit: "cover" }}
                alt="blog"
              />

              <div className="card-body">

                <h6>{blog.title}</h6>

                <p className="small text-muted">
                  {blog.content.substring(0, 100)}...
                </p>

                <div className="d-flex justify-content-between">

                  <span>👁 {blog.views}</span>

                  <span>❤️ {blog.likes}</span>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* FOCUS BLOG VIEW */}
      {activeBlog && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >

          <div className="col-lg-6 col-md-8 col-11">

            <div className="card shadow-lg">

              {/* IMAGE */}
              <img
                src={`${IMAGE_BASE_URL}/${activeBlog.image}`}
                className="card-img-top"
                style={{ height: "280px", objectFit: "cover" }}
                alt="blog"
              />

              {/* SCROLLABLE CONTENT */}
              <div
                className="card-body overflow-auto"
                style={{ maxHeight: "60vh" }}
              >

                <h5 className="fw-bold">
                  {activeBlog.title}
                </h5>

                <p className="text-muted">
                  {activeBlog.content}
                </p>

                <div className="d-flex justify-content-between align-items-center">

                  <span>👁 {activeBlog.views}</span>

                  <button
                    onClick={() => likeBlog(activeBlog._id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    ❤️ {activeBlog.likes}
                  </button>

                </div>

                <div className="text-end mt-3">

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={closeBlog}
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default BlogPage;
