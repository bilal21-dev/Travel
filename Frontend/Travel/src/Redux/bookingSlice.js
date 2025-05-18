import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        count: 0, // Initial tour count
    },
    reducers: {
        setBookingCount: (state, action) => {
            state.count = action.payload;
        },
    }
});

export const { setBookingCount } = bookingSlice.actions;
export default bookingSlice.reducer;
