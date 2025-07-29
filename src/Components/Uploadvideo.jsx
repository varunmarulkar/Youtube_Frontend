import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Uploadvideo = () => {

  // Get channelId from URL params
  const { id: channelId } = useParams();
  const navigate = useNavigate();

  // Form state to hold input values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: ''
  });


  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const uploader = user?._id;

    // Ensure user is logged in
    if (!uploader) return alert("Login karo pehle");

    try {
      const res = await fetch("http://localhost:8000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ...formData,
          channelId,
          uploader
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Video uploaded");
      navigate(`/channel/${channelId}`);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="mt-20 text-white flex flex-col items-center">
      <h2 className="text-2xl mb-6 font-bold">Upload New Video</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[400px]">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={formData.title}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          onChange={handleChange}
          value={formData.thumbnailUrl}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          onChange={handleChange}
          value={formData.videoUrl}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default Uploadvideo;
