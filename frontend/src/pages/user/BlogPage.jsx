import { useEffect, useState } from "react";
import api, { IMAGE_BASE_URL } from "../../api/api";

const BlogPage = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    const res = await api.get("/blogs");
    setBlogs(res.data);
  };

  // ================= VIEW BLOG =================
  const viewBlog = async (id) => {

    const viewedBlogs =
      JSON.parse(localStorage.getItem("viewedBlogs")) || [];

    // prevent multiple view count
    if (viewedBlogs.includes(id)) {
      return;
    }

    try {

      await api.get(`/blogs/${id}`); // increments views

      viewedBlogs.push(id);
      localStorage.setItem("viewedBlogs", JSON.stringify(viewedBlogs));

      fetchBlogs();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= LIKE BLOG =================
  const likeBlog = async (id) => {

    const likedBlogs =
      JSON.parse(localStorage.getItem("likedBlogs")) || [];

    // prevent multiple likes
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

  return (
    <div className="container py-4">

      <h4 className="mb-4">Blogs</h4>

      <div className="row">

        {blogs.map(blog => (

          <div key={blog._id} className="col-md-4 mb-3">

            <div
              className="card shadow h-100"
              style={{ cursor: "pointer" }}
              onClick={() => viewBlog(blog._id)}
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

                <p className="small">
                  {blog.content.substring(0, 100)}...
                </p>

                <div className="d-flex justify-content-between align-items-center">

                  <span>👁 {blog.views}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering view click
                      likeBlog(blog._id);
                    }}
                    className="btn btn-outline-danger btn-sm"
                  >
                    ❤️ {blog.likes}
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default BlogPage;
