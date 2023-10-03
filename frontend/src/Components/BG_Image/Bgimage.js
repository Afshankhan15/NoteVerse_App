import React from "react";
import Slider from "react-slick"; // Import React Slick
import "./Bgimage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Bgimage = () => {
  // Configure React Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Change slide every 2 seconds
  };

  return (
    <div className="bg-image-container">
      <div className="overlay">
        <Slider {...settings}>
          <div className="text-content">
            <h1 style={{ color: "purple" }}>Welcome to NoteVerse Platform </h1>
          </div>
          <div className="text-content">
            <h1>Write, Edit and Manage Notes at ease</h1>
          </div>
          <div className="text-content">
            <h1 style={{ color: "blue" }}>
              Keep your Notes Confidential and Secure
            </h1>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Bgimage;
