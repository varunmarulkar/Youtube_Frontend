function videoDate(dateDetails){
   const now=new Date()   // Get current time
   const past=new Date(dateDetails) // Convert input date to Date object
   const diff=(now-past)/1000  // Difference in seconds


   if(diff<60)return `${Math.floor(diff)} seconds ago`   // Less than a minute
   if(diff<3600) return `${Math.floor(diff/60)} minutes ago`   // Less than an hour
   if(diff<86400) return `${Math.floor(diff/3600)} hours ago`  // Less than a day
   if(diff<2592000) return `${Math.floor(diff/86400)} days ago` //Less than a month
   if(diff<31104000) return `${Math.floor(diff/2592000)} months ago` //Less than a year
   return `${Math.floor(diff)} years ago`
}

const getDate=(mainDate)=>{
  return videoDate(mainDate)
}

export default videoDate

