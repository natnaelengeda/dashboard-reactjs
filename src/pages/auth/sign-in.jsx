import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "../../http/axios";
import { useSnackbar } from "notistack";
import { LoginContext } from "@/context/LoginContext";

// Images
import background from "../../assets/images/background.jpg";

export function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const state = useContext(LoginContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignin = () => {
    axios
      .post(
        "/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        if (response.data.msg === "email") {
          enqueueSnackbar("Email Unkown", { variant: "error" });
          console.log("Email Unknown");
        }
        if (response.data.msg === "password") {
          enqueueSnackbar("Password Incorrect", { variant: "warning" });
        }
        if (response.data.msg === "success") {
          enqueueSnackbar("Login Success", { variant: "success" });
          // console.log(response.data);
          state.setDecoded(jwt_decode(response.data.accessToken));
          state.setLog(true);
          state.setAdminStyle(jwt_decode(response.data.adminStyle));

          localStorage.setItem(
            "decoded",
            JSON.stringify(jwt_decode(response.data.accessToken))
          );
          localStorage.setItem("log", true);
          localStorage.setItem(
            "adminStyle",
            JSON.stringify(jwt_decode(response.data.adminStyle))
          );

          navigate("/dashboard/home");
        }
      });
  };
  return (
    <>
      <img
        src={background}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              size="lg"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              size="lg"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleSignin} variant="gradient" fullWidth>
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
