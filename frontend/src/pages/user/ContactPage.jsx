import { useEffect, useState } from "react";
import api from "../../api/api";

const ContactPage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setSettings(res.data);
      } catch (err) {
        console.log("Settings fetch error:", err);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="container py-5">

      <h4 className="text-center mb-4">Contact Us</h4>

      <div className="row shadow bg-white rounded p-4 align-items-center">

        {/* LEFT SIDE */}
        <div className="col-md-6 mb-3">

          <h5 className="mb-3 text-primary">
            {settings?.clinicName || "Jagruthi Physiotherapy Clinic"}
          </h5>

          <p className="mb-2">
            📞 <strong>Phone:</strong>{" "}
            {settings?.phone || "9849009634"}
          </p>

          <p className="mb-2">
            ✉ <strong>Email:</strong>{" "}
            <a
              href={`mailto:${settings?.email || "tgphysio26@gmail.com"}`}
              className="text-decoration-none"
            >
              {settings?.email || "tgphysio26@gmail.com"}
            </a>
          </p>

          <p className="mb-2">
            📍 <strong>Address:</strong>
          </p>

          <p className="mb-1">
            {settings?.address1 || "2nd Lane Beside MAX & ZUDIO Malls"}
          </p>

          <p>
            {settings?.address2 || "Kishanpura, Hanumakonda"}
          </p>

        </div>

        {/* RIGHT SIDE — STATIC MAP */}
        <div className="col-md-6">
          <iframe
            title="clinic-map"
            width="100%"
            height="280"
            style={{ border: 0, borderRadius: "10px" }}
            loading="lazy"
            src="https://www.google.com/maps?q=Mahi+medicals+and+surgicals,18.0132586,79.5571708&output=embed"
          />
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
