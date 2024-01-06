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

export default function Login() {
  return (
    <main className='w-full min-h-screen h-full flex flex-col gap-20 items-center justify-between py-20'>

      {/* Signin Form */}
      <div className="w-1/3 flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col items-center gap-2 font-roboto">
          <span className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-full">
            <LockOutlined className="w-14 h-14 text-white " />
          </span>
          <div>
            <h1 className="text-2xl">Sign in</h1>
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
            gap: '10px'
          }}
          noValidate
          autoComplete="off">

          {/* Email */}
          <TextField
            sx={{
              width: '100%'
            }}
            id="email"
            label="Email Address"
            variant="outlined"
            required
            autoComplete="off"
          />

          {/* Password */}
          <TextField
            sx={{
              width: '100%'
            }}
            id="password"
            label="Password"
            type="password"
          />

          {/* Remember Me */}
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me" />

          {/* Sign in Button */}
          <Button
            sx={{
              width: '100%',
              height: '50px',
            }}
            variant="contained">
            Sign in
          </Button>

          {/* Forgot Password & Don't Have an Account */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Typography
              sx={{
                cursor: 'pointer',
                ":hover": { color: 'darkblue', textDecoration: 'underline' }
              }}>
              Forgot password?
            </Typography>
            <Typography sx={{
              cursor: 'pointer',
              ":hover": { color: 'darkblue', textDecoration: 'underline' }
            }}>
              Don't have an account, Sign up?
            </Typography>
          </Box>

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
