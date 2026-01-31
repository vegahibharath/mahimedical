<<<<<<< HEAD
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
=======
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>

      {/* ================= HERO SLIDER ================= */}

      <div
        id="physioCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >

        {/* INDICATORS */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#physioCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#physioCarousel"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#physioCarousel"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* SLIDES */}
        <div className="carousel-inner">

          {/* SLIDE 1 */}
          <div className="carousel-item active">
            <div className="position-relative">

              <img
                src="therapy3.jpg"
                className="d-block w-100"
                alt="Physiotherapy Clinic"
                style={{
                  height: "85vh",
                  objectFit: "cover"
                }}
              />

              {/* Overlay */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.2))"
                }}
              ></div>

              {/* Caption */}
              <div className="carousel-caption text-start">
                <h1 className="fw-bold">
                  Jagruthi Physiotherapy Clinic
                </h1>

                <p className="fs-5">
                  Trusted Care For Pain Relief & Mobility Recovery
                </p>

                 <button className="btn btn-primary px-4 py-2 mt-2">
                 Therapist
                </button> 
              </div>

            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="carousel-item">
            <div className="position-relative">

              <img
                src="therapy2.jpg"
                className="d-block w-100"
                alt="Rehabilitation Therapy"
                style={{
                  height: "85vh",
                  objectFit: "cover"
                }}
              />

              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.2))"
                }}
              ></div>

              <div className="carousel-caption text-start">
                <h1 className="fw-bold">
                  Advanced Rehabilitation Programs
                </h1>

                <p className="fs-5">
                  Personalized Therapy For Faster Recovery
                </p>

                {/* <button className="btn btn-outline-light px-4 py-2 mt-2">
                  View Services
                </button> */}
              </div>

            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="carousel-item">
            <div className="position-relative">

              <img
                src="therapy.jpg"
                className="d-block w-100"
                alt="Sports Physiotherapy"
                style={{
                  height: "85vh",
                  objectFit: "cover"
                }}
              />

              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.2))"
                }}
              ></div>

              <div className="carousel-caption text-start">
                <h1 className="fw-bold">
                  Sports Injury & Post Surgery Care
                </h1>

                <p className="fs-5">
                  Restore Strength. Improve Performance.
                </p>

              <Link to="/contact" className="btn btn-primary px-4 py-2 mt-2">
  Contact Now
</Link>

              </div>

            </div>
          </div>

        </div>

        {/* CONTROLS */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#physioCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#physioCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

      {/* ================= HERO CONTENT SECTION ================= */}

      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #e3f2fd, #ffffff)"
        }}
      >

        <div className="container">

          <div className="row align-items-center">

            {/* LEFT CONTENT */}
            <div className="col-md-6 mb-4">

              <span className="badge bg-primary px-3 py-2 mb-3">
                Jagruthi Physiotherapy Clinic
              </span>

              <h2 className="fw-bold text-primary mt-3">
                Professional Physiotherapy Care
              </h2>

              <p className="text-muted mt-3">
                We provide personalized physiotherapy treatments focused on pain
                management, injury recovery, posture correction, and rehabilitation.
                Our mission is to restore movement and improve quality of life
                through safe and effective therapy programs.
              </p>

            </div>

            {/* RIGHT BOX */}
            <div className="col-md-6">

              <div className="bg-white p-4 rounded shadow">

                <h5 className="fw-bold text-primary mb-3">
                  Our Treatment Focus
                </h5>

                <ul className="list-unstyled mb-0">

                  <li className="mb-2">✔ Orthopedic Physiotherapy</li>
                  <li className="mb-2">✔ Sports Injury Rehabilitation</li>
                  <li className="mb-2">✔ Neurological Rehabilitation</li>
                  <li className="mb-2">✔ Back Pain & Posture Correction</li>
                  <li className="mb-2">✔ Post Surgery Recovery Care</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>

>>>>>>> origin/sruthi
    </div>
  );
};

export default Home;
