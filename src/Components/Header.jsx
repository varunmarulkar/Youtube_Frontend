import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggle } from '../utils/appslice'
import { youtubeSearchApi } from '../utils/constant'
import { Link } from 'react-router-dom'
import User from './User'
import { useNavigate } from 'react-router-dom';


const Header = ({ isSigned,channelCreated }) => {

  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const [channel, setChannel] = useState(null);
  const navigate = useNavigate(); // ✅ add this if not added


  const dispatch = useDispatch()



  useEffect(() => {
    // console.log(searchQuery)

      // Fetch search suggestions as user types
    const timer = setTimeout(() => {
      searchSuggestions()
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [searchQuery])

    // Fetch user's channel when signed in or a new channel is created
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    async function fetchUserChannel() {
      try {
        const res = await fetch(`http://localhost:8000/channel/user/${user._id}`);
        const data = await res.json();

        if (res.ok && data.channel) {
          setChannel(data.channel);
          localStorage.removeItem("channelCreated");
        } else {
          setChannel(null)
        }
      } catch (error) {
        console.error("Failed to fetch channel", error);
      }
    }

    console.log(isSigned)
    console.log(channel)
    fetchUserChannel();
  }, [isSigned,channelCreated]);

 // API call to get live search suggestions from YouTube API
  const searchSuggestions = async () => {
    console.log(searchQuery)
    const data = await fetch(youtubeSearchApi + searchQuery)
    const json = await data.json()
    // console.log(json[1])
    setSuggestions(json[1])
    console.log(suggestions)
  }

  function toggleMenuHandler() {
    dispatch(toggle())
  }

  function handleDropDown() {
    setIsClicked(prev => !prev)
  }
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg p-2 flex justify-center sm:flex sm:justify-center lg:justify-between md:flex md:justify-center items-center gap-2 z-50">

      <div className="flex items-center gap-4 col-span-1">
        {isSigned && (
          <img
            onClick={toggleMenuHandler}
            className="h-6 sm:h-7 cursor-pointer"
            src="https://img.freepik.com/premium-vector/hamburger-menu-bar-flat-icon-apps-vector_1254296-1292.jpg"
            alt="menu"
          />
        )}
        <Link to="/">
          <img
            className="h-6 sm:h-7"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
            alt="YoutubeLogo"
          />
        </Link>
      </div>

      <div className="relative col-span-1 sm:col-span-1 lg:col-span-3 flex justify-center">
        <div className="flex w-full max-w-[500px]">
         {isSigned &&(
          <input
          className="border border-gray-400 w-auto lg:w-100 md:w-50 sm:w-auto  rounded-l-full px-4 py-2 text-sm"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
         )} 
        
          {isSigned && (
                <button className="border border-gray-400 bg-gray-200 px-4 rounded-r-full text-sm">🔍</button>
          )}
      
        </div>

        {showSuggestions && (
          <div className="absolute top-12 bg-white w-full max-w-[500px] px-4 py-2 rounded-xl border border-gray-300 shadow-md">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-1 text-sm hover:bg-gray-100">🔍 {s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-end items-center gap-2 col-span-1">
        {isSigned && (
          <div className="relative">
            <img
              onClick={handleDropDown}
              className="h-8 sm:h-9 cursor-pointer"
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="user"
            />
            {isClicked && <User isClicked={isClicked} setIsClicked={setIsClicked} />}
          </div>
        )}

        {!isSigned && (
          <Link to="/signin">
            <button className="bg-red-400  hover:cursor-pointer hover:bg-red-500 text-white px-3 py-1 text-sm rounded-full font-semibold">
              SignIn
            </button>
          </Link>
        )}
       
        {isSigned &&(
            <button
            className="bg-red-400 hover:cursor-pointer hover:bg-red-500 text-white px-3 py-1 text-sm rounded-full font-semibold"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();  
            }}
          >
            Logout
          </button>
        )}
      

        {isSigned && channel && channel._id && (
          <button
            onClick={() => navigate(`/channel/${channel._id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded"
          >
            Go to My Channel
          </button>
        )}
      </div>

    </div>
  )

}

export default Header
