import { useEffect, useState } from "react";
import api from "../../src/api/api";
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

const BlogManager = () => {
  /* ================= STATES ================= */
  const [title, setTitle] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // Edit modal states
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  /* ================= CREATE EDITOR ================= */
 /* ================= EDIT EDITOR ================= */
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      image: false,   // 🔥 REQUIRED
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
      placeholder: "Start writing your blog...",
    }),
    CustomImageExtension,
  ],
});

const editEditor = useEditor({
  extensions: [
    StarterKit.configure({
      link: {
        openOnClick: false,
      },
    }),
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
    Subscript,
    Superscript,
    TextAlign.configure({
      types: ["heading", "paragraph", "image"],
    }),
    Placeholder.configure({
      placeholder: "Edit your blog...",
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
    const imageUrl = `http://localhost:5000${res.data.url}`;
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


  /* ================= OPEN EDIT MODAL ================= */
 const openEditModal = (blog) => {
  setEditId(blog._id);
  setEditTitle(blog.title);

  if (editEditor && blog.textContent) {
    editEditor.commands.setContent(JSON.parse(blog.textContent));
  }
};

  /* ================= UPDATE BLOG ================= */
  const updateBlog = async () => {
    await api.put(`/blogs/${editId}`, {
      title: editTitle,
      textContent: JSON.stringify(editEditor.getJSON()),
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

  /* ================= RENDER ================= */
  return (
    <div className="container">
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
            <EditorContent editor={editor} className="tiptap-editor mb-3" />
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
  className="blog-preview"
  dangerouslySetInnerHTML={{
    __html: blog.textContent
      ? generateHTML(JSON.parse(blog.textContent), [
  StarterKit.configure({ image: false }),
  CustomImageExtension,
])

      : "",
  }}
/>


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
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5>Edit Blog</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-3"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              {editEditor && (
                <>
                  <MenuBar
                    editor={editEditor}
                    onImageUpload={() => handleImageUpload(editEditor)}
                  />
                  <EditorContent editor={editEditor} className="tiptap-editor" />
                </>
              )}
            </div>

            <div className="modal-footer">
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
