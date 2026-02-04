import { useEffect, useState } from "react";
import api from "../../api/api";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import CustomImageExtension from "../admin/ImageExtension";
import { TextAlign } from "@tiptap/extension-text-align";

const ImageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    loadImageBlogs();
  }, []);

  const loadImageBlogs = async () => {
    const res = await api.get("/blogs");

    const imageBlogs = res.data.filter((blog) => {
      if (!blog.textContent) return false;

      const content =
        typeof blog.textContent === "string"
          ? JSON.parse(blog.textContent)
          : blog.textContent;

      return content.content?.some(
        (node) => node.type === "customImage"
      );
    });

    setBlogs(imageBlogs);
  };

  const renderBlog = (blog) => {
    return generateHTML(
      typeof blog.textContent === "string"
        ? JSON.parse(blog.textContent)
        : blog.textContent,
      [
        StarterKit.configure({ image: false }),
        CustomImageExtension,
        TextAlign.configure({
          types: ["heading", "paragraph", "customImage"],
        }),
      ]
    );
  };

  const hasLiked = (id) => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
    return likedBlogs.includes(id);
  };

  const markLiked = (id) => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
    localStorage.setItem("likedBlogs", JSON.stringify([...likedBlogs, id]));
  };

  const likeBlog = async (id) => {
    if (hasLiked(id)) {
      alert("You already liked this blog ❤️");
      return;
    }

    const res = await api.post(`/blogs/${id}/like`);
    setBlogs((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, likes: res.data.likes } : b
      )
    );
    markLiked(id);
  };

  return (
    <div className="container">

      {/* ✅ INTERNAL CSS – CORRECT PLACE */}
    <style>
{`
/* ===== BLOG CONTENT SAFETY ===== */
.blog-full-content {
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
  line-height: 1.6;
}

.blog-full-content * {
  max-width: 100%;
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* ===== IMAGES ===== */
.blog-full-content img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ===== CLEAR FLOATS ===== */
.blog-full-content::after {
  content: "";
  display: block;
  clear: both;
}

/* ===== IMAGE LAYOUTS (CRITICAL FIX) ===== */

/* center */
.blog-full-content .custom-image-wrapper[data-layout="center"] {
  display: block;
  float: none !important;
  clear: both;
  margin: 16px auto;
  width: fit-content;
  max-width: 100%;
  text-align: center;
}

/* wrap left */
.blog-full-content .custom-image-wrapper[data-layout="wrap-left"] {
  float: left;
  margin: 0 16px 16px 0;
  max-width: 50%;
}

/* wrap right */
.blog-full-content .custom-image-wrapper[data-layout="wrap-right"] {
  float: right;
  margin: 0 0 16px 16px;
  max-width: 50%;
}

/* keep image inside wrapper */
.blog-full-content .custom-image-wrapper img {
  width: auto;
  max-width: 100%;
}

/* ===== MODAL SAFETY ===== */
.modal-content,
.modal-body {
  max-width: 100%;
  overflow-x: hidden;
}
`}
</style>


      <h4 className="mb-4">📸 Blogs With Images</h4>

      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card h-100 shadow">
              <div className="card-body d-flex flex-column">
                <h5>{blog.title}</h5>

                <div
                  className="text-muted mb-3"
                  style={{ maxHeight: "80px", overflow: "hidden" }}
                  dangerouslySetInnerHTML={{
                    __html: renderBlog(blog),
                  }}
                />

                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-link p-0 text-danger"
                    disabled={hasLiked(blog._id)}
                    onClick={() => likeBlog(blog._id)}
                  >
                    ❤️ {blog.likes}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {selectedBlog && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setSelectedBlog(null)}
          />

          <div
            className="modal fade show d-block"
            onClick={() => setSelectedBlog(null)}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
              style={{ maxWidth: "90vw" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{selectedBlog.title}</h5>
                  <button
                    className="btn-close"
                    onClick={() => setSelectedBlog(null)}
                  />
                </div>

                <div className="modal-body">
                  <div
                    className="blog-full-content"
                    dangerouslySetInnerHTML={{
                      __html: renderBlog(selectedBlog),
                    }}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedBlog(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageBlogs;
