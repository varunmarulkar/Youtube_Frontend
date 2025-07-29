
// Your personal Google API key for accessing YouTube Data API
const googleApiKey="AIzaSyAhjUkwnnKL4V6p6juCoQRN7EEOSgP3TVs"

// YouTube API endpoint for fetching trending/popular videos in India
export const youtubeVideoApi="https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&key="+googleApiKey

// API for fetching search suggestions from YouTube (auto-complete dropdown)
export const youtubeSearchApi="http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

//  Static dummy video data used in your project as fallback or side list
export const dummyVideos = [
    {
      id: "1",
      title: "Learn React in 30 Minutes",
      thumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg",
      channel: "Code with John",
      views: "15K views",
      uploadDate: "2 days ago"
    },
    {
      id: "2",
      title: "JavaScript Crash Course",
      thumbnail: "https://i.ytimg.com/vi/hdI2bqOjy3c/hqdefault.jpg",
      channel: "Programming Basics",
      views: "42K views",
      uploadDate: "1 week ago"
    },
    {
      id: "3",
      title: "CSS Grid Tutorial",
      thumbnail: "https://i.ytimg.com/vi/jV8B24rSN5o/hqdefault.jpg",
      channel: "Design Simplified",
      views: "11K views",
      uploadDate: "3 days ago"
    },
    {
      id: "4",
      title: "Node.js in 20 Minutes",
      thumbnail: "https://i.ytimg.com/vi/TlB_eWDSMt4/hqdefault.jpg",
      channel: "Backend Simplified",
      views: "25K views",
      uploadDate: "5 days ago"
    },
    {
      id: "5",
      title: "MongoDB Beginner Guide",
      thumbnail: "https://i.ytimg.com/vi/F5mRW0jo-U4/hqdefault.jpg",
      channel: "Database World",
      views: "7.5K views",
      uploadDate: "1 week ago"
    },
    {
      id: "6",
      title: "Mastering Git & GitHub",
      thumbnail: "https://i.ytimg.com/vi/apGV9Kg7ics/hqdefault.jpg",
      channel: "DevOps Digest",
      views: "39K views",
      uploadDate: "2 weeks ago"
    },
    {
      id: "7",
      title: "Flexbox in 10 Minutes",
      thumbnail: "https://i.ytimg.com/vi/JJSoEo8JSnc/hqdefault.jpg",
      channel: "Design Ninja",
      views: "5K views",
      uploadDate: "3 days ago"
    },
    {
      id: "8",
      title: "Async JS Explained",
      thumbnail: "https://i.ytimg.com/vi/_8gHHBlbziw/hqdefault.jpg",
      channel: "JS Deep Dive",
      views: "19K views",
      uploadDate: "4 days ago"
    },
    {
      id: "9",
      title: "REST API Tutorial",
      thumbnail: "https://i.ytimg.com/vi/Q-BpqyOT3a8/hqdefault.jpg",
      channel: "API World",
      views: "22K views",
      uploadDate: "6 days ago"
    },
    {
      id: "10",
      title: "Responsive Web Design",
      thumbnail: "https://i.ytimg.com/vi/srvUrASNj0s/hqdefault.jpg",
      channel: "Frontend Pro",
      views: "31K views",
      uploadDate: "1 week ago"
    },
    {
      id: "11",
      title: "VSCode Shortcuts",
      thumbnail: "https://i.ytimg.com/vi/GfM-6XxoS1g/hqdefault.jpg",
      channel: "Dev Efficiency",
      views: "8.3K views",
      uploadDate: "2 days ago"
    },
    {
      id: "12",
      title: "Build Netflix Clone",
      thumbnail: "https://i.ytimg.com/vi/ntK9UjY7Q1k/hqdefault.jpg",
      channel: "Cloning Coder",
      views: "60K views",
      uploadDate: "3 weeks ago"
    },
    {
      id: "13",
      title: "TypeScript Basics",
      thumbnail: "https://i.ytimg.com/vi/BwuLxPH8IDs/hqdefault.jpg",
      channel: "Typed Devs",
      views: "9.4K views",
      uploadDate: "6 days ago"
    },
    {
      id: "14",
      title: "Redux in Simple Words",
      thumbnail: "https://i.ytimg.com/vi/poQXNp9ItL4/hqdefault.jpg",
      channel: "React Minds",
      views: "14K views",
      uploadDate: "2 weeks ago"
    },
    {
      id: "15",
      title: "Framer Motion Animation",
      thumbnail: "https://i.ytimg.com/vi/nwJ1AJo8vvY/hqdefault.jpg",
      channel: "UI Wizard",
      views: "18K views",
      uploadDate: "5 days ago"
    },
    {
      id: "16",
      title: "How the Internet Works",
      thumbnail: "https://i.ytimg.com/vi/x3c1ih2NJEg/hqdefault.jpg",
      channel: "Tech Explained",
      views: "70K views",
      uploadDate: "1 month ago"
    },
    {
      id: "17",
      title: "Create REST API in Node",
      thumbnail: "https://i.ytimg.com/vi/l8WPWK9mS5M/hqdefault.jpg",
      channel: "Backend Series",
      views: "6.7K views",
      uploadDate: "1 week ago"
    },
    {
      id: "18",
      title: "HTML5 Full Course",
      thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/hqdefault.jpg",
      channel: "Code Camp",
      views: "81K views",
      uploadDate: "1 month ago"
    },
    {
      id: "19",
      title: "Build E-commerce Website",
      thumbnail: "https://i.ytimg.com/vi/ONfVZ-0qdJg/hqdefault.jpg",
      channel: "Project Code",
      views: "32K views",
      uploadDate: "2 weeks ago"
    },
    {
      id: "20",
      title: "Deploy MERN App",
      thumbnail: "https://i.ytimg.com/vi/rltfdjcXjmk/hqdefault.jpg",
      channel: "MERN Guide",
      views: "12K views",
      uploadDate: "4 days ago"
    }
  ]
  