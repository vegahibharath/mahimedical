<<<<<<< HEAD
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#0056b3" }}>
      <div className="container">
        <a className="navbar-brand font-weight-bold" href="/">
          Mahi Medical
        </a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#nav">
=======
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#0056b3" }}>

      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          Mahi Medical
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
>>>>>>> origin/sruthi
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
<<<<<<< HEAD
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Therapists</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Blogs</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          </ul>
        </div>
      </div>
=======

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/therapists">Therapists</Link>
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

>>>>>>> origin/sruthi
    </nav>
  );
};

export default Header;
