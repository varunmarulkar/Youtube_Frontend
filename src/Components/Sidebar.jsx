import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = () => {
const isMenuOpen=useSelector((store)=>store.app.isMenuOpen)

//early return: if this is false it will not go further to next line
if(!isMenuOpen) return null;

  return (
    <div className="fixed top-14 h-[calc(100vh-56px)] w-[200px] bg-white p-5 shadow-lg overflow-y-auto">

      <ul className='cursor-pointer ml-2'>
        <li className='mb-1'><Link to="/">Home</Link></li>
        <li className='mb-1'>Shorts</li>
        <li className='mb-1'>Subscriptions</li>
      </ul>

      <h1 className='font-bold mt-10 '>Explore</h1>
      <ul className='cursor-pointer ml-2 max-w-full'>
        <li className='mb-1'>Trending</li>
        <li className='mb-1'>Shopping</li>
        <li className='mb-1'>Music</li>
        <li className='mb-1'>Movies</li>
        <li className='mb-1'>Gaming</li>
        <li className='mb-1'>News</li>
        <li className='mb-1'>Sports</li>
        <li className='mb-1'>Courses</li>
        <li className='mb-1'>Fashion & Beauty</li>
        <li className='mb-1'>Podcasts</li>
      </ul>
    </div>
  )
}

export default Sidebar
