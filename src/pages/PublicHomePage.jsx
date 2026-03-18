import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.jpg";

function PublicHome() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services/`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="is-relative has-background-white"
      style={{ minHeight: "100vh" }}
    >
      <div className="has-text-centered pt-5">
        <figure className="image is-inline-block">
          <img
            src={logo}
            alt="Enhanced Beauty"
            style={{ maxHeight: "600px", maxWidth: "400px" }}
          />
        </figure>
      </div>
      <div
        className="is-position-absolute"
        style={{ position: "absolute", top: "20px", right: "30px" }}
      >
        <button
          className="button is-rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
      <div className="has-text-centered">
        <figure className="image is-inline-block">
          <img
            src={profile}
            style={{ maxHeight: "500px", maxWidth: "600px" }}
          />
        </figure>
      </div>
      <div className="container mt-5">
        <div className="columns is-centered">
          <div className="column is-6 has-text-centered">
            <h2 className="title is-3 has-text-black">About Me</h2>
            <p className="subtitle is-5 has-text-weight-light has-text-black">
              Bio coming soon...
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-6 mb-6">
        <div className="columns">
          {/* Services Column */}
          <div className="column is-6">
            <h2 className="title is-3 has-text-black mb-5">Services</h2>
            <div className="content">
              {services.map((service) => (
                <div key={service.id} className="mb-4">
                  <p className="is-size-5 has-text-black">✦ {service.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="column is-6">
            <h2 className="title is-3 has-text-black mb-5">Get In Touch</h2>
            <div className="content">
              <div className="mb-4">
                <p className="is-size-5 has-text-black">📞 (931) 472-8524</p>
              </div>
              <div className="mb-4">
                <p className="is-size-5 has-text-black">✉️ enhancedbeautybylucy@gmail.com</p>
              </div>
              <div className="mb-4">
                <a
                  href="https://www.instagram.com/enhancedbeautybylucy/"
                  target="_blank"
                  rel="noreferrer"
                  className="is-size-5 has-text-black"
                >
                  📷 @enhancedbeautybylucy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicHome;
