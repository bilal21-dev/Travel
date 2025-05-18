import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        count: 0, // Initial tour count
    },
    reducers: {
        setExpenseCount: (state, action) => {
            state.count = action.payload;
        },
    }
});

export const { setExpenseCount } = expenseSlice.actions;
export default expenseSlice.reducer;
