import React from "react";
import "./Contact.scss";
import leftImage from "./assets/arrow_icon.png"
import rightImage from "./assets/image.png";

const Contact = () => {
  return (
    <div className="contact-container">
        <form action="" className="contact-left">
            <div className="contact-left-title">
                <h2>Get in touch</h2>
                <hr/>
            </div>
            <input type="text" name="name" placeholder="Your Name" className="contact-inputs" required/>
            <input type="email" name="email" placeholder="Your Email" className="contact-inputs" required/>
            <textarea name="message" placeholder="Your Message" className="contact-inputs textarea" required></textarea>
            <button  className="button"type="submit">Submit <img src = {leftImage} alt="" /></button>

        </form>
        <div className="contact-right">
            <img src={rightImage} alt=""/>
        </div>
    </div>
  );
};

export default Contact;
