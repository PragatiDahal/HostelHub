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
        "Finding the perfect hostel was so easy with Hostel Hub! The filters helped me narrow down options that fit my budget and preferences. I found a great place in no time!",
      title: "Sophia K.",
    },
    {
      id: 2,
      icon: <FaQuoteLeft size={30} />,
      description:
        "Hostel Hub made my search stress-free. The recommendations were spot-on, and the reviews really helped me choose a hostel that matched what I was looking for.",
      title: "Aarogya P.",
    },
    {
      id: 3,
      icon: <FaQuoteLeft size={30} />,
      description:
        "Thanks to Hostel Hub, I found an affordable and clean hostel in the heart of the city. The filtering options were super helpful and saved me so much time.",
      title: "Unaati S.",
    },
    {
        id: 4,
        icon: <FaQuoteLeft size={30} />,
        description:
          "Finding the perfect hostel was so easy with Hostel Hub! The filters helped me narrow down options that fit my budget and preferences. I found a great place in no time!",
        title: "Pragati D.",
      },
      {
        id: 5,
        icon: <FaQuoteLeft size={30} />,
        description:
          "Finding the perfect hostel was so easy with Hostel Hub! The filters helped me narrow down options that fit my budget and preferences. I found a great place in no time!",
        title: "Pooja K.",
      },
      {
        id: 6,
        icon: <FaQuoteLeft size={30} />,
        description:
          "Finding the perfect hostel was so easy with Hostel Hub! The filters helped me narrow down options that fit my budget and preferences. I found a great place in no time!",
        title: "Hritika B.",
      },
  ];

  return (
    <div className="bg-[#EAF4F4] px-4 md:px-12 pb-12">
      <div className="text-3xl md:text-4xl font-[poppins] text-center text-[#2C3E50] font-bold mb-8">
        What our clients say about us?
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
