import React, { useState } from 'react';
import roomImage from "../../assets/hostel1.png";
import hostelPhoto1 from "../../assets/h4.png"; // Hostel photos
import hostelPhoto2 from "../../assets/h5.png"; 
import hostelPhoto3 from "../../assets/h2.png";
import hostelPhoto4 from "../../assets/h3.png";
import reviewImage from "../../assets/bug2.png"; // Review section image

const Hostel1 = () => {
  // Define the formData state to hold the form input values
  const [formData, setFormData] = useState({
    location: '',
    bedroom: '',
    laundry: '',
    pricing: ''
  });

  // State for controlling tabs (photos, reviews, etc.)
  const [activeTab, setActiveTab] = useState('gallery'); // Set default to 'gallery'

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here, e.g., send data to an API or display it
    console.log('Form submitted:', formData);
  };

  return (
    <>
      {/* Container Section */}
      <div className="flex flex-col md:flex-row w-full my-10 bg-[#E8F8F5] shadow-lg rounded-lg overflow-hidden pt-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={roomImage}
            alt="Hostel Room"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Location */}
            <div>
              <label className="block text-lg font-semibold text-[#2C3E50]">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* Bedroom */}
            <div>
              <label className="block text-lg font-semibold text-[#2C3E50]">Bedroom</label>
              <input
                type="text"
                name="bedroom"
                value={formData.bedroom}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* Laundry */}
            <div>
              <label className="block text-lg font-semibold text-[#2C3E50]">Laundry</label>
              <input
                type="text"
                name="laundry"
                value={formData.laundry}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-lg font-semibold text-[#2C3E50]">Pricing per month</label>
              <input
                type="text"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#1ABC9C] text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-green-700 mt-4"
            >
              Book now
            </button>
          </form>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full my-10 bg-[#E8F9F3] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#2C3E50]">About</h2>
        <p className="text-[#2C3E50] leading-relaxed text-justify">
          ABC is located in the heart of Koteshwor. It is the perfect choice for those seeking comfort and harmony in their living environment.
          Our hostel offers a welcoming atmosphere, designed to provide a home-like feel while ensuring a peaceful stay.
          Conveniently situated within 2 km of colleges, schools, and libraries, ABC hostel provides easy access to essential services.ABC is located in the heart of Koteshwor. It is the perfect choice for those seeking comfort and harmony in their living environment.
          Our hostel offers a welcoming atmosphere, designed to provide a home-like feel while ensuring a peaceful stay.
          Conveniently situated within 2 km of colleges, schools, and libraries, ABC hostel provides easy access to essential services.
        </p>
      </div>

      {/* Tabs Section */}
      <div className="w-full bg-white shadow-lg rounded-lg">
        {/* Tab Buttons */}
        <div className="flex justify-around border-b-2 border-gray-200">
          <button
            className={`py-4 w-1/3 text-center text-[#2C3E50] ${activeTab === 'gallery' ? 'border-b-4 border-[#1ABC9C] font-bold' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
          <button
            className={`py-4 w-1/3 text-center text-[#2C3E50] ${activeTab === 'reviews' ? 'border-b-4 border-[#1ABC9C] font-bold' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button
            className={`py-4 w-1/3 text-center text-[#2C3E50] ${activeTab === 'facilities' ? 'border-b-4 border-[#1ABC9C] font-bold' : ''}`}
            onClick={() => setActiveTab('facilities')}
          >
            Facilities
          </button>
          <button
            className={`py-4 w-1/3 text-center text-[#2C3E50] ${activeTab === 'events' ? 'border-b-4 border-[#1ABC9C] font-bold' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 gap-4">
              <img src={hostelPhoto1} alt="Hostel 1" className="w-full h-auto rounded-md" />
              <img src={hostelPhoto2} alt="Hostel 2" className="w-full h-auto rounded-md" />
              <img src={hostelPhoto3} alt="Hostel 2" className="w-full h-auto rounded-md" />
              <img src={hostelPhoto4} alt="Hostel 2" className="w-full h-auto rounded-md" />
              {/* Add more images as needed */}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img src={reviewImage} alt="Reviewer" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold text-[#2C3E50]">Shreya Sapkota</h3>
                  <p className="text-[#2C3E50]">"This hostel is fantastic! Clean, friendly staff, and the location is perfect!"</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <img src={reviewImage} alt="Reviewer" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold text-[#2C3E50]">Unnati Neupane</h3>
                  <p className="text-[#2C3E50]">"I had a wonderful stay here. The rooms are cozy, and the facilities are great!"</p>
                </div>
              </div>
              {/* Add more reviews as needed */}
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === 'facilities' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[#2C3E50]">Facilities</h3>
              <ul className="list-disc pl-5 text-[#2C3E50]">
                <li>Free Wi-Fi</li>
                <li>24/7 Security</li>
                <li>Shared Kitchen</li>
                <li>Laundry Service</li>
                <li>Common Lounge</li>
              </ul>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-[#2C3E50]">Upcoming Events</h3>
              <ul className="list-disc pl-5 text-[#2C3E50]">
                <li>Hostel Game Night - Friday, 8 PM</li>
                <li>Cooking Workshop - Saturday, 10 AM</li>
                <li>Cultural Exchange Meetup - Sunday, 6 PM</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hostel1;
