import { configureStore } from "@reduxjs/toolkit";
import { CalendarSlice } from "./calendar/CalendarSlice"; 
import { uiSlice } from "./ui/uiSlice";
export const store = configureStore({
    reducer: {
        calendar: CalendarSlice.reducer,
        ui: uiSlice.reducer //referencía a nuestro reducer
    }
})