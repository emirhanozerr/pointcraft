import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PortfolioState {
  activeFilter: string
}

const initialState: PortfolioState = {
  activeFilter: 'all',
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload
    },
  },
})

export const { setActiveFilter } = portfolioSlice.actions
export default portfolioSlice.reducer
