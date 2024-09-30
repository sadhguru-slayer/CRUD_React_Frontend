/* eslint-disable no-unused-vars */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function MyTextFields(props) {
  const { label, placeholder, name, control, width } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          id="standard-basic"
          label={label}
          onChange={onChange}
          value={value}
          variant="standard"
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
          sx={{ width: width }} 
        />
      )}
    />
  );
}
