import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { IMAGE_BASE_URL } from "../../api/api";
import { Carousel,Modal } from "bootstrap";
import { isLiked, setLiked } from "../../utils/likes";
import Footer from "./Footer";

const Home = () => {

  // ================= THERAPIST STATES =================
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [filteredTherapists, setFilteredTherapists] = useState([]);
const [selectedTherapist, setSelectedTherapist] = useState(null);
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
const handleView = async (id) => {
  try {
    const res = await api.get(`/therapists/${id}`);
    setSelectedTherapist(res.data);

    const modalElement = document.getElementById("therapistModal");
    const modal = new Modal(modalElement);

    modal.show();

  } catch (error) {
    console.error(error);
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
                Physiotherapy Professional Unity of Telangana
                </h1>

                {/* <p className="fs-5">
                  Trusted Care For Pain Relief & Mobility Recovery
                </p> */}

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

             

              <h2 className="fw-bold text-primary mt-3">
Physiotherapy Professional Unity of Telangana
</h2>

<p className="text-muted mt-3">
Physiotherapy Professional is a person who practices physiotherapy by undertaking
comprehensive examination and appropriate investigation, provides treatment and
advice to individuals suffering from movement dysfunction, disability, trauma,
and disease.
</p>

<p className="text-muted">
Physiotherapists use physical modalities including therapeutic exercises,
mobilization, manipulations, electrical and thermal agents and other
electro-therapeutics for prevention, screening, diagnosis, treatment,
health promotion and fitness.
</p>

<p className="text-muted">
A physiotherapist can practice independently or as part of a
multi-disciplinary medical team and must possess a minimum qualification
of a Baccalaureate degree in Physiotherapy.
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
<div className="container py-5">
  <div className="row align-items-center">

    <div className="col-md-6">
      <img
        src="/physio-awareness.jpg"
        alt="Physiotherapy Awareness"
        className="img-fluid rounded shadow"
      />
    </div>

    <div className="col-md-6">

      <h3 className="fw-bold text-primary">
        Protecting the Physiotherapy Profession
      </h3>

      <p className="text-muted mt-3">
        To protect this prestigious profession, we are developing this platform
        to bring together qualified physiotherapy professionals and create
        awareness among the public.
      </p>

      <p className="text-muted">
        Our goal is to eradicate duplicate and unethical physiotherapy
        treatments in Telangana state and ensure patients receive treatment
        only from qualified and registered physiotherapists.
      </p>

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

                <div
  className="card shadow h-100"
  style={{ cursor: "pointer" }}
  onClick={() => handleView(t._id)}
>

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
  onClick={(e) => {
    e.stopPropagation();
    handleLike(t._id);
  }}
  disabled={isLiked(t._id)}
>
  ❤️ {t.likesCount || 0}
</button>

<div className="mt-2">

<button
  className="btn btn-secondary btn-sm ms-2"
  onClick={(e) => {
    e.stopPropagation();
    handleView(t._id);
  }}
>
   View
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

              </div>

            ))}

          </div>
        )}

      </div>
      {/* THERAPIST DETAILS MODAL */}

<div
  className="modal fade"
  id="therapistModal"
  tabIndex="-1"
>
  <div className="modal-dialog modal-lg modal-dialog-centered">

    <div className="modal-content">

      <div className="modal-header">
        <h5 className="modal-title">
          Therapist Details
        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <div className="modal-body">

        {selectedTherapist && (

          <div className="row">

            <div className="col-md-4 text-center">

              <img
                src={`${IMAGE_BASE_URL}/${selectedTherapist.image}`}
                alt={selectedTherapist.name}
                className="img-fluid rounded mb-3"
              />

            </div>

            <div className="col-md-8">

              <h4>{selectedTherapist.name}</h4>

              <p>
                <strong>Specialization:</strong>{" "}
                {selectedTherapist.specialization}
              </p>

              <p>
                <strong>Qualification:</strong>{" "}
                {selectedTherapist.qualification}
              </p>

              <p>
                <strong>Contact:</strong>{" "}
                {selectedTherapist.contact}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {selectedTherapist.address}
              </p>

              <p>
                <strong>Practicing Details:</strong>
              </p>

              <p>
                {selectedTherapist.practicingDetails}
              </p>

              <p>
                <strong>Additional Information:</strong>
              </p>

              <p>
                {selectedTherapist.additionalInformation}
              </p>

              <p>
                <strong>Bio:</strong>
              </p>

              <p>
                {selectedTherapist.bio}
              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>
</div>
<Footer/>
    </div>
  );
};

export default Home;