import { useEffect, useState } from "react";
import api, { IMAGE_BASE_URL } from "../../api/api";

const GalleryManager = () => {

  // CREATE STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // VIEW STATE
  const [viewItem, setViewItem] = useState(null);

  // EDIT STATES
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  // ================= FETCH =================
  const fetchGallery = async () => {
    const res = await api.get("/gallery");
    setGallery(res.data);
  };

  // ================= CREATE =================
  const uploadImage = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    await api.post("/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Image uploaded");

    setTitle("");
    setDescription("");
    setImage(null);

    fetchGallery();
  };

  // ================= OPEN EDIT =================
  const openEditModal = (item) => {

    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setOldImage(item.image);
    setEditImage(null);
  };

  // ================= UPDATE =================
  const updateGallery = async () => {

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);

    if (editImage) {
      formData.append("image", editImage);
    }

    await api.put(`/gallery/${editId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Gallery updated");

    setEditId(null);
    fetchGallery();
  };

  // ================= DELETE =================
  const deleteImage = async (id) => {

    if (!window.confirm("Delete image?")) return;

    await api.delete(`/gallery/${id}`);
    fetchGallery();
  };

  return (
    <div className="container">

      <h4 className="mb-3">Gallery Manager</h4>

      {/* ================= CREATE ================= */}

      <form onSubmit={uploadImage} className="mb-4">

        <input
          className="form-control mb-2"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="btn btn-primary">
          Upload Image
        </button>

      </form>

      {/* ================= GALLERY CARDS ================= */}

      <div className="row">

        {gallery.map(item => (

          <div key={item._id} className="col-md-3 mb-4">

            <div className="card shadow h-100">

              <img
                src={`${IMAGE_BASE_URL}/${item.image}`}
                className="card-img-top"
                height="180"
                style={{ objectFit: "cover" }}
                alt="gallery"
              />

              <div className="card-body text-center">

                <h6 className="text-truncate">
                  {item.title}
                </h6>

               <p
  className="small"
  style={{
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  }}
>
  {item.description}
</p>


                {/* VIEW */}
                <button
                  className="btn btn-info btn-sm mb-2 w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#viewGalleryModal"
                  onClick={() => setViewItem(item)}
                >
                  View
                </button>

                {/* EDIT */}
                <button
                  className="btn btn-warning btn-sm mb-2 w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#editGalleryModal"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteImage(item._id)}
                  className="btn btn-danger btn-sm w-100"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ================= VIEW MODAL ================= */}

      <div
        className="modal fade"
        id="viewGalleryModal"
        tabIndex="-1"
      >

        <div className="modal-dialog modal-lg modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                {viewItem?.title}
              </h5>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            <div className="modal-body text-center">

              <img
                src={`${IMAGE_BASE_URL}/${viewItem?.image}`}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "60vh" }}
                alt=""
              />

              <p className="text-muted">
                {viewItem?.description}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= EDIT MODAL ================= */}

      <div
        className="modal fade"
        id="editGalleryModal"
        tabIndex="-1"
      >

        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">
              <h5>Edit Gallery Item</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">

              <input
                className="form-control mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                className="form-control mb-2"
                rows="2"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <p className="mb-1">Current Image:</p>

              <img
                src={`${IMAGE_BASE_URL}/${oldImage}`}
                className="w-100 mb-2"
                height="150"
                style={{ objectFit: "cover" }}
                alt=""
              />

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
                onClick={updateGallery}
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

export default GalleryManager;
