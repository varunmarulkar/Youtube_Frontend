import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components for routing
import Maincontainer from "./Components/Maincontainer.jsx";
import Watchpage from "./Components/Watchpage.jsx";
import { Provider } from "react-redux";
import store from "./utils/store";
import Signin from "./Components/Signin.jsx";
import Createchannel from "./Components/Createchannel.jsx";
import Channelcard from "./Components/Channelcard.jsx";
import Login from "./Components/Login.jsx";
import Uploadvideo from "./Components/Uploadvideo.jsx";
import SingleVideoPage from "./Components/SingleVideoPage.jsx";
import NotFound from "./Components/NotFound.jsx";

// 🧭 Create router structure
const router = createBrowserRouter([
  {
    path: "/",   // Main path
    element: <App />,  // Root layout
    children: [
      {
        path: "/",   // Home route
        element: <Maincontainer />,
      },
      {
        path: "/signin",  // Signin route
        element: <Signin />
      },

      { 
        path: "/login",  // Login route
        element: <Login /> 
      },
      {
        path: "/channel",  // Channel creation
        element: <Createchannel />
      },
      {
        path: "/watch",   // Watch video page 
        element: <Watchpage />,
      },
      {
        path: "*",   // Watch video page 
        element: <NotFound />,
      },
      {
        path: "/channel/:id",   // Individual channel page
        element: <Channelcard />,
      },
      {
        path: "/uploadvideo/:id",   //  Upload video
        element: <Uploadvideo />
      },
      {
        path:"/video/:id",   // Single video view
        element:<SingleVideoPage/>
      }
      
    ],
  },
]);

// Render app with Redux and Router
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
