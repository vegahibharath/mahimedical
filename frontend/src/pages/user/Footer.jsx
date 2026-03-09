import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-center py-4"
      style={{ background: "#0d6efd", color: "#fff" }}
    >
      <div className="container">

        <p className="mb-1">
          © 2026 Physiotherapy Professional Unity of Telangana (PPUT).  
          All Rights Reserved.
        </p>

        <p className="mb-0">
          Developed by{" "}
          <a
            href="https://vegaahi.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontWeight: "bold", textDecoration: "underline" }}
          >
            VEGAAHI IT PVT LTD
          </a>
        </p>

      </div>
    </footer>
  );
};

export default Footer;