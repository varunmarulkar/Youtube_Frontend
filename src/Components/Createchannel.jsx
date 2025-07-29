import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

const Createchannel = () => {

  const {setChannelCreated}=useOutletContext()

    const navigate = useNavigate()

    const [channelName, setChannelName] = useState("")
    const [handle, setHandle] = useState("")
    const [logo, setLogo] = useState("")


    async function handleCreate(e) {
        e.preventDefault();
      
        const storedUser = localStorage.getItem("user");
        const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
      
        if (!user) {
          alert("User not found. Please login first.");
          return;
        }
      
        const owner = user._id;
      
        try {
          const res = await fetch("http://localhost:8000/channel", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ channelName, handle, logo, owner })
          });
      
          const data = await res.json(); // ✅ FIXED THIS ORDER

       
          localStorage.setItem("channel",JSON.stringify(data.newChannel))
          if (!res.ok) {
            throw new Error(data.message || "Channel creation failed");
          }else{
            setChannelCreated(prev=>!prev)
          }
      
          alert("Channel created successfully");


          localStorage.setItem("channelCreated", "true")
          navigate(`/channel/${data.newChannel._id}`);
        } catch (error) {
          alert(error.message);
          console.error("Error creating channel:", error);
        }
      }
      

      return (
        <div className="mt-40 mx-auto max-w-[500px] w-full bg-gray-700 text-white rounded-3xl shadow-xl p-6 flex flex-col justify-between font-semibold">
          
          {/* Image and Heading */}
          <div className="flex flex-col items-center">
            <img
              className="h-20 w-20 rounded-full mb-2"
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="user"
            />
            <p className="text-xs text-gray-200">Select picture</p>
          </div>
      
          {/* Form */}
          <form onSubmit={handleCreate} className="flex flex-col items-center mt-4 gap-3 w-full">
            <input
              className="w-4/5 py-2 px-3 rounded-md border border-gray-400 bg-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <input
              className="w-4/5 py-2 px-3 rounded-md border border-gray-400 bg-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
            <input
              className="w-4/5 py-2 px-3 rounded-md border border-gray-400 bg-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </form>
      
          {/* Bottom Buttons */}
          <div className="flex justify-end gap-6 mt-6 px-6 text-sm">
            <p className="text-gray-300 hover:text-gray-200 cursor-pointer">Cancel</p>
            <button
              type="submit"
              className="text-blue-400 hover:text-blue-500 font-bold hover:cursor-pointer"
              onClick={handleCreate}
            >
              Create Channel
            </button>
          </div>
        </div>
      );
      
      
}

export default Createchannel
