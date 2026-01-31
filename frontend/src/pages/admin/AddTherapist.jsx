import { useState } from "react";
import api from "../../api/api";

const AddTherapist = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });
    data.append("image", image);

    try {
      await api.post("/therapists/add", data);
      setMsg("Therapist added successfully ✅");
      e.target.reset();
    } catch (err) {
      setMsg("Failed to add therapist ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Add Therapist</h4>

      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        <input name="name" className="form-control mb-2" placeholder="Name" onChange={handleChange} required />
        <input name="specialization" className="form-control mb-2" placeholder="Specialization" onChange={handleChange} required />
        <input name="contact" className="form-control mb-2" placeholder="Contact" onChange={handleChange} required />
        <input name="qualification" className="form-control mb-2" placeholder="Qualification" onChange={handleChange} required />

        <textarea name="bio" className="form-control mb-2" placeholder="Bio" onChange={handleChange} required />
        <textarea name="additionalInformation" className="form-control mb-2" placeholder="Additional Info" onChange={handleChange} />
        <textarea name="practicingDetails" className="form-control mb-2" placeholder="Practicing Details" onChange={handleChange} />

        <input name="address" className="form-control mb-2" placeholder="Address" onChange={handleChange} required />

        <input type="file" className="form-control mb-3" onChange={(e) => setImage(e.target.files[0])} required />

        <button className="btn btn-primary">
          Add Therapist
        </button>
      </form>
    </div>
  );
};

export default AddTherapist;
