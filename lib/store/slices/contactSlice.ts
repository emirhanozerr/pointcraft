import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

interface ContactState {
  formData: ContactFormData
  status: 'idle' | 'sending' | 'success' | 'error'
  errorMessage: string | null
}

const initialState: ContactState = {
  formData: {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  },
  status: 'idle',
  errorMessage: null,
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof ContactFormData; value: string }>) => {
      state.formData[action.payload.field] = action.payload.value
    },
    setStatus: (state, action: PayloadAction<'idle' | 'sending' | 'success' | 'error'>) => {
      state.status = action.payload
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload
    },
    resetForm: (state) => {
      state.formData = initialState.formData
      state.status = 'idle'
      state.errorMessage = null
    },
  },
})

export const { updateField, setStatus, setErrorMessage, resetForm } = contactSlice.actions
export default contactSlice.reducer

