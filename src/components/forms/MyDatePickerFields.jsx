import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import {Controller} from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

const tomorrow = dayjs().add(1, 'day');

export default function ValidationBehaviorInput(props) {
    const {name,control,label,width}=props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller 
    name = {name}
    control={control}

        render={({
            field:{onChange,value},
            fieldState:{error}, 
            formState,
            
        }) => (
            <DatePicker defaultValue={tomorrow}
            sx={{width:{width}}} 
             label={label} 
             onChange={onChange}
            value={value}
            slotProps={{
              textField:{
                error: !!error, 
                helperText: error?.message,
              }

        }}
          />
        )
    }
    />
    </LocalizationProvider>
  );
}