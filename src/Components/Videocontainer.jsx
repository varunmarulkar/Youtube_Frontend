import React, { useEffect, useState } from 'react'
import { youtubeVideoApi } from '../utils/constant'
import Videocards from './videocards'
import { Link } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import Filters from './Filters'

const Videocontainer = () => {

  // Get authentication status from context
  const { isSigned } = useOutletContext()

  // Store all videos and filtered videos
  const [videos, setVideo] = useState([])
  const [filteredVideos, setFilteredVideos] = useState([])

  // Store all videos and filtered videos
  useEffect(() => {
    if (isSigned) {
      getVideos()
    }
  }, [isSigned])

  // API call to fetch videos
  async function getVideos() {
    let data = await fetch(youtubeVideoApi)
    let json = await data.json()
    console.log(json.items)
    setVideo(json.items)
    setFilteredVideos(json.items)
  }

  // Filter for music-related videos
  function songs() {
    console.log(videos)
    const filteredSongs = videos.filter((vid) => {
      return vid?.snippet?.tags?.some(
        (tag) =>
          tag.toLowerCase().includes("songs") || tag.toLowerCase().includes("song") || tag.toLowerCase().includes("music")
      )
    })
    setFilteredVideos(filteredSongs)
    console.log(filteredSongs)
  }

  function searchText(text) {
    const searchFilter=videos.filter((v)=>v?.snippet?.title.toLowerCase().includes(text.toLowerCase())
  )
  setFilteredVideos(searchFilter)
  }

  // Filter for movie-related videos
  function movies() {
    console.log(videos)
    const filteredSongs = videos.filter((vid) => {
      return vid?.snippet?.tags?.some(
        (tag) =>
          tag.toLowerCase().includes("trailers") || tag.toLowerCase().includes("trailer") || tag.toLowerCase().includes("movie")
          || tag.toLowerCase().includes("movies")
      )
    })
    setFilteredVideos(filteredSongs)
    console.log(filteredSongs)
  }

  // Filter for gaming-related videos
  function gaming() {
    console.log(videos)
    const filteredSongs = videos.filter((vid) => {
      return vid?.snippet?.tags?.some(
        (tag) =>
          tag.toLowerCase().includes("games") || tag.toLowerCase().includes("game") || tag.toLowerCase().includes("gaming")
      )
    })
    setFilteredVideos(filteredSongs)
    console.log(filteredSongs)
  }

  // Show all videos (reset filter)
  function All() {
    setFilteredVideos(videos)
  }

  // Show message if user is not signed in
  if (!isSigned) {
    return <h1 className="text-xl font-semibold mt-40 ml-100">Please Sign In to see the videos</h1>
  }
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-[100px]">
      <Filters searchText={searchText} songs={songs} All={All} movies={movies} gaming={gaming} />

      <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-col md:grid-cols- lg:grid-cols-4  justify-items-center">
        {filteredVideos.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video.id}>
            <Videocards data={video} />
          </Link>
        ))}
      </div>
    </div>
  );

}

export default Videocontainer
