import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
// Components for routing
import { lazy, Suspense } from "react";
const Maincontainer = lazy(() => import("./Components/Maincontainer.jsx"));
const Watchpage = lazy(() => import("./Components/Watchpage.jsx"));
const Signin = lazy(() => import("./Components/Signin.jsx"));
const Createchannel = lazy(() => import("./Components/Createchannel.jsx"));
const Channelcard = lazy(() => import("./Components/Channelcard.jsx"));
const Login = lazy(() => import("./Components/Login.jsx"));
const Uploadvideo = lazy(() => import("./Components/Uploadvideo.jsx"));
const SingleVideoPage = lazy(() => import("./Components/SingleVideoPage.jsx"));
const NotFound = lazy(() => import("./Components/NotFound.jsx"));

// 🧭 Create router structure
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Maincontainer />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/channel",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Createchannel />
          </Suspense>
        ),
      },
      {
        path: "/watch",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Watchpage />
          </Suspense>
        ),
      },
      {
        path: "/channel/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Channelcard />
          </Suspense>
        ),
      },
      {
        path: "/uploadvideo/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Uploadvideo />
          </Suspense>
        ),
      },
      {
        path: "/video/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SingleVideoPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

// Render app with Redux and Router
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
