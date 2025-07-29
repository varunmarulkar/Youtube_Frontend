import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Mychannel = () => {
  const [channel, setChannel] = useState(null);  // Store channel info
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;  // Stop if user not logged in

    // Fetch channel info linked to logged-in user
    async function fetchUserChannel() {
      try {
        const res = await fetch(`http://localhost:8000/channel/user/${user._id}`);
        const data = await res.json();

        if (res.ok && data.channel) {
          setChannel(data.channel);
        }
      } catch (error) {
        console.error("Error fetching channel", error);
      }
    }

    fetchUserChannel();
  }, []);

  // If no channel exists
  if (!channel) return <p className="text-white">No channel found.</p>;


  // Navigate to user's channel on button click
  return (
    <button
      className="bg-blue-600 text-white p-2 rounded"
      onClick={() => navigate(`/channel/${channel._id}`)}
    >
      Go to My Channel
    </button>
  );
};

export default Mychannel;
