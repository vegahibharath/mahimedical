import { useEffect, useState } from "react";
import api,{IMAGE_BASE_URL} from "../../api/api";

const Therapists = () => {
 const [therapists, setTherapists] = useState([]);
const [loading, setLoading] = useState(true);
const [editData, setEditData] = useState(null);
const [image, setImage] = useState(null);   // ✅ REQUIRED
const [viewData, setViewData] = useState(null);

  // Fetch therapists
  const fetchTherapists = () => {
    api.get("/therapists/all").then((res) => {
      setTherapists(res.data.therapists);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  // Delete therapist
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this therapist?")) {
      return;
    }

    try {
      await api.delete(`/therapists/delete/${id}`);
      setTherapists((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete therapist");
    }
  };

  // Update therapist
  const handleUpdate = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  const allowedFields = [
    "name",
    "specialization",
    "bio",
    "contact",
    "qualification",
    "additionalInformation",
    "practicingDetails",
    "address",
  ];

  allowedFields.forEach((field) => {
    if (editData[field]) {
      formData.append(field, editData[field]);
    }
  });

  if (image) {
    formData.append("image", image);
  }

  try {
    const res = await api.put(
      `/therapists/update/${editData._id}`,
      formData
    );

    // instant UI update
    setTherapists((prev) =>
      prev.map((t) =>
        t._id === editData._id ? res.data.therapist : t
      )
    );

    setEditData(null);
    setImage(null);
  } catch (err) {
    alert("Update failed");
  }
};


  if (loading) {
    return <div className="text-center mt-5">Loading therapists...</div>;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Therapists</h4>

      <div className="row">
        {therapists.map((t) => (
          <div key={t._id} className="col-md-4 mb-4">
            <div className="card shadow h-100">

             <img
  src={`${IMAGE_BASE_URL}/${t.image}?v=${t.updatedAt || Date.now()}`}
  className="card-img-top"
  alt={t.name}
  style={{ height: "220px", objectFit: "cover" }}
/>


              <div className="card-body">
                <h5>{t.name}</h5>
                <p className="text-muted">{t.specialization}</p>
                <p>{t.bio?.slice(0, 80)}...</p>
                <p className="small">📞 {t.contact}</p>
                <p className="small">🎓 {t.qualification}</p>
              </div>
              <div className="card-footer bg-white">
  <button
    className="btn btn-sm btn-info mr-2"
    onClick={() => setViewData(t)}
  >
    View
  </button>

  <button
    className="btn btn-sm btn-primary mr-2"
    onClick={() => setEditData(t)}
  >
    Edit
  </button>

  <button
    className="btn btn-sm btn-danger"
    onClick={() => handleDelete(t._id)}
  >
    Delete
  </button>
</div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editData && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5>Edit Therapist</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setEditData(null)}
                  >
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    value={editData.specialization}
                    onChange={(e) =>
                      setEditData({ ...editData, specialization: e.target.value })
                    }
                  />
                  <textarea
                    className="form-control mb-2"
                    value={editData.bio}
                    onChange={(e) =>
                      setEditData({ ...editData, bio: e.target.value })
                    }
                  />
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <small className="text-muted">
                    Leave empty to keep existing image
                  </small>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button"
                    onClick={() => setEditData(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Update
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
      {/* THERAPISTS SECTION */}
{/* VIEW MODAL */}
{viewData && (
  <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">

        <div className="modal-header">
          <h5>{viewData.name}</h5>
          <button
            type="button"
            className="close"
            onClick={() => setViewData(null)}
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
      <img
  src={`${IMAGE_BASE_URL}/${viewData.image}?v=${viewData.updatedAt || Date.now()}`}
  className="img-fluid mb-3"
  alt={viewData.name}
/>

          <p><strong>Specialization:</strong> {viewData.specialization}</p>
          <p><strong>Bio:</strong> {viewData.bio}</p>
          <p><strong>Contact:</strong> {viewData.contact}</p>
          <p><strong>Qualification:</strong> {viewData.qualification}</p>

          <p>
            <strong>Practicing Details:</strong><br />
            {viewData.practicingDetails || "N/A"}
          </p>

          <p>
            <strong>Additional Information:</strong><br />
            {viewData.additionalInformation || "N/A"}
          </p>

          <p>
            <strong>Address:</strong><br />
            {viewData.address}
          </p>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setViewData(null)}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </div>
)}


    </div>
  );
};
    
export default Therapists;
