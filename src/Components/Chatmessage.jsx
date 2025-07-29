import React from 'react'


const Chatmessage = ({name,message}) => {

  return (
    <div className='flex items-center shadow-sm mt-0.5 text-sm'>
        <div className='col-span-1 '>
                <img className='h-8' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="user" />

            </div>
            <span className='font-bold px-1'>{name}</span>
            <span>{message}</span>
    </div>
  )
}

export default Chatmessage
