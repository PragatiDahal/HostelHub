import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top Hostels in Kathmandu",
      date: "September 10, 2024",
      content:
        "Discover the best hostels in Kathmandu with top-notch facilities and friendly environments. From budget options to luxury stays, find your ideal accommodation.",
      image:
        "https://i.pinimg.com/564x/b0/d6/cf/b0d6cfe638844dec78ffc4ba4a35f393.jpg",
    },
    {
      id: 2,
      title: "Best Hostels for Solo Travelers",
      date: "September 12, 2024",
      content:
        "Explore hostels perfect for solo travelers, offering social environments and secure accommodations to make your trip memorable.",
      image:
        "https://i.pinimg.com/564x/dd/d5/d8/ddd5d8cd545ef9300a0adca05eac42f0.jpg",
    },
    {
      id: 3,
      title: "How to Choose the Right Hostel",
      date: "September 14, 2024",
      content:
        "Choosing the right hostel can be daunting. Here are some tips on what to look for when booking your next stay.",
      image:
        "https://i.pinimg.com/564x/41/68/d4/4168d427125803c0bcf0318507b5a68d.jpg",
    },
  ];

  return (
    <>
      <div className="container mx-auto p-6 bg-[#E8F8F5]">
        {/* Blog Title */}
        <div className="text-center mb-10 pt-10">
          <h1 className="text-4xl font-bold font-[poppins] text-[#2C3E50] mb-4">
            From the Blog
          </h1>
          <p className="text-gray-600">
            Explore our latest articles on hostels, travel tips, and more.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="blog-post bg-white rounded-lg overflow-hidden shadow-lg hover:bg-gray-200 duration-500 ease-in-out "
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-[#2C3E50]">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center pb-6 pt-12">
          <button className="bg-[#1ABC9C] text-white text-xl px-6 py-2  rounded-full font-[poppins]">
            Upload your blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Blog;
