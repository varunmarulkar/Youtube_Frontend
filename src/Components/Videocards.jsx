import React from 'react'
import videoDate from '../utils/videoDate'
import formatViews from '../utils/Views'

const Videocards = (props) => {

     
    const dateCheck=videoDate(props.data.snippet.publishedAt) 

    return (
      <div className="w-full max-w-xs m-2 p-2 sm:text-center">
        <img
          className="w-full rounded-2xl"
          src={props.data.snippet.thumbnails.high.url}
          alt="thumbnail"
        />
    
        <h1 className="mt-2 overflow-hidden text-[15px] font-bold line-clamp-2">
          {props.data.snippet.title}
        </h1>
    
        <div className="flex flex-col sm:items-center text-sm text-gray-400 mt-1">
          <h2 className="text-black font-sans">{props.data.snippet.channelTitle}</h2>
    
          <div className="flex gap-2">
            <h6>{formatViews(props.data.statistics.viewCount)} views</h6>
            <h6>{dateCheck}</h6>
          </div>
        </div>
      </div>
    );
    
}

export default Videocards
