import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
// import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { BiMessage } from "react-icons/bi";
import axios from "axios";


const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleMessageIconClick = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://vercel.com/lisha-marathes-projects/portfolio-q3s5/api/contact", formData);
      alert(response.data.message);
      setFormData({ name: "", phone: "", message: "" }); // Reset the form
    } catch (error) {
      alert("There was an error submitting your message. Please try again.");
    }
  };

  return (
    <>
      <div className="container contact" id="contact">
        <h1>CONTACT ME</h1>
        <div
          className="contact-icon"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          {/* <a href="https://www.google.com" target="_blank" className="items">
            <FaInstagram className="icons" />
          </a> */}
          {/* <a href="https://www.google.com" target="_blank" className="items">
            <CiFacebook className="icons" />
          </a> */}
          <a href="https://www.linkedin.com/in/lisha-kishor-marathe/" target="_blank" className="items">
            <CiLinkedin className="icons" />
          </a>
          <div className="items" onClick={handleMessageIconClick}>
            <BiMessage className="icons" />
          </div>
          <a href="https://github.com/Coderlisha" target="_blank" className="items">
            <FaGithubSquare className="icons" />
          </a>
          <a
            href="mailto:lisha.numetry@gmail.com"
            target="_blank"
            className="items"
          >
            <SiGmail className="icons" />
          </a>
        </div>

        {/* Conditional rendering of the message form */}
        {showForm && (
        <div className="message-form">
          <h2>Send me a message:</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                cols="50"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  </>
  );
};

export default Contact;
