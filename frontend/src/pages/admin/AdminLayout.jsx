import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { logout } from "../../utils/Auth";

const AdminLayout = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [openTherapists, setOpenTherapists] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          width: open ? "220px" : "70px",
          background: "#0d6efd",
          color: "white",
          transition: "0.3s",
          padding: "15px"
        }}
      >

        {/* LOGO */}
        <h5
          style={{
            textAlign: open ? "left" : "center",
            marginBottom: "30px"
          }}
        >
          {open ? "Mahi Admin" : "MA"}
        </h5>

        {/* MENU */}
        <div>

          {/* DASHBOARD */}
          <div
            className="mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/dashboard")}
          >
            🏠 {open && "Dashboard"}
          </div>

          {/* BLOGS */}
          <div
            className="mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/blogs")}
          >
            📝 {open && "Blogs"}
          </div>

          {/* NEWS */}
          <div
            className="mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/news")}
          >
            📰 {open && "News"}
          </div>

          {/* GALLERY */}
          <div
            className="mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/gallery")}
          >
            🖼 {open && "Gallery"}
          </div>

          {/* ================= THERAPISTS DROPDOWN ================= */}

          <div
            className="mb-2"
            style={{ cursor: "pointer" }}
            onClick={() => setOpenTherapists(!openTherapists)}
          >
            👨‍⚕️ {open && "Therapists"} {open && (openTherapists ? "▲" : "▼")}
          </div>

          {openTherapists && open && (
            <ul className="list-unstyled ms-3 mt-2">

              <li className="mb-1">
                <Link
                  className="text-white text-decoration-none"
                  to="/admin/therapists/getall"
                >
                  ➤ View Therapists
                </Link>
              </li>

              <li className="mb-1">
                <Link
                  className="text-white text-decoration-none"
                  to="/admin/therapists/add"
                >
                  ➤ Add Therapist
                </Link>
              </li>

            </ul>
          )}
<div
  className="mb-3"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/admin/settings")}
>
  ⚙ {open && "Settings"}
</div>


          {/* LOGOUT */}
          <div
            style={{
              cursor: "pointer",
              marginTop: "30px",
              color: "#ffdada"
            }}
            onClick={logout}
          >
            🚪 {open && "Logout"}
          </div>

        </div>

      </div>

      {/* ================= MAIN AREA ================= */}
      <div style={{ flex: 1 }}>

        {/* TOP BAR */}
        <div
          style={{
            height: "60px",
            background: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,.1)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            justifyContent: "space-between"
          }}
        >

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <span className="fw-bold text-primary">
            Admin Panel
          </span>

        </div>

        {/* PAGE CONTENT */}
        <div
          style={{
            padding: "20px",
            background: "#f5f7fb",
            minHeight: "calc(100vh - 60px)"
          }}
        >

          <Outlet />

        </div>

      </div>

    </div>
  );
};

export default AdminLayout;
