import { useEffect, useState } from "react";
import api, { IMAGE_BASE_URL } from "../../api/api";

const GalleryPage = () => {

  const [gallery, setGallery] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get("/gallery")
      .then(res => setGallery(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-4">

      {/* TITLE */}
      <div className="text-center mb-4">
        <h3 className="fw-bold">Gallery</h3>
        <p className="text-muted">Our latest moments</p>
      </div>

      {/* GALLERY GRID */}
      <div className="row g-4">

        {gallery.map((img) => (

          <div key={img._id} className="col-lg-3 col-md-4 col-sm-6">

            <div
              className="card h-100 shadow-sm border-0"
              role="button"
              onClick={() => setLightbox(`${IMAGE_BASE_URL}/${img.image}`)}
            >

              <img
                src={`${IMAGE_BASE_URL}/${img.image}`}
                className="card-img-top img-fluid"
                alt={img.title}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h6 className="mb-1 text-truncate">{img.title}</h6>
                <small className="text-muted text-truncate d-block">
                  {img.description}
                </small>
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* LIGHTBOX */}
      {lightbox && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
          onClick={() => setLightbox(null)}   // CLICK OUTSIDE CLOSE
        >

          {/* STOP CLICK BUBBLE */}
          <div
            className="position-relative bg-white p-3 rounded shadow"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute",
                top: "-12px",
                right: "-12px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={lightbox}
              className="img-fluid rounded"
              style={{ maxHeight: "80vh" }}
              alt="Preview"
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default GalleryPage;
