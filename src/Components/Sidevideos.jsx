import React, { useEffect, useState } from 'react'
import { dummyVideos } from '../utils/constant'
import Sidevideocard from './Sidevideocard'



const Sidevideos = () => {
  const [videos, setVideos] = useState([])

  // Load dummy videos with delay (simulating fetch)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTheVideos()
    }, 1000);

    // Cleanup timeout
    return () => clearTimeout(timer)
  }, [])

  // Load static video data from dummy list
  function loadTheVideos() {
    setVideos(dummyVideos)
  }

  return (
    <div className='flex flex-col'>
      {videos.map((video) => {
        return <Sidevideocard key={video.id.videoId || video.id || index} data={video} />
      })}
    </div>
  )
}

export default Sidevideos
