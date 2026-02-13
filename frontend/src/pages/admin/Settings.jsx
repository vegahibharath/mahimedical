import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Settings() {

  const [form, setForm] = useState({
    phone: "",
    email: "",
    address1: "",
    address2: "",
    mapLink: ""
  });

  const [logo, setLogo] = useState(null);

  useEffect(() => {
    api.get("/settings")
      .then(res => setForm(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    if (logo) fd.append("logo", logo);

    await api.put("/settings", fd);

    alert("Settings Updated");
  };

  return (
    <div className="container mt-4">

      <h3>Website Settings</h3>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-2"
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({...form, phone:e.target.value})}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({...form, email:e.target.value})}
        />

        <input
          className="form-control mb-2"
          placeholder="Address line1"
          value={form.address1}
          onChange={e => setForm({...form, address1:e.target.value})}
        />
        
        <input
          className="form-control mb-2"
          placeholder="Address line 2"
          value={form.address2}
          onChange={e => setForm({...form, address2:e.target.value})}
        />

{/* 
        <input
          className="form-control mb-2"
          placeholder="Google Map Link"
          value={form.mapLink}
          onChange={e => setForm({...form, mapLink:e.target.value})}
        /> */}

        <input
          type="file"
          className="form-control mb-3"
          onChange={e => setLogo(e.target.files[0])}
        />

        <button className="btn btn-primary">
          Save Settings
        </button>

      </form>

    </div>
  );
}
