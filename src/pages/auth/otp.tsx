import React from 'react';
import {
  LockOutlined
} from "@mui/icons-material"

import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography
} from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Link } from "react-router-dom";


export default function OTP() {
  const [otp, setOtp] = React.useState('');

  // Handle OTP Change
  const handleChange = (newValue: any) => {
    setOtp(newValue)
  }

  return (
    <main className='w-full min-h-screen h-full flex flex-col gap-20 items-center justify-between py-20'>
      <div className="w-1/3 flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col items-center gap-2 font-roboto">
          <span className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-full">
            <LockOutlined className="w-14 h-14 text-white " />
          </span>
          <div>
            <h1 className="text-2xl">OTP</h1>
          </div>
        </div>

        <Box
          component={'form'}
          sx={{
            // '& > :not(style)': { m: 1, width: '50ch' },
            width: '300px',
            '@media (min-width: 600px)': {
              width: '400px'
            },
            '@media (min-width: 375px)': {
              width: '350px'
            },
            '@media (min-width: 425px)': {
              width: '400px'
            },
            '@media (min-width: 960px)': {
              padding: '0 0 ',
              width: '50ch'
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
          noValidate
          autoComplete="off">

          {/* OTP Field */}
          <MuiOtpInput
            sx={{
              width: '100%'
            }}
            length={6}
            id="otp"
            value={otp}
            onChange={handleChange} />

          {/* Submit Button */}
          <Button
            sx={{
              width: '100%',
              height: '50px',
            }}
            variant="contained">
            Submit
          </Button>
        </Box>
      </div>

      <Box>
        <Typography>
          Copyright © Dashboard1 2024
        </Typography>
      </Box>
    </main>
  )
}
