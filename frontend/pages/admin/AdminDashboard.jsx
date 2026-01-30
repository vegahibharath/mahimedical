import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../src/utils/Auth";

const AdminDashboard = () => {
  const [openTherapists, setOpenTherapists] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2 bg-primary text-white vh-100 p-3">
          <h5 className="mb-4">Mahi Admin</h5>

          <ul className="list-unstyled">

            {/* Dashboard */}
            <li className="mb-2">
              <Link className="text-white" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>

            {/* Therapists Dropdown */}
            <li className="mb-2">
              <div
                onClick={() => setOpenTherapists(!openTherapists)}
                style={{ cursor: "pointer" }}
                className="d-flex justify-content-between align-items-center"
              >
                <span>Therapists</span>
                <span>{openTherapists ? "▲" : "▼"}</span>
              </div>

              {openTherapists && (
                <ul className="list-unstyled ml-3 mt-2">
                  <li className="mb-1">
                    <Link className="text-white" to="/admin/therapists/getall">
                      View Therapists
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link className="text-white" to="/admin/therapists/add">
                      Add Therapist
                    </Link>
                  </li>
                 
                </ul>
              )}
            </li>

            {/* Blogs */}
            <li className="mb-2">
              <Link className="text-white" to="/admin/blogs">
                Blogs
              </Link>
            </li>

            {/* Logout */}
            <li
              className="mt-4"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </li>

          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h4>Admin Dashboard</h4>
          <p className="text-muted">
            Use the sidebar to manage therapists and content.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
