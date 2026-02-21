import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { IMAGE_BASE_URL } from "../../api/api";

export default function TherapistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);

  // ================= FETCH THERAPIST =================
  useEffect(() => {
    api.get(`/therapists/${id}`)
      .then(res => setTherapist(res.data))
      .catch(err => console.log(err));
  }, [id]);

  // ================= LIKE FUNCTION =================
  const handleLike = async () => {
    const liked = localStorage.getItem(`liked-${therapist._id}`);
    if (liked) return;

    try {
      const res = await api.put(`/therapists/like/${therapist._id}`);
      setTherapist(prev => ({
        ...prev,
        likesCount: res.data.likesCount
      }));
      localStorage.setItem(`liked-${therapist._id}`, "true");
    } catch (err) {
      console.log(err);
    }
  };

  if (!therapist) return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="spinner-border text-orange" role="status"></div>
    </div>
  );

  const isLiked = localStorage.getItem(`liked-${therapist._id}`);

  return (
    <div className="min-vh-100 pb-5" style={{ 
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", 
      fontFamily: "'Plus Jakarta Sans', sans-serif" 
    }}>
      
      {/* HEADER SECTION */}
      <div className="container pt-5">
        <button onClick={() => navigate("/")} className="btn btn-sm btn-white mb-4 rounded-pill shadow-sm border px-3">
          ← Back
        </button>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-10">
            <div className="glass-card rounded-5 overflow-hidden shadow-lg border-0">
              <div className="row g-0">
                
                {/* LEFT: IMAGE SECTION */}
                <div className="col-md-5">
                  <div className="h-100 position-relative">
                    <img
                      src={
                        therapist.image?.startsWith("http")
                          ? therapist.image
                          : `${IMAGE_BASE_URL}/${therapist.image}`
                      }
                      alt={therapist.name}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", minHeight: "400px" }}
                    />
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-orange px-3 py-2 rounded-pill shadow">VERIFIED SCHOLAR</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: DETAILS SECTION */}
                <div className="col-md-7 p-4 p-lg-5 bg-white">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h2 className="fw-800 text-dark m-0 tracking-tighter">{therapist.name}</h2>
                      <p className="text-orange fw-bold mb-0">{therapist.specialization}</p>
                    </div>
                    <button
                      className={`btn rounded-circle p-0 d-flex align-items-center justify-content-center transition-all ${
                        isLiked ? "bg-light text-danger" : "btn-outline-danger"
                      }`}
                      style={{ width: "50px", height: "50px", fontSize: "1.2rem", border: isLiked ? 'none' : '1px solid #dc3545' }}
                      onClick={handleLike}
                      disabled={isLiked}
                    >
                      {isLiked ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <hr className="opacity-10" />

                  <div className="mb-4">
                    <h6 className="fw-bold text-muted small uppercase tracking-widest mb-2">About Therapist</h6>
                    <p className="text-secondary leading-relaxed">{therapist.bio || "No bio available for this professional."}</p>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-sm-6">
                      <div className="p-3 rounded-4 bg-light border-0">
                        <small className="text-muted d-block small">Address</small>
                        <span className="fw-bold text-dark small">{therapist.address}</span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-3 rounded-4 bg-light border-0">
                        <small className="text-muted d-block small">Total Appreciation</small>
                        <span className="fw-bold text-dark small">{therapist.likesCount || 0} Likes</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        
        .fw-800 { font-weight: 800; }
        .text-orange { color: #FF5F00 !important; }
        .bg-orange { background-color: #FF5F00 !important; color: white; }
        .btn-orange { background: #FF5F00; color: white; border: none; }
        .btn-orange:hover { background: #e55500; transform: translateY(-2px); }
        .shadow-orange { box-shadow: 0 10px 20px rgba(255, 95, 0, 0.3); }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .btn-white { background: white; color: #333; }
        .leading-relaxed { line-height: 1.7; }
        .tracking-tighter { letter-spacing: -1.5px; }
        .tracking-widest { letter-spacing: 0.1em; }
        .uppercase { text-transform: uppercase; }
        .transition-all { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
}