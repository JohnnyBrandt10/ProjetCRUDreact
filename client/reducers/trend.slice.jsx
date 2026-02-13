import { createSlice } from '@reduxjs/toolkit';

const trendSlice = createSlice({
  name: 'trend',
  initialState: {
    trends: []
  },
  reducers: {
    getTrends: (state, action) => {
      state.trends = action.payload;
    }
  }
});

export const { getTrends } = trendSlice.actions;
export default trendSlice.reducer;
