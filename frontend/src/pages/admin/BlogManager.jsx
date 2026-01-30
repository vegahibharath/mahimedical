import { useEffect, useState } from "react";
import api,{IMAGE_BASE_URL} from "../../api/api";

const BlogManager = () => {

  // Create states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
const [expandedId, setExpandedId] = useState(null);

  // Edit modal states
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    const res = await api.get("/blogs");
    setBlogs(res.data);
  };

  // ================= CREATE BLOG =================
  const submitBlog = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    await api.post("/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setTitle("");
    setContent("");
    setImage(null);

    fetchBlogs();
  };

  // ================= OPEN EDIT MODAL =================
  const openEditModal = (blog) => {

    setEditId(blog._id);
    setEditTitle(blog.title);
    setEditContent(blog.content);
    setOldImage(blog.image); // store old image path
    setEditImage(null);      // reset new image
  };

  // ================= UPDATE BLOG =================
  const updateBlog = async () => {

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("content", editContent);

    // Only attach new image if selected
    if (editImage) {
      formData.append("image", editImage);
    }

    await api.put(`/blogs/${editId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Blog Updated");

    setEditId(null);
    fetchBlogs();
  };

  // ================= DELETE BLOG =================
  const deleteBlog = async (id) => {

    if (!window.confirm("Delete blog?")) return;

    await api.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <div className="container">

      <h4 className="mb-3">Blog Manager</h4>

      {/* ================= CREATE BLOG ================= */}

      <form onSubmit={submitBlog} className="mb-4">

        <input
          className="form-control mb-2"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Blog Content"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="btn btn-primary">
          Publish Blog
        </button>

      </form>

      {/* ================= BLOG CARDS ================= */}

      <div className="row">

        {blogs.map(blog => (

          <div className="col-md-4 mb-4" key={blog._id}>

            <div className="card shadow h-100">

              <img
                src={`${IMAGE_BASE_URL}/${blog.image}`}
                className="card-img-top"
                height="200"
                style={{ objectFit: "cover" }}
              />

              <div className="card-body">

                <h5>{blog.title}</h5>
<p>
  {expandedId === blog._id
    ? blog.content
    : blog.content.substring(0, 100) + "..."}
</p>

<button
  className="btn btn-link p-0"
  onClick={() =>
    setExpandedId(expandedId === blog._id ? null : blog._id)
  }
>
  {expandedId === blog._id ? "Show Less" : "Read More"}
</button>


                <div className="d-flex justify-content-between mb-2">
                  <span>❤️ {blog.likes}</span>
                  <span>👁 {blog.views}</span>
                </div>

                <button
                  className="btn btn-warning btn-sm w-100 mb-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => openEditModal(blog)}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="btn btn-danger btn-sm w-100"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ================= EDIT MODAL ================= */}

      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5>Edit Blog</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">

              {/* TITLE */}
              <input
                className="form-control mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              {/* CONTENT */}
              <textarea
                className="form-control mb-2"
                rows="3"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />

              {/* OLD IMAGE PREVIEW */}
              <p className="mb-1">Current Image:</p>

              <img
                src={`${IMAGE_BASE_URL}/${oldImage}`}
                width="100%"
                height="150"
                style={{ objectFit: "cover" }}
                className="mb-2"
              />

              {/* NEW IMAGE INPUT */}
              <input
                type="file"
                className="form-control"
                onChange={(e) => setEditImage(e.target.files[0])}
              />

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={updateBlog}
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default BlogManager;
