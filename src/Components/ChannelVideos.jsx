import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChannelVideos = ({ channelId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("http://localhost:8000/videos");
        const data = await res.json();

        // Filter videos by channelId
        const channelVideos = data.filter((vid) => vid.channelId === channelId);
        setVideos(channelVideos.reverse()); // newest first
      } catch (err) {
        console.error("Error fetching videos", err);
      }
    }

    if (channelId) {
      fetchVideos();
    }
  }, [channelId]);

  if (!videos.length) return <p className='text-white text-center mt-5'>No videos yet.</p>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-10 py-10 max-w-7xl mx-auto'>
      {videos.map((video) => (
        <div key={video._id} className='bg-gray-900 p-4 rounded-xl shadow hover:shadow-xl transition'>
          <Link to={`/video/${video._id}`}>
            <img
              src={video.thumbnailUrl}
              alt="thumbnail"
              className='w-full aspect-video object-cover rounded-lg'
            />
          </Link>
          <h2 className='text-white mt-2 font-semibold text-base line-clamp-1'>{video.title}</h2>
          <p className='text-gray-400 text-sm mt-1 line-clamp-2'>
            {video.description?.slice(0, 60)}...
          </p>
          <a
            href={`/video/${video._id}`}
            className='text-blue-400 text-sm mt-2 inline-block'
          >
            Watch →
          </a>
        </div>
      ))}
    </div>
  );
  
};

export default ChannelVideos;
