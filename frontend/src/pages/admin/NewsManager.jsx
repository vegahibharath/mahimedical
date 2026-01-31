import { useEffect, useState } from "react";
import api from "../../api/api";

const NewsManager = () => {

  // Create states
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [news, setNews] = useState([]);
const [viewNews, setViewNews] = useState(null);

  // Edit modal states
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSnippet, setEditSnippet] = useState("");
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  // ================= FETCH =================
  const fetchNews = async () => {
    const res = await api.get("/news");
    setNews(res.data);
  };

  // ================= CREATE =================
  const postNews = async (e) => {
    e.preventDefault();

    if (!title || !snippet) {
      alert("All fields required");
      return;
    }

    await api.post("/news", {
      title,
      snippet,
      postedBy: "Admin"
    });

    alert("News posted");

    setTitle("");
    setSnippet("");

    fetchNews();
  };

  // ================= OPEN EDIT MODAL =================
  const openEditModal = (n) => {

    setEditId(n._id);
    setEditTitle(n.title);
    setEditSnippet(n.snippet);
    setIsLive(n.isLive);
  };

  // ================= UPDATE =================
  const updateNews = async () => {

    await api.put(`/news/${editId}`, {
      title: editTitle,
      snippet: editSnippet,
      isLive
    });

    alert("News updated");

    setEditId(null);
    fetchNews();
  };

  // ================= DELETE =================
  const deleteNews = async (id) => {

    if (!window.confirm("Delete news?")) return;

    await api.delete(`/news/${id}`);
    fetchNews();
  };

  return (
    <div className="container">

      <h4 className="mb-3">News Manager</h4>

      {/* ================= CREATE ================= */}

      <form onSubmit={postNews} className="mb-4">

        <input
          className="form-control mb-2"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="News Snippet"
          rows="2"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
        />

        <button className="btn btn-primary">
          Post News
        </button>

      </form>

      {/* ================= NEWS CARDS ================= */}

      <div className="row">

        {news.map(n => (

          <div key={n._id} className="col-md-4 mb-4">

            <div className="card shadow h-100">

              <div className="card-body">

                <h5>{n.title}</h5>

                <div
  className="text-muted small overflow-hidden mb-2"
  style={{ height: "60px" }}
>
  {n.snippet}
</div>


                <div className="d-flex justify-content-between mb-2">
                  <span>👁 {n.views}</span>
                  <span>{n.isLive ? "🟢 Live" : "🔴 Hidden"}</span>
                </div>
<button
  className="btn btn-info btn-sm w-100 mb-2"
  data-bs-toggle="modal"
  data-bs-target="#viewNewsModal"
  onClick={() => setViewNews(n)}
>
  View
</button>

                <button
                  className="btn btn-warning btn-sm w-100 mb-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editNewsModal"
                  onClick={() => openEditModal(n)}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNews(n._id)}
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

      <div
        className="modal fade"
        id="editNewsModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5>Edit News</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

          <div
 className="modal-body overflow-auto text-break"

  style={{ maxHeight: "60vh" }}
>


              {/* TITLE */}
              <input
                className="form-control mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              {/* SNIPPET */}
              <textarea
                className="form-control mb-2"
                rows="2"
                value={editSnippet}
                onChange={(e) => setEditSnippet(e.target.value)}
              />

              {/* LIVE STATUS */}
              <select
                className="form-control"
                value={isLive}
                onChange={(e) => setIsLive(e.target.value === "true")}
              >
                <option value="true">Live</option>
                <option value="false">Hidden</option>
              </select>

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
                onClick={updateNews}
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      </div>
<div
  className="modal fade"
  id="viewNewsModal"
  tabIndex="-1"
>
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">

      <div className="modal-header">
        <h5 className="modal-title">
          {viewNews?.title}
        </h5>

        <button
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <div
        className="modal-body overflow-auto"
        style={{ maxHeight: "60vh" }}
      >

       <p className="text-muted text-break">

          {viewNews?.snippet}
        </p>

        <div className="d-flex justify-content-between mt-3">

          {/* <span>👁 {viewNews?.views}</span> */}

          <span>
            {viewNews?.isLive ? "🟢 Live" : "🔴 Hidden"}
          </span>

        </div>

      </div>

      <div className="modal-footer">

        <button
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>

      </div>

    </div>
  </div>
</div>

    </div>
  );
};

export default NewsManager;
