import { useEffect, useState } from "react";
import api,{IMAGE_BASE_URL} from "../../api/api";

const GalleryPage = () => {

  const [gallery, setGallery] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get("/gallery").then(res => setGallery(res.data));
  }, []);

  return (
    <div className="container py-4">

      <h4 className="mb-4">Gallery</h4>

      <div className="row">

        {gallery.map(img => (

          <div key={img._id} className="col-md-3 col-6 mb-3">

            <img
              src={`${IMAGE_BASE_URL}/${img.image}`}
              className="img-fluid shadow"
              style={{ height: "150px", objectFit: "cover", cursor: "pointer" }}
              alt=""
              onClick={() => setLightbox(`${IMAGE_BASE_URL}/${img.image}`)}
            />
            <p>{img.title}</p>
              <p>{img.description}</p>


          </div>

        ))}

      </div>

      {lightbox && (

        <div
          className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ top: 0, left: 0, background: "rgba(0,0,0,0.7)" }}
          onClick={() => setLightbox(null)}
        >

          <img src={lightbox} className="img-fluid" alt="" />

        </div>

      )}

    </div>
  );
};

export default GalleryPage;
