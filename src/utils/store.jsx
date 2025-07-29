import { configureStore } from "@reduxjs/toolkit";
import appslice from "./appslice";
import searchSlice from "./searchSlice";
import Chatslice from "./Chatslice";

const store=configureStore({
  reducer:{
    app:appslice,
    search:searchSlice,
    chat:Chatslice
  }
})

export default store