import { createSlice } from "@reduxjs/toolkit";


// Slice for managing application-level UI state (like menu visibility)
const appslice=createSlice({
    name:"app",
    initialState:{
        isMenuOpen:false   // Initial state of the side menu (closed)
    },
    reducers:{
          // Toggle the menu open/close
        toggle:(state)=>{
            state.isMenuOpen=!state.isMenuOpen
        },
    }, 
})

  // Toggle the menu open/close
export const{toggle}=appslice.actions;

// Export the reducer to be included in the store
export default appslice.reducer;