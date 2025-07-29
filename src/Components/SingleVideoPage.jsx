import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleVideoPage = () => {
  const { id } = useParams();      // Get video ID from URL
  const navigate = useNavigate();  // Navigation hook

  const [video, setVideo] = useState(null);  // Video details
  const [channel, setChannel] = useState(null);  // Channel details
  const [isEditing, setIsEditing] = useState(false);  // Toggle edit mode
  const [editedTitle, setEditedTitle] = useState(''); // Edited title state
  const [editedDesc, setEditedDesc] = useState(''); // Edited description state


   // Fetch video and channel data on mount or when ID changes
  useEffect(() => {
    async function fetchVideo() {
      try {
        const res = await fetch(`http://localhost:8000/video/${id}`);
        const data = await res.json();
        setVideo(data);

        const res2 = await fetch(`http://localhost:8000/channel/${data.channelId}`);
        const ch = await res2.json();
        setChannel(ch.channel);
      } catch (error) {
        console.error("Error loading video", error);
      }
    }

    fetchVideo();
  }, [id]);

    // Delete video
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this video?");
    if (!confirm) return;
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`http://localhost:8000/video/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Video deleted successfully.");
        navigate('/');
      } else {
        alert(result.message || "Failed to delete.");
      }
    } catch (err) {
      console.error("Error deleting video", err);
      alert("Failed to delete.");
    }
  };
  
 // Edit video
  const handleEditSubmit = async () => {
    try {
      await fetch(`http://localhost:8000/video/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDesc
        })
      });
      alert("Video updated!");
      setVideo({ ...video, title: editedTitle, description: editedDesc });
      setIsEditing(false);
    } catch (error) {
      console.error("Edit failed", error);
      alert("Failed to update video.");
    }
  };

  if (!video || !channel) return <p className="text-white mt-20 text-center">Loading...</p>;

  return (
    <div className="text-white mt-20 px-4 flex flex-col items-center">
      <img
        src={video.thumbnailUrl}
        alt="Video thumbnail"
        className="w-full max-w-2xl h-auto aspect-video object-cover rounded-xl bg-black"
      />
  
      <div className="mt-6 w-full max-w-2xl text-left">
        <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{video.description}</p>
  
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-semibold">{channel.channelName}</h3>
            <p className="text-gray-400 text-sm">@{channel.handle}</p>
          </div>
  
          <button className="bg-red-600 px-4 py-2 rounded-full text-white hover:bg-red-700">
            Subscribe
          </button>
        </div>
  
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="bg-gray-800 px-3 py-1 rounded">👍 Like</button>
          <button className="bg-gray-800 px-3 py-1 rounded">👎 Dislike</button>
  
          <button
            onClick={() => {
              setEditedTitle(video.title);
              setEditedDesc(video.description);
              setIsEditing(true);
            }}
            className="bg-blue-600 px-3 py-1 rounded text-white"
          >
            ✏️ Edit
          </button>
  
          <button
            onClick={handleDelete}
            className="bg-red-800 px-3 py-1 rounded text-white"
          >
            🗑️ Delete
          </button>
        </div>
  
        {isEditing && (
          <div className="mt-6">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white mb-2"
              placeholder="Edit Title"
            />
            <textarea
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white mb-2"
              placeholder="Edit Description"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={handleEditSubmit}
                className="bg-green-600 px-4 py-1 rounded text-white"
              >
                ✅ Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 px-4 py-1 rounded text-white"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default SingleVideoPage;
