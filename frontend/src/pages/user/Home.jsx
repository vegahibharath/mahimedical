import React, { useEffect, useState } from "react";
import api,{IMAGE_BASE_URL} from "../../api/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [lightbox, setLightbox] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  const images = [
    "https://via.placeholder.com/400",
    "https://via.placeholder.com/401",
    "https://via.placeholder.com/402",
    "https://via.placeholder.com/403",
  ];

  // 🔹 Fetch therapists ON PAGE LOAD
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await api.get("/therapists/userall");
        setTherapists(res.data.therapists);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  // 🔹 Scroll to therapists section
  const scrollToTherapists = () => {
    document
      .getElementById("therapists-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f8f9fa" }}>
      {/* HEADER */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "#0056b3" }}
      >
        <a className="navbar-brand font-weight-bold" href="/">
          Mahi Medical
        </a>
        <div className="ml-auto">
          <span className="text-white mx-2">Home</span>
          <span
            className="text-white mx-2"
            style={{ cursor: "pointer" }}
            onClick={scrollToTherapists}
          >
            Therapists
          </span>
<span
  className="text-white mx-2"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/blogs/images")}
>
  Blogs
</span>

          <span className="text-white mx-2">Contact</span>
        </div>
      </nav>
      {/* HERO */}
      <div className="container text-center py-5">
        <h2 className="font-weight-bold text-primary">
          Compassionate Care. Trusted Professionals.
        </h2>
        <p className="text-muted mt-2">
          Connecting patients with experienced medical experts.
        </p>
        <button className="btn btn-primary mt-3" onClick={scrollToTherapists}>
          View Therapists
        </button>
      </div>

      {/* THERAPISTS SECTION (ALWAYS PRESENT) */}
      <div className="container py-5" id="therapists-section">
        <h4 className="text-center mb-4">Our Therapists</h4>

        {loading ? (
          <div className="text-center">Loading therapists...</div>
        ) : (
          <div className="row">
            {therapists.map((t) => (
              <div key={t._id} className="col-md-4 mb-4">
                <div className="card shadow h-100">

                  <img
                    src={`${IMAGE_BASE_URL}/${t.image}`}
                    className="card-img-top"
                    alt={t.name}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center">
                    <h5>{t.name}</h5>
                    <p className="text-muted">{t.specialization}</p>
                    <p>{t.bio?.slice(0, 100)}...</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GALLERY */}
      <div className="container py-4">
        <h4 className="text-center mb-4">Gallery</h4>
        <div className="row">
          {images.map((img, i) => (
            <div key={i} className="col-md-3 col-6 mb-3">
              <img
                src={img}
                alt=""
                className="img-fluid shadow"
                style={{ cursor: "pointer" }}
                onClick={() => setLightbox(img)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ top: 0, left: 0, background: "rgba(0,0,0,0.7)" }}
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="img-fluid" />
        </div>
      )}

      {/* CONTACT US */}
      <div className="container py-5">
        <h4 className="text-center mb-4">Contact Us</h4>
        <div className="row shadow bg-white p-4">
          <div className="col-md-6">
            <input className="form-control mb-3" placeholder="Name" />
            <input className="form-control mb-3" placeholder="Email" />
            <textarea className="form-control mb-3" placeholder="Message" />
            <button className="btn btn-primary">Submit</button>
          </div>
          <div className="col-md-6">
            <iframe
              title="map"
              width="100%"
              height="250"
              frameBorder="0"
              src="https://maps.google.com/maps?q=india&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className="text-white text-center py-3"
        style={{ background: "#0056b3" }}
      >
        © 2026 Mahi Medical
      </footer>
    </div>
  );
};

export default Home;
