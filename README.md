<<<<<<< HEAD
# YouTube Clone - MERN Stack Capstone Project

This project is a full-stack YouTube clone developed using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to sign up, sign in, create channels, upload and view videos, leave comments, and perform basic video filtering by category. It closely mimics some core functionalities of the real YouTube platform for learning and demonstration purposes.

## Features

### Frontend (React)
- **Home Page**
  - YouTube-like header with search bar and sign in button (before login).
  - Sidebar that can be toggled using a hamburger menu.
  - Filter buttons to view All, Songs, Trailers, and Gaming content.
  - Video grid with thumbnails, titles, channel names, and views.
  - Trending video data fetched **live from the YouTube Data API v3**.
- **User Authentication**
  - Sign up and login using username, email, and password.
  - JWT-based authentication integrated.
  - After sign-in, user’s name appears in the header.
  - Access to protected pages only after login.

- **Search & Filters**
  - Real-time video filtering by title using the search bar.
  - Category filters implemented using tags within the video data.

- **Video Watch Page**
  - Functional video player.
  - Title, channel name, and description display.
  - Like and dislike buttons (UI only).
  - Comment section with add, edit, and delete functionality.

- **Channel Page**
  - Only signed-in users can create a channel.
  - Ability to edit channel name, handle, and logo.
  - Display all videos uploaded by the channel owner.
  - Add, edit, and delete videos from the channel dashboard.

- **Upload Video**
  - Simple form to input video title, URL, thumbnail, category, and description.
  - Video is stored in the database and rendered on the home and channel pages.

- **Responsive Design**
  - Fully responsive layout compatible with mobile, tablet, and desktop views.

### Backend (Node.js + Express)
- **User Routes**
  - Register, Login, and Token verification with proper validation and error handling.

- **Channel Routes**
  - Create, Update, Delete, and Fetch individual channel information.

- **Video Routes**
  - Create, Get all, Get by ID, Update, and Delete videos.

- **Comment Routes**
  - Add, Edit, Delete, and Get comments based on video ID.

- **Middleware**
  - Auth middleware to protect private routes and validate JWT tokens.

### Database (MongoDB)
- **Collections Used**
  - Users
  - Channels
  - Videos
  - Comments

- Data stored includes user credentials, channel metadata, video info (title, URL, thumbnail, category), and comments with timestamps.

## How to Run Locally

1. Clone the repository.
2. Set up the backend:
   - `cd backend`
   - Run `npm install`
   - Add `.env` file with necessary MongoDB URI and JWT secret.
   - Run `nodemon index.js`
3. Set up the frontend:
   - `cd frontend`
   - Run `npm install`
   - Run `npm run dev` or `npm start`

Make sure both frontend and backend servers are running.

## Known Issues and Notes

- Some dummy video thumbnails return 404 errors because the hardcoded video IDs don't always match real YouTube videos. This does not affect functionality. Placeholder thumbnails can be used as a fallback.

- Ads and tracking scripts from YouTube or embedded links occasionally throw CORS-related errors in the browser console (e.g., requests to googleads.g.doubleclick.net). These are outside the scope of this clone project and can be ignored as they do not break the core features.

- In the search bar implementation, initial version had a W bug where the filter logic was not correctly connected to the search input state. This was debugged and corrected.

## Folder Structure

- `frontend/` – React app with all components, pages, styles, and Redux store.
- `backend/` – Node.js/Express server with models, controllers, and routes.
- `utils/` – Constants and helper functions for both frontend and backend.

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **State Management**: Redux Toolkit
- **Video API**: YouTube Data API v3 (for trending content)

## Conclusion

This capstone project demonstrates a working, functional clone of YouTube built entirely with the MERN stack. It helped in understanding real-world application development, REST API design, JWT authentication, frontend-backend communication, and MongoDB schema modeling.

For demo purposes, all features were manually tested and validated. All major frontend and backend requirements have been completed, with responsive design and good code structure.

This project is ready for submission.
=======
# 🎥 YouTube Clone

This is a React-based YouTube clone project I built while learning full-stack development. It includes search with debouncing, live chat simulation, video routing, and comment section — just like the real YouTube (but simpler 😅).

## 🔧 What I Used
- React.js
- Tailwind CSS
- Redux Toolkit (for state management)
- YouTube Search API

## ✨ Features
- Live video playback using embedded iframe
- Debounced search suggestions like real YouTube
- Live chat simulation using Redux & setInterval
- Nested comments like threaded discussions
- Responsive design with Tailwind

## 🛠️ How to run it
```bash
git clone https://github.com/varunmarulkar/Youtube_Frontend.git
cd youtube-clone
npm install
npm start

