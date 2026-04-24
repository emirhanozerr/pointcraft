'use client'

import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'
import type { UseFormRegisterReturn } from 'react-hook-form'

type CoreInputProps = TextFieldProps & {
  registration: UseFormRegisterReturn
  error?: boolean
  helperText?: string
}

const CoreInput = ({ registration, error, helperText, ...props }: CoreInputProps) => (
  <TextField
    {...props}
    {...registration}
    error={error}
    helperText={helperText}
    sx={{
      '& .MuiInputLabel-root': { color: 'rgba(0,0,0,0.6)' },
      '& .MuiInputLabel-root.Mui-error': { color: '#d32f2f' },
      ...props.sx,
    }}
  />
)

export default CoreInput
