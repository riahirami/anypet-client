import React, { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useForgotPasswordMutation,
} from "../../redux/api/authApi";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/authSlice";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import Spinner from "../../Components/Spinner/spinner";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  Chip,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CustomModal from "../../Components/Modal/CustomModal";
import AlertComponent from "../../Components/Alert/Alert";
import { ServerResponse } from "../../core/models/authState.model";
import { getCurrentUser } from "core/utils/functionHelpers";
import { useSelector, useDispatch } from "react-redux";

import LockOpenIcon from '@mui/icons-material/LockOpen';
import { CustomAvatar, CustomButton, CustomImg, CustomSignInBox } from "./Signin.style";
import { message } from "core/constant/message";

const initialState = {
  lastname: "",
  firstname: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  password: "",
};

const theme = createTheme();
const Signin = () => {
  const [showModal, setShowModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");

  const [formValue, setFormValue] = useState(initialState);
  const { firstname, lastname, email, password, phone, address, avatar } =
    formValue;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [
    loginUser,
    { isSuccess,
      isError: isLoginError,
      error: loginError,
      isLoading: isLoginLoading,
    },
  ] = useLoginUserMutation();

  function handleChangeForm(e: any) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }


  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async () => {
    if (!(email && password)) {
      setShowModal(true);
    }

    const loginData: any = await loginUser({ email, password });
    setShowAlert(false)

    if (!!loginData?.data) {
      dispatch(
        setUser({ token: loginData.data.token, user: loginData.data.user })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: loginData?.data.user,
          token: loginData?.data.token,
        })
      );

      navigate('/home');
    }
    else

      setShowAlert(true)
  };

  const [
    forgotPassword,
    {
      data: responseForgotData,
      isLoading: forgotLoading,
      isSuccess: forgotSuccess,
      error: forgotError,
    },
  ] = useForgotPasswordMutation();

  // TODO: check for undefined on the first click
  const handleSubmitForgotPassword = async () => {
    await forgotPassword(email);

    if (responseForgotData) {
      setDescriptionModal(responseForgotData?.message);
      setShowModal(true);
    }
  };

  if (showModal)
    return (
      <CustomModal title="Forgot password" description={descriptionModal} />
    );
  if (forgotLoading) return <Spinner />;

  return (
    <ThemeProvider theme={theme}>

      {showAlert && <AlertComponent title={message.ERRORLOGIN} severity={"error"} />}

      <Container component="main" maxWidth="xs">
        <Grid container >

          <Grid item>
            <CustomImg
              src={process.env.PUBLIC_URL + "/illustrations/5540711.jpg"}
              alt="Man playing with a dog"
              
            ></CustomImg>
          </Grid>
        </Grid>


        <CssBaseline />
      
        <CustomSignInBox >
          <CustomAvatar >
            {isSuccess ? <LockOpenIcon color="info" /> : <LockOutlinedIcon color="info" />}

          </CustomAvatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChangeForm}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChangeForm}
              autoComplete="current-password"
            />
            <Grid container>
              <Grid item>
                <Button
                  type="button"
                  onClick={handleSubmitForgotPassword}
                  variant="text"
                  disabled={forgotLoading}
                >
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
            <CustomButton
              type="button"
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={isLoginLoading}
            >
              Sign In
            </CustomButton>

            <Divider>
              <Chip label="Don't have an account ?" />
            </Divider>
            <CustomButton
              href="/signup"
              type="button"
              fullWidth
              variant="contained"
            >
              {"Sign Up"}
            </CustomButton>
            <Grid item></Grid>
          </Box>


        </CustomSignInBox>

      </Container>
    </ThemeProvider>
  );
};

export default Signin;
