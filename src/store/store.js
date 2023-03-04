import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { CalendarSlice } from "./calendar/CalendarSlice"; 
import { uiSlice } from "./ui/uiSlice";
export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        calendar: CalendarSlice.reducer,
        ui:       uiSlice.reducer //referencía a nuestro reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})