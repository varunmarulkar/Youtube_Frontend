import React, { useEffect, useState } from 'react'
import { youtubeVideoApi } from '../utils/constant'
import { useSearchParams } from 'react-router-dom'
import Sidevideos from './Sidevideos'
import Commentscontainer from './Commentscontainer'
import formatViews from '../utils/Views'

const Watchpage = () => {

    // State to store all videos
  const [video, setVideo] = useState([])

    // Get videoId from URL query param
  const [searchParams] = useSearchParams()
  const videoId = searchParams.get("v")

  // Fetch video list on component mount
  useEffect(() => {
    getVideos()
  }, [])

    // API call to get video data
  async function getVideos() {
    let data = await fetch(youtubeVideoApi)
    let json = await data.json()  
    setVideo(json.items)
  }

    // Find the current video by matching videoId
  const currentVideo = video.find((v) => v.id === videoId)
  

  return (
    <div className='flex flex-col lg:flex-row mt-20 px-2 md:px-6 gap-4'>
      {/* Main Video Section */}
      <div className='flex flex-col lg:w-[70%]'>
        <div className='w-full'>
          <iframe
            className='w-full rounded-xl aspect-video'
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className='mt-3'>
          {currentVideo ? (
            <h1 className='text-xl md:text-2xl font-semibold'>
              {currentVideo.snippet.title}
            </h1>
          ) : (
            <p>Loading...</p>
          )}

          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-3'>

            {/* Channel Info */}
            <div className='flex items-center gap-3'>
              <img
                className='w-10 h-10 rounded-full'
                src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-youtube-circle-512.png'
                alt='channel-logo'
              />
              <h1 className='text-base md:text-lg font-semibold'>
                {currentVideo?.snippet?.channelTitle || 'Channel Name'}
              </h1>
              <button className='bg-red-500 text-white text-sm font-semibold rounded-3xl px-4 py-1'>
                Subscribe
              </button>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-3'>
              <button className='border rounded-3xl px-4 py-1 bg-gray-200 shadow'>
                👍 { formatViews(currentVideo?.statistics?.likeCount || 0)}
              </button>
              <button className='border rounded-3xl px-4 py-1 bg-gray-200 shadow'>
                🔗 Share
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className='mt-6'>
          <Commentscontainer videoId={videoId} />
        </div>
      </div>

      {/* Side Videos */}
      <div className='lg:w-[30%]'>
        <Sidevideos />
      </div>
    </div>
  )
}

export default Watchpage
