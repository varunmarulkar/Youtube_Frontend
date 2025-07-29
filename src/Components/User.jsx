import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const User = ({ setIsClicked }) => {

    // State to store parsed user and channel data
    const [channel, setChannel] = useState(null);
    const [user, setUser] = useState(null);

    // On component mount, fetch user and channel data from localStorage
    useEffect(() => {
        try {
            const rawChannel = localStorage.getItem("channel");
            const rawUser = localStorage.getItem("user");

            if (rawChannel && rawChannel !== "undefined") {
                const parsedChannel = JSON.parse(rawChannel);
                setChannel(parsedChannel);
            }

            if (rawUser && rawUser !== "undefined") {
                const parsedUser = JSON.parse(rawUser);
                setUser(parsedUser);
                console.log("✅ Parsed user:", parsedUser);
            }

        } catch (err) {
            console.error("❌ LocalStorage parse error:", err);
        }
    }, []);

    return (

        // User dropdown card UI
        <div className='absolute bg-white right-2 mt-3 border-0 shadow-lg w-[200px] h-[300px] flex flex-row'>
            <img className='h-9 ml-2' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="user" />
            <div className='ml-2'>
                <h1>{user ? user.username : "User"}</h1>
                <h1 className='mb-2'>{user ? user.email : "abc@gmail.com"}</h1>
                <Link to="/channel" onClick={() => setIsClicked(false)}>
                    <p className='text-[13px] text-blue-400 cursor-pointer'>Create a Channel</p>
                </Link>
            </div>
        </div>
    );
};

export default User;
