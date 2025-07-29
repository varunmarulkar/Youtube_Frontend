import React from 'react'

const Sidevideocard = (props) => {
  return (
    <div className='flex gap-2 cursor-pointer '>
      <img className='w-[180px] h-[120px] rounded-3xl mb-3' src={props.data.thumbnail} alt="" />  
      <div className='flex flex-col'>
      <h1 className='font-bold mb-1'> {props.data.title}  </h1>
      <h1 className='mb-1 text-[14px]'>{props.data.channel} <span className='border text-[6px] bg-gray-300  rounded-full p-0.5'>✔️</span></h1>
      <div className='flex gap-2'>
        <h1 className='text-[14px]'>{props.data.views}</h1>
        <h1 className='text-[14px]'>{props.data.uploadDate}</h1>
      </div>
      </div>
      
   
    </div>
  )
}

export default Sidevideocard
