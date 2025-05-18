import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "./tourSlice";
import bookingReducer from "./bookingSlice"
import expenseReducer from "./expenseSlice"


const store = configureStore({
    reducer: {
        tour: tourReducer, // Register tour slice
        booking: bookingReducer,
        expense: expenseReducer,
    },
});

export default store;
