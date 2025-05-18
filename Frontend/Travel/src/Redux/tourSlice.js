import { createSlice } from "@reduxjs/toolkit";

const tourSlice = createSlice({
    name: "tour",
    initialState: {
        count: 0, // Initial tour count
    },
    reducers: {
        setTourCount: (state, action) => {
            state.count = action.payload;
        },
    }
});

export const { setTourCount } = tourSlice.actions;
export default tourSlice.reducer;
