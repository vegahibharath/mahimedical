import { useEffect, useState } from "react";
import api from "../../api/api";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import CustomImageExtension from "../admin/ImageExtension";
import { TextAlign } from "@tiptap/extension-text-align";

const ImageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

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
      JSON.parse(blog.textContent),
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

  try {
    const res = await api.post(`/blogs/${id}/like`);

    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === id
          ? { ...blog, likes: res.data.likes }
          : blog
      )
    );

    markLiked(id); // 👈 save locally
  } catch (err) {
    console.error("❌ Like failed:", err);
  }
};
  return (
    <div className="container">
      <h4 className="mb-4">📸 Blogs With Images</h4>

      {blogs.map((blog) => (
        <div key={blog._id} className="card mb-4 p-3 shadow">
          <h5>{blog.title}</h5>

          <div
            className="blog-full-content"
            dangerouslySetInnerHTML={{
              __html: renderBlog(blog),
            }}
          />
   <button
  className="btn btn-link p-0 text-danger"
  disabled={hasLiked(blog._id)}
  onClick={() => likeBlog(blog._id)}
  style={{ opacity: hasLiked(blog._id) ? 0.5 : 1 }}
>
  ❤️ {blog.likes}
</button>
        </div>
      ))}
    </div>
  );
};

export default ImageBlogs;
