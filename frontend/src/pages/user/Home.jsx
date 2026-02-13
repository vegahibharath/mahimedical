import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { IMAGE_BASE_URL } from "../../api/api";
import { Carousel } from "bootstrap";
import { isLiked, setLiked } from "../../utils/likes";

const Home = () => {

  // ================= THERAPIST STATES =================
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [filteredTherapists, setFilteredTherapists] = useState([]);

  // ================= FETCH THERAPISTS =================
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await api.get("/therapists/userall");
       setTherapists(res.data.therapists);
setFilteredTherapists(res.data.therapists);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);
useEffect(() => {
  const filtered = therapists.filter((t) => {
    const searchText = search.toLowerCase();

    return (
      t.name?.toLowerCase().includes(searchText) ||
      t.specialization?.toLowerCase().includes(searchText) ||
      t.address?.toLowerCase().includes(searchText)
    );
  });

  setFilteredTherapists(filtered);
}, [search, therapists]);
const handleShare = async (therapist) => {
  const shareUrl = `${window.location.origin}/therapist/${therapist._id}`;

  const text = `${therapist.name} - ${therapist.specialization}

View therapist profile:
${shareUrl}`;

  try {
    // 1️⃣ Mobile + supported browsers
    if (navigator.share) {
      await navigator.share({
        title: therapist.name,
        text,
        url: shareUrl,
      });
      return;
    }

    // 2️⃣ Desktop fallback → copy to clipboard
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      alert("Link copied! You can paste anywhere.");
      return;
    }

    // 3️⃣ Final fallback → WhatsApp web
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );

  } catch (err) {
    console.log("Share cancelled:", err);
  }
};


  // ================= INIT BOOTSTRAP CAROUSEL =================
  useEffect(() => {
    const carouselElement = document.querySelector("#physioCarousel");

    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 2000, // 2 seconds auto slide
        ride: "carousel",
        pause: "hover",
        touch: true,
        wrap: true,
      });
    }
  }, []);

  // ================= SCROLL FUNCTION =================
  const scrollToTherapists = () => {
    document
      .getElementById("therapists-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
const handleLike = async (id) => {
  if (isLiked(id)) {
    alert("Already liked");
    return;
  }

  try {
    const res = await api.put(`/therapists/like/${id}`);

    setTherapists(prev =>
      prev.map(t =>
        t._id === id
          ? { ...t, likesCount: res.data.likesCount }
          : t
      )
    );

    setLiked(id);

  } catch {
    alert("Error liking therapist");
  }
};


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

        <div className="carousel-inner">

          {/* SLIDE 1 */}
          <div className="carousel-item active">

            <div className="position-relative">

              <img
                src="therapy3.jpg"
                className="d-block w-100"
                alt="Physiotherapy Clinic"
                style={{ height: "85vh", objectFit: "cover" }}
              />

              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.2))",
                }}
              ></div>

              <div className="carousel-caption text-start">

                <h1 className="fw-bold">
                  Jagruthi Physiotherapy Clinic
                </h1>

                <p className="fs-5">
                  Trusted Care For Pain Relief & Mobility Recovery
                </p>

                <button
                  className="btn btn-primary px-4 py-2 mt-2"
                  onClick={scrollToTherapists}
                >
                  View Therapists
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
                style={{ height: "85vh", objectFit: "cover" }}
              />

              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.2))",
                }}
              ></div>

              <div className="carousel-caption text-start">

                <h1 className="fw-bold">
                  Advanced Rehabilitation Programs
                </h1>

                <p className="fs-5">
                  Personalized Therapy For Faster Recovery
                </p>

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
                style={{ height: "85vh", objectFit: "cover" }}
              />

              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.2))",
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

      {/* ================= HERO CONTENT ================= */}

      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
        }}
      >

        <div className="container">

          <div className="row align-items-center">

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
              </p>

            </div>

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

      {/* ================= THERAPISTS SECTION ================= */}

      <div className="container py-5" id="therapists-section">

        <h3 className="text-center fw-bold mb-4 text-primary">
          Our Therapists
        </h3>
<div className="row mb-4">
  <div className="col-md-6 mx-auto">
    <input
      type="text"
      className="form-control form-control-lg shadow-sm"
      placeholder="Search therapist by name, specialization, address..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>

  {loading ? (
    <div className="text-center">Loading therapists...</div>
  ) : therapists.length === 0 ? (
    <div className="text-center text-muted">
      No therapists available
    </div>
  ) : (
          <div className="row">

            {filteredTherapists.map((t) => (


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

                    <p className="text-muted">
                      {t.specialization}
                    </p>

                    <p>
                      {t.bio?.slice(0, 100)}...
                    </p>
<button
  className={`btn btn-sm ${
    isLiked(t._id) ? "btn-secondary" : "btn-outline-danger"
  }`}
  onClick={() => handleLike(t._id)}
  disabled={isLiked(t._id)}
>
  ❤️ {t.likesCount || 0}
</button>

<button
  className="btn btn-outline-primary btn-sm ms-2"
  onClick={() => handleShare(t)}
>
  🔗 Share
</button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Home;
