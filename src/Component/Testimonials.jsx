import React from "react";
import { FaQuoteLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 

const Testimonials = () => {
  const test = [
    {
      id: 1,
      icon: <FaQuoteLeft size={30} />,
      description:
        "Partnering with Hostel Hub has been a win-win. Their users enjoy great discounts, and we’ve seen a significant increase in customers taking advantage of our offers.",
      title: "Big Mart",
    },
    {
      id: 2,
      icon: <FaQuoteLeft size={30} />,
      description:
        "Hostel Hub helps us reach a wider audience by providing affordable, high-speed internet services to students and travelers, making their stay even more comfortable.",
      title: "World Link",
    },
    {
      id: 3,
      icon: <FaQuoteLeft size={30} />,
      description:
        "Through Hostel Hub, we’re able to provide reliable and discounted transportation options, helping travelers explore the city easily and affordably.",
      title: "Indrive",
    },
    {
        id: 4,
        icon: <FaQuoteLeft size={30} />,
        description:
          "Hostel Hub has transformed how we reach potential guests. Their platform simplifies the process for students and the general public to discover and book our hostels, significantly increasing our visibility and bookings",
        title: "Hostel owner",
      },
  ];

  return (
    <div className="bg-[#EAF4F4] px-4 md:px-12 pb-12">
      <div className="text-3xl md:text-4xl font-[poppins] text-center text-[#2C3E50] font-bold mb-8">
        What our partners say about us?
      </div>

      {/* Swiper Container */}
      <Swiper
        spaceBetween={20} 
        slidesPerView={1} 
        loop={true} 
        autoplay={{ delay: 3000 }} 
        pagination={{ clickable: true }} 
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 slide for screens larger than 640px
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2, // 2 slides for screens larger than 768px
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3, // 3 slides for screens larger than 1024px
            spaceBetween: 40,
          },
        }}
      >
        {test.map(({ id, icon, description, title }) => (
          <SwiperSlide key={id}>
            <div className="bg-[#1F3A54] rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="mb-4 text-[#E67E22]">{icon}</div>
              <p className="text-white font-[poppins] text-justify mb-4">
                {description}
              </p>
              <h3 className="font-semibold text-lg font-[poppins] text-white text-left">
                — {title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
