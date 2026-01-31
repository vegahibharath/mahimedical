import { useEffect, useState } from "react";
import api, { IMAGE_BASE_URL } from "../../api/api";

const GalleryPage = () => {

  const [gallery, setGallery] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get("/gallery").then(res => setGallery(res.data));
  }, []);

  return (
    <div className="container py-4">

      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="fw-bold">Gallery</h3>
        <p className="text-muted">Our latest moments</p>
      </div>

      {/* Gallery Grid */}
      <div className="row g-4">

        {gallery.map(img => (

          <div key={img._id} className="col-lg-3 col-md-4 col-sm-6">

            <div
              className="card h-100 shadow-sm border-0"
              role="button"
              onClick={() => setLightbox(`${IMAGE_BASE_URL}/${img.image}`)}
            >

              {/* Image */}
              <img
                src={`${IMAGE_BASE_URL}/${img.image}`}
                className="card-img-top img-fluid"
                alt=""
                style={{ height: "180px", objectFit: "cover" }}
              />

              {/* Content */}
              <div className="card-body text-center">

                <h6 className="card-title mb-1 text-truncate">
                  {img.title}
                </h6>

                <small className="text-muted text-truncate d-block">
                  {img.description}
                </small>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bootstrap Lightbox Style */}
      {lightbox && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
          onClick={() => setLightbox(null)}
        >

          <div className="bg-white p-3 rounded shadow">

            <img
              src={lightbox}
              className="img-fluid rounded"
              style={{ maxHeight: "80vh" }}
              alt=""
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default GalleryPage;
