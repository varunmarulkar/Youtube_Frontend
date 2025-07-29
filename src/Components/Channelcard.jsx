import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useOutletContext } from 'react-router-dom'
import ChannelVideos from './ChannelVideos'

const Channelcard = () => {
  const [channel, setChannel] = useState()
  const { id } = useParams()   // Channel ID from URL
  const navigate = useNavigate()
  const { setChannelCreated } = useOutletContext()   // Context to update channel state globally
  
    // Fetch channel details when component mounts or id changes
  useEffect(() => {
    async function fetchChannel() {
      try {
        const res = await fetch(`http://localhost:8000/channel/${id}`)
        const data = await res.json()
        setChannel(data.channel)
      } catch (error) {
        console.error("Failed to fetch channel", error)
      }
    }

    fetchChannel()
  }, [id])

    // Show loader while data is being fetched
  if (!channel) return <p className='text-white mt-20 text-center'>Loading...</p>

    // Handle channel deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete channel?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`http://localhost:8000/channel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      alert("Channel deleted")
      navigate("/")
      localStorage.removeItem("channel")
      setChannelCreated(prev => !prev);
    } catch (err) {
      alert(err.message)
    }
  }

    // Handle channel edit using prompt inputs
  const handleEdit = async () => {
    const channelName = prompt("Enter new channel name", channel.channelName)
    const handle = prompt("Enter new handle", channel.handle)
    const logo = prompt("Enter new logo", channel.logo)

    if (!channelName || !handle || !logo) {
      alert("Fields can't be empty")
      return
    }

    try {
      const res = await fetch(`http://localhost:8000/channel/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ channelName, handle, logo }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      alert("Channel updated")
      setChannel({ ...channel, channelName, handle, logo })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className='mt-20 px-4 md:px-10 w-full flex flex-col items-center'>

      
      {/* Banner */}
      <div className='w-full max-w-5xl'>
        <img
          className='w-full h-40 md:h-52 rounded-2xl object-cover'
          src='https://images.unsplash.com/photo-1649180543887-158357417159?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW91dHViZSUyMGxvZ298ZW58MHx8MHx8fDA%3D'
          alt='Channel Banner'
        />
      </div>

      {/* Profile and Details */}
      <div className='w-full max-w-5xl mt-6 flex flex-col md:flex-row items-center md:items-start gap-6'>

        {/* Profile Icon */}
        <div className='w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center'>
          <h1 className='text-white text-5xl font-bold'>
            {channel.channelName?.charAt(0).toUpperCase()}
          </h1>
        </div>

        {/* Info + Buttons */}
        <div>
          <h1 className='text-3xl font-bold'>{channel.channelName}</h1>
          <h2 className='text-gray-400 mt-1'>@{channel.handle}</h2>
          <p className='text-sm mt-2'>Welcome to the official page of {channel.channelName}</p>

          <button className='mt-2 bg-black text-white text-sm rounded-2xl px-4 py-1'>
            Subscribe
          </button>

          {/* Action Buttons */}
          <div className='mt-4 flex flex-wrap gap-4'>
            <button onClick={handleEdit} className='bg-yellow-500 px-4 py-2 rounded text-white font-medium'>
              Edit
            </button>
            <button onClick={handleDelete} className='bg-red-500 px-4 py-2 rounded text-white font-medium'>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Video Upload Button and List */}
      <div className='w-full max-w-5xl mt-10 flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Videos</h1>
        <Link to={`/uploadvideo/${channel._id}`}>
          <button className='border px-3 py-1 rounded-3xl bg-red-400 text-white text-sm'>
            Add Video
          </button>
        </Link>
      </div>

      <div className='w-full max-w-5xl'>
        <ChannelVideos channelId={channel._id} />
      </div>

      <hr className='w-full max-w-5xl mt-4 border-gray-400' />
    </div>
  )
}

export default Channelcard
