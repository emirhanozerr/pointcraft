'use client'

import { TextField, MenuItem } from '@mui/material'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Option { value: string; label: string }

interface CoreSelectProps {
  registration: UseFormRegisterReturn
  label: string
  options: Option[]
  error?: boolean
  helperText?: string
  defaultLabel?: string
}

const CoreSelect = ({ registration, label, options, error, helperText, defaultLabel }: CoreSelectProps) => (
  <TextField
    select
    fullWidth
    label={label}
    error={error}
    helperText={helperText}
    defaultValue=""
    {...registration}
    sx={{ '& .MuiInputLabel-root': { color: 'rgba(0,0,0,0.6)' } }}
  >
    {defaultLabel && <MenuItem value="">{defaultLabel}</MenuItem>}
    {options.map(({ value, label: optLabel }) => (
      <MenuItem key={value} value={value}>{optLabel}</MenuItem>
    ))}
  </TextField>
)

export default CoreSelect
