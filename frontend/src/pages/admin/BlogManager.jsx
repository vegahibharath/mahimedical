import { useEffect, useState } from "react";
  import { generateHTML } from "@tiptap/html";
 
 
  /* TipTap */
  import { useEditor, EditorContent } from "@tiptap/react";
  import StarterKit from "@tiptap/starter-kit";
  import { TextStyle } from "@tiptap/extension-text-style";
  import { Color } from "@tiptap/extension-color";
  import { TextAlign } from "@tiptap/extension-text-align";
  import { Highlight } from "@tiptap/extension-highlight";
  import { Subscript } from "@tiptap/extension-subscript";
  import { Superscript } from "@tiptap/extension-superscript";
  import { Placeholder } from "@tiptap/extension-placeholder";
 
  /* Custom */
  import CustomImageExtension from "./ImageExtension";
  import MenuBar from "./MenuBar";
import api,{IMAGE_BASE_URL} from "../../api/api";
 
  const BlogManager = () => {
    /* ================= STATES ================= */
    const [title, setTitle] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [viewBlog, setViewBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
 
    // Edit modal states
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
 
    /* ================= CREATE EDITOR ================= */
  /* ================= EDIT EDITOR ================= */
const editor = useEditor({
  immediatelyRender: false,
  extensions: [

      StarterKit.configure({
        image: false,
        link: { openOnClick: false },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph", "customImage"],
      }),
      Placeholder.configure({
        placeholder: "Write blog...",
      }),
      CustomImageExtension,
    ],
    content: "",
  });
 
 
 
    /* ================= FETCH BLOGS ================= */
    useEffect(() => {
      fetchBlogs();
    }, []);
 
    const fetchBlogs = async () => {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    };
 
    /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (editorInstance) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
 
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
 
      console.log("📸 Selected file:", file);
 
      const formData = new FormData();
      formData.append("file", file);
 
      const res = await api.post("/blogs/upload-image", formData);
     const imageUrl =
  IMAGE_BASE_URL === "/"
    ? res.data.url.startsWith("http")
      ? res.data.url
      : `/${res.data.url.replace(/^\/+/, "")}`
    : `${IMAGE_BASE_URL.replace(/\/$/, "")}/${res.data.url.replace(/^\/+/, "")}`;
 
      console.log("✅ Upload API response:", res.data);
 
      editorInstance
        .chain()
        .focus()
        .insertContent({
          type: "customImage",
          attrs: {
            src: imageUrl,
          },
        })
        .run();
 
      console.log("🧠 Editor JSON after image insert:", editorInstance.getJSON());
    };
  };
 
  const getBlogHTML = (blog) => {
    try {
      if (!blog?.textContent) return "";
      const content =
        typeof blog.textContent === "string"
          ? JSON.parse(blog.textContent)
          : blog.textContent;
 
     generateHTML(JSON.parse(blog.textContent), [
  StarterKit.configure({ image: false }),
  TextStyle,
  Color,
  Highlight,
  Subscript,
  Superscript,
  CustomImageExtension.configure({
    inline: false,
  }),
])

    } catch (err) {
      console.error("❌ Blog render error:", err);
      return "<p>Error loading blog</p>";
    }
  };
 
    /* ================= CREATE BLOG ================= */
  const submitBlog = async (e) => {
    e.preventDefault();
 
    const json = editor.getJSON();
 
    console.log("📦 Blog JSON before save:", json);
 
    await api.post("/blogs", {
      title,
      textContent: JSON.stringify(json),
    });
 
    console.log("✅ Blog saved");
 
    setTitle("");
    editor.commands.clearContent();
    fetchBlogs();
  };
 
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditId(null);
    if (editor) editor.commands.clearContent();
  };
 
 
    /* ================= OPEN EDIT MODAL ================= */
  const openEditModal = (blog) => {
    setEditId(blog._id);
    setEditTitle(blog.title);
 
   if (editor && blog.textContent) {
  try {
    editor.commands.setContent(JSON.parse(blog.textContent));
  } catch (err) {
    console.warn("Invalid TipTap JSON:", err);
  }
}

   
    setShowEditModal(true);
  };
 
 
    /* ================= UPDATE BLOG ================= */
    const updateBlog = async () => {
      await api.put(`/blogs/${editId}`, {
        title: editTitle,
    textContent: JSON.stringify(editor.getJSON()),
 
      });
 
      setEditId(null);
      fetchBlogs();
    };
 
    /* ================= DELETE BLOG ================= */
    const deleteBlog = async (id) => {
      if (!window.confirm("Delete blog?")) return;
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
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
 
 
  const style = `
  .blog-full-content {
    max-width: 100%;
    overflow-x: hidden;
    word-break: break-word;
    line-height: 1.6;
  }
 
  /* paragraphs */
  .blog-full-content p {
    margin-bottom: 1rem;
  }
 
  /* base image */
  .blog-full-content img {
    max-width: 100%;
    height: auto;
  }
 
  .blog-full-content .custom-image-wrapper[data-layout="wrap-left"] {
    float: left;
    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 16px;
    margin-left: 0;
  }
 
  .blog-full-content .custom-image-wrapper[data-layout="wrap-right"] {
    float: right;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 16px;
    margin-left: 16px;
  }
 
 
  /* keep width from editor */
  .blog-full-content .custom-image-wrapper img {
    width: auto;
    max-width: 100%;
  }
 
  /* clear floats after content */
  .blog-full-content::after {
    content: "";
    display: block;
    clear: both;
  }
 
  .modal-body {
    overflow-x: hidden;
  }
    /* Outer editor box */
.tiptap-editor {
  border: 1px solid #ced4da;
  border-radius: 6px;
  background: #fff;
}
 
/* Actual editable area */
.tiptap-editor .ProseMirror {
  min-height: 220px;
  padding: 14px;
  outline: none;
  line-height: 1.6;
  word-break: break-word;
}
 
/* Focus state */
.tiptap-editor:focus-within {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.15rem rgba(13,110,253,.25);
}
\/* CENTER IMAGE — FINAL FIX */
.custom-image-wrapper[data-layout="center"] {
  display: block;
  float: none !important;
  clear: both;
  width: fit-content;
  max-width: 100%;
  margin: 16px auto;
  text-align: center;
}
 
.custom-image-wrapper[data-layout="center"] img {
  display: block;
  margin: 0 auto;
}
.custom-image-wrapper[data-position="absolute"][data-z="-1"] {
  position: absolute;
  z-index: -1;
  opacity: 0.4;
  pointer-events: none;
}
 
.ProseMirror {
  position: relative;
}
 
  `;
 
 
 
    /* ================= RENDER ================= */
    return (
      <div className="container">
          <style>{style}</style>
        <h4 className="mb-3">Blog Manager</h4>
 
        {/* ================= CREATE BLOG ================= */}
        <form onSubmit={submitBlog} className="mb-4">
          <input
            className="form-control mb-3"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
 
        {editor && (
    <>
      <MenuBar
        editor={editor}
        onImageUpload={() => handleImageUpload(editor)}
      />
      <label className="fw-bold mb-2">Blog Content</label>
  <EditorContent editor={editor} className="tiptap-editor" />
 
    </>
  )}
 
 
          <button className="btn btn-primary">Publish Blog</button>
        </form>
 
        {/* ================= BLOG CARDS ================= */}
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div className="card shadow h-100 p-3">
 
                <h5>{blog.title}</h5>
 
              <div
    className="blog-preview mb-2"
    style={{
      maxHeight: "120px",
      overflow: "hidden",
    }}  
    dangerouslySetInnerHTML={{
      __html: blog.textContent
        ? generateHTML(JSON.parse(blog.textContent), [
    StarterKit.configure({
      image: false,
    }),
    CustomImageExtension.configure({
      inline: false,
    }),
  ])
 
        : "",
    }}
  />
 
 
 
                <div className="d-flex justify-content-between mb-2">
              <button
  className="btn btn-link p-0 text-danger"
  disabled={hasLiked(blog._id)}
  onClick={() => likeBlog(blog._id)}
  style={{ opacity: hasLiked(blog._id) ? 0.5 : 1 }}
>
  ❤️ {blog.likes}
</button>
 
 
                </div>
                <button
    className="btn btn-info btn-sm w-100 mb-2"
    onClick={() => setViewBlog(blog)}
  >
    View
  </button>
 
 
  <button
    className="btn btn-warning btn-sm w-100 mb-2"
   
    onClick={() => openEditModal(blog)}
  >
    Edit
  </button>
 
  <button
    className="btn btn-danger btn-sm w-100"
    onClick={() => deleteBlog(blog._id)}
  >
    Delete
  </button>
 
              </div>
            </div>
          ))}
        </div>
 
        {/* ================= EDIT MODAL ================= */}
    {showEditModal && (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
 
          <div className="modal-header">
            <h5>Edit Blog</h5>
            <button
              className="btn-close"
              onClick={closeEditModal}
            />
          </div>
 
          <div className="modal-body">
            <input
              className="form-control mb-3"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
 
            {editor && (
              <>
                <MenuBar
                  editor={editor}
                  onImageUpload={() => handleImageUpload(editor)}
                />
                <EditorContent
                  editor={editor}
                  className="tiptap-editor"
                />
              </>
            )}
          </div>
 
          <div className="modal-footer">
            <button
              className="btn btn-success"
              onClick={() => {
                updateBlog();
                closeEditModal();
              }}
            >
              Save Changes
            </button>
          </div>
 
        </div>
      </div>
    </div>
  )}
 
  {viewBlog && (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
 
          <div className="modal-header">
            <h5 className="modal-title">{viewBlog.title}</h5>
            <button
              className="btn-close"
              onClick={() => setViewBlog(null)}
            ></button>
          </div>
 
          <div className="modal-body">
            <div
              className="blog-full-content"
              dangerouslySetInnerHTML={{
                __html: getBlogHTML(viewBlog),
              }}
            />
          </div>
 
        </div>
      </div>
    </div>
  )}
 
      </div>
     
    );
  };
 
  export default BlogManager;
 