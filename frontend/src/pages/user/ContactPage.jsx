const ContactPage = () => {

  return (
    <div className="container py-5">

      <h4 className="text-center mb-4">Contact Us</h4>

      <div className="row shadow bg-white rounded p-4 align-items-center">

        {/* LEFT SIDE — CONTACT INFO */}
        <div className="col-md-6 mb-3">

          <h5 className="mb-3 text-primary">
            Jagruthi Physiotherapy Clinic
          </h5>

          <p className="mb-2">
            📞 <strong>Phone:</strong> 9849009634
          </p>
         <p className="mb-2">
            ✉ <strong>Email:</strong>{" "}
            <a
              href="mailto:tgphysio26@gmail.com"
              className="text-decoration-none"
            >
              tgphysio26@gmail.com
            </a>
          </p>


          <p className="mb-2">
            📍 <strong>Address:</strong>
          </p>

          <p className="mb-1">
            2nd Lane Beside MAX & ZUDIO Malls
          </p>

          <p>
            Kishanpura, Hanumakonda
          </p>


        </div>

        {/* RIGHT SIDE — GOOGLE MAP */}
        <div className="col-md-6">

          <iframe
            title="clinic-map"
            width="100%"
            height="280"
            frameBorder="0"
            style={{ borderRadius: "10px" }}
            src="https://maps.google.com/maps?q=hanumakonda&t=&z=14&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />

        </div>

      </div>

    </div>
  );
};

export default ContactPage;
