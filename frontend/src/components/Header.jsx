const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#0056b3" }}>
      <div className="container">
        <a className="navbar-brand font-weight-bold" href="/">
          Mahi Medical
        </a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Therapists</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Blogs</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
