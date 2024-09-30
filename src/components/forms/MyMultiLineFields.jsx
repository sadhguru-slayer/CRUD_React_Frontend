import * as React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';

export default function MyMultiLineFields(props) {
    const {label,placeholder,name,control,width} = props
  return (   
    <Controller 
    name = {name}
    control={control}

        render={({
            field:{onChange,value},
            fieldState:{error},
            formState,
        }) => (
            <TextField id="standard-multiline-static" label={label} multiline rows={1.25} placeholder={placeholder} variant="standard"
            onChange={onChange}
            value={value}
            error={!!error}
            helperText={error?.message}
            sx={{width:{width}}} />

        )
    }
    />
  );
}

