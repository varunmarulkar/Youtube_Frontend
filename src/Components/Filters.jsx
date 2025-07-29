import React,{useState} from 'react'


const Filters = ({ songs, All, movies, gaming,searchText }) => {

  const [search,setSearch]=useState()
  return (
    <div className='mt-20 sm:mt-20 md:mt-20 flex flex-wrap gap-4 justify-center px-2'>
      <button
        onClick={All}
        className='border px-4 py-2 text-sm md:text-base rounded-3xl bg-red-500 text-white hover:bg-red-600'
      >
        All
      </button>
      <button
        onClick={movies}
        className='border px-4 py-2 text-sm md:text-base rounded-3xl bg-red-500 text-white hover:bg-red-600'
      >
        Trailers
      </button>
      <button
        onClick={songs}
        className='border px-4 py-2 text-sm md:text-base rounded-3xl bg-red-500 text-white hover:bg-red-600'
      >
        Songs
      </button>
      <button
        onClick={gaming}
        className='border px-4 py-2 text-sm md:text-base rounded-3xl bg-red-500 text-white hover:bg-red-600'
      >
        Gaming
      </button>

      <input onChange={(e)=>{
        searchText(e.target.value)
      }} value={search} className='border text-center px-10 rounded-3xl w-60' type="text" placeholder='Search by Title'/>
    </div>
  )
}

export default Filters
