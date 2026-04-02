import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '@/lib/store/slices/uiSlice'
import contactReducer from '@/lib/store/slices/contactSlice'
import portfolioReducer from '@/lib/store/slices/portfolioSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      contact: contactReducer,
      portfolio: portfolioReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
