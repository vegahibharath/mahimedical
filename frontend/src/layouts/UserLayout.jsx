import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { IMAGE_BASE_URL } from "../api/api";

const UserLayout = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.get("/settings")
      .then(res => setSettings(res.data))
      .catch(err => console.log("Settings error:", err));
  }, []);

  // Safe logo handling
  const logoSrc = settings?.logo
    ? settings.logo.startsWith("http")
      ? settings.logo
      : `${IMAGE_BASE_URL}/${settings.logo}`
    : "/mahiii.png"; // fallback logo

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "#0056b3" }}
      >
        <div className="container">

          {/* LOGO */}
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to="/"
          >
            <img
              src={logoSrc}
              alt="Clinic Logo"
              style={{ height: "40px", objectFit: "contain" }}
              onError={(e) => {
                e.target.src = "/mahiii.png"; // fallback if broken
              }}
            />

            <span className="fw-bold">
              {settings.clinicName || "TGPHYSIO"}
            </span>
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NAV LINKS */}
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blogs</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/news">News</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/gallery">Gallery</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>

            </ul>
          </div>

        </div>
      </nav>

      {/* PAGE CONTENT */}
      <Outlet />
    </>
  );
};

export default UserLayout;
