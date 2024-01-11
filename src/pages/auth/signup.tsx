import {
  LockOutlined
} from "@mui/icons-material"

// Validation
import { useForm } from "react-hook-form";

import {
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';

import { Link } from "react-router-dom";
import axios from '../../http/axios';


export default function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (data: any) => {
    await axios.post('/auth/signup', data);
  }


  return (
    <main className='w-full min-h-screen h-full flex flex-col gap-20 items-center justify-between py-20'>

      {/* Signin Form */}
      <div className="w-1/3 flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col items-center gap-2 font-roboto">
          <span className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-full">
            <LockOutlined className="w-14 h-14 text-white " />
          </span>
          <div>
            <h1 className="text-2xl">Sign up</h1>
          </div>
        </div>

        <Box
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
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

          {/* Full Name */}
          <div className="w-full flex flex-col gap-2 items-start">
            <TextField
              sx={{
                width: '100%'
              }}
              id="text"
              label="Full Name"
              variant="outlined"
              autoComplete="off"
              {...register('fullname', { required: true, maxLength: 80, minLength: 2, pattern: /^[A-Za-z\s]+$/i })}
            />
            {errors.fullname && errors.fullname.type == "required" && <span className="text-sm text-red-500">This field is required</span>}
            {errors.fullname && errors.fullname.type === "maxLength" && <span className="text-sm text-red-500">Max length exceeded</span>}
            {errors.fullname && errors.fullname.type === "minLength" && <span className="text-sm text-red-500">Min Length</span>}
            {errors.fullname && errors.fullname.type === "pattern" && <span className="text-sm text-red-500">Alphabetical characters only</span>}

          </div>

          {/* Email */}
          <div className="w-full flex flex-col gap-2 items-start">
            <TextField
              sx={{
                width: '100%'
              }}
              id="email"
              label="Email Address"
              variant="outlined"
              autoComplete="off"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type == "required" && <span className="text-sm text-red-500">This field is required</span>}
            {errors.email && errors.email.type === "pattern" && <span className="text-sm text-red-500">Invalid email format</span>}
          </div>

          {/* Password */}
          <div className="w-full flex flex-col gap-2 items-start">
            <TextField
              sx={{
                width: '100%'
              }}
              id="password"
              label="Password"
              type="password"
              {...register('password', { required: true, minLength: 8, maxLength: 20 })}
            />
            {errors.password && errors.password.type == "required" && <span className="text-sm text-red-500">This field is required</span>}
            {errors.password && errors.password.type === "maxLength" && <span className="text-sm text-red-500">Max length exceeded</span>}
            {errors.password && errors.password.type === "minLength" && <span className="text-sm text-red-500">Password must be more than 8</span>}
          </div>

          {/* Sign in Button */}
          <Button
            type="submit"
            sx={{
              width: '100%',
              height: '50px',
            }}
            variant="contained">
            Sign Up
          </Button>

          {/* Have an Account */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'end'
            }}>
            <Link
              className="hover:text-blue-600 hover:underline"
              to={'/auth/login'}
            >
              Already Have an , Sign In?
            </Link>
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
