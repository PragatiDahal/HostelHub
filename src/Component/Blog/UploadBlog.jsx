import React, { useState } from "react";

const UploadBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a successful upload operation (this is where you can add backend logic)
    setSuccessMessage("Your blog has been uploaded successfully!");

    // Clear form fields
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F9F4] p-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold font-[poppins] text-[#2C3E50] mb-10 pt-10">
        Upload Your Blog
      </h1>
      
      {/* Form for uploading blog */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Blog Title */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="title">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter the title of your blog"
            required
          />
        </div>

        {/* Blog Content */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="content">
            Blog Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-40"
            placeholder="Write your blog content here..."
            required
          />
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Preview the selected image */}
        {image && (
          <div className="mb-6">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#2C3E50] text-white p-3 rounded-lg text-lg font-semibold"
        >
          Submit
        </button>
      </form>

      {/* Success Message */}
      {successMessage && (
        <p className="mt-6 text-green-600 text-xl font-semibold">{successMessage}</p>
      )}
    </div>
  );
};

export default UploadBlog;