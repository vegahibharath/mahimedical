import { Link, Outlet } from "react-router-dom";

const UserLayout = () => {

  return (
    <>

      {/* TOP NAVBAR */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "#0056b3" }}
      >
        <div className="container">

          <Link className="navbar-brand fw-bold" to="/">
            Mahi Medical
          </Link>

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

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
