import React from "react";
import { useParams } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Top Hostels in Kathmandu",
    date: "September 10, 2024",
    content:
      "Discover the best hostels in Kathmandu with top-notch facilities and friendly environments. From cozy dorms to private rooms, these hostels offer modern amenities like high-speed Wi-Fi, 24-hour front desk services, and on-site cafes. Enjoy breathtaking rooftop views and the vibrant local culture just steps away from your accommodation. These hostels provide everything a traveler needs, including lockers, social spaces, and helpful local advice for exploring Kathmandu.",
    image: "https://i.pinimg.com/564x/b0/d6/cf/b0d6cfe638844dec78ffc4ba4a35f393.jpg",
  },
  {
    id: 2,
    title: "Best Hostels for Solo Travelers",
    date: "September 12, 2024",
    content:
      "Solo travelers will love these hostels designed for social interaction and security. With communal kitchens, lounge areas, and regular group activities, they are perfect for meeting fellow adventurers. Many solo travelers appreciate the female-only dorm options and added safety measures, such as keycard entry and CCTV coverage. Explore the city with newfound friends, or relax in peaceful common spaces tailored for your comfort.",
    image: "https://i.pinimg.com/564x/dd/d5/d8/ddd5d8cd545ef9300a0adca05eac42f0.jpg",
  },
  {
    id: 3,
    title: "How to Choose the Right Hostel",
    date: "September 14, 2024",
    content:
      "Choosing the right hostel involves considering factors like location, cleanliness, and amenities. Make sure the hostel is close to the city's main attractions and has positive reviews on safety and cleanliness. Check if the hostel offers free breakfast, organized tours, or airport pickups, as these can enhance your experience. For a more luxurious stay, some hostels even provide private rooms with en-suite bathrooms, air conditioning, and rooftop bars.",
    image: "https://i.pinimg.com/564x/41/68/d4/4168d427125803c0bcf0318507b5a68d.jpg",
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <p>Blog post not found!</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-[#E8F8F5] rounded-lg shadow-lg">
      {/* Title and Date - Centered */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold font-[poppins] text-[#2C3E50] mb-2 pt-10">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500">{post.date}</p>
      </div>

      {/* Image on the left, Content on the right */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-10">
        {/* Left side - Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover mb-6 rounded-lg"
          />
        </div>

        {/* Right side - Content */}
        <div className="md:w-1/2 w-full md:pl-8">
          <p
            className="text-gray-700 text-lg leading-relaxed mb-6"
            style={{ textAlign: "justify" }}
          >
            {post.content}
          </p>
          <div className="border-t-2 border-[#2C3E50] pt-4">
            <h3 className="text-2xl font-semibold mb-2">Key Features:</h3>
            {post.id === 1 && (
              <ul className="list-disc ml-8 text-gray-600">
                <li>Modern dorms and private rooms</li>
                <li>High-speed Wi-Fi and 24-hour reception</li>
                <li>On-site cafes with local delicacies</li>
                <li>Rooftop views and social spaces</li>
              </ul>
            )}
            {post.id === 2 && (
              <ul className="list-disc ml-8 text-gray-600">
                <li>Communal kitchens and lounge areas</li>
                <li>Female-only dorm options</li>
                <li>Keycard entry and CCTV coverage</li>
                <li>Organized social events and activities</li>
              </ul>
            )}
            {post.id === 3 && (
              <ul className="list-disc ml-8 text-gray-600">
                <li>Proximity to main attractions</li>
                <li>Reviews on safety and cleanliness</li>
                <li>Breakfast, tours, and airport pickups</li>
                <li>Private rooms with luxury amenities</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

