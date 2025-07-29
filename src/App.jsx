import { useState,useEffect } from 'react'
import Header from './Components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Components/Sidebar'

 function App(){

  const [isSigned,setIsSigned]=useState(false)  // Tracks login status
  const [channelCreated, setChannelCreated] = useState(false);  // Tracks if user's channel is created
  const navigate=useNavigate()   //  For navigation

  useEffect(() => {
    navigate('/');  //On mount, redirect to home page
  }, []);

  return (

    <div>
         <Header isSigned={isSigned} channelCreated={channelCreated} setChannelCreated={setChannelCreated}/>
         <Sidebar/>
         <Outlet context={{isSigned,setIsSigned,channelCreated,setChannelCreated}}/>
    </div>

  )
 }
 


export default App
