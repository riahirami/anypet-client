import React from "react";
import { useState } from "react";

import {
  useForgotPasswordMutation,
  useUpdateAvatarMutation,
} from "../../../redux/api/authApi";
import { Button, TextField, Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Spinner from "../../../Components/Spinner/spinner";
import CustomModal from "../../../Components/Modal/CustomModal";
import AlertComponent from "../../../Components/Alert/Alert";
import {message} from "../../../core/constant/message";
import Profile from './Profile/Profile';
import { UserDetails } from "pages/UserDetails/UserDetails";
import { getCurrentUser } from "core/utils/functionHelpers";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  password: "",
};

const Update = () => {
  const [avatarImg, setAvatarImg] = useState<File | null>(null);

  const [value, setValue] = React.useState("1");
  const [showModal, setShowModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");

  const [formValue, setFormValue] = useState(initialState);
  const { firstname, lastname, email, password, phone, address, avatar } = formValue;

  const currentUser = getCurrentUser();
  const [
    updateAvatar,
    {
      data: avatarData,
      isSuccess: avatarSuccess,
      isError: avatarError,
      isLoading: AvatarLoading,
    },
  ] = useUpdateAvatarMutation();

  

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChangeFormAvatar = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imgFile = event?.target?.files?.[0];
    if (imgFile) {
      setAvatarImg(imgFile);
    }
  };

  const handleAddAvatar = async () => {
    const formData = new FormData();
    if (avatarImg) {
      formData.append("avatar", avatarImg);
      updateAvatar(formData)
        .unwrap()
        .then(() => {
          setShowModal(true);
        });
    }
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

  function handleChangeForm(e: any) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  // TODO: check for undefined on the first click
  const handleSubmitForgotPassword = async () => {
    await forgotPassword(email);

    if (responseForgotData) {
      setDescriptionModal(responseForgotData?.message);
      setShowModal(true);
    }
  };
  return (
    <div>
      {forgotLoading && <Spinner />}
      {avatarSuccess && (
        <AlertComponent
          title={message.AVATARCHANGED}
          severity="success"
        />
      )}

      <Box sx={{ width: "100%", typography: "body1", mt:10 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} >
              <Tab label="Profile" value="1" />
              <Tab label="Update Avatar" value="2" />
              <Tab label="Change password" value="3" />
            </TabList>
          </Box>
          
          <TabPanel value="1">
            
            <Profile />
            {/* <UserDetails userId={currentUser?.user?.id} /> */}
            
          </TabPanel>

          <TabPanel value="2">
            {" "}
          <Grid style={{ display:"flex"  }}>
          <TextField
              label="Avatar"
              color="primary"
              type="file"
              onChange={handleChangeFormAvatar}
            />
            <Button
              variant="contained"
              size="large"
              type="button"
              disabled={AvatarLoading}
              onClick={handleAddAvatar}
            >
              save
            </Button>  </Grid>  
          </TabPanel>

          <TabPanel value="3">
          <Grid style={{ display:"flex"  }}> 
           <TextField
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChangeForm}
              value={email}
              autoFocus
            />
            <Button
              type="button"
              onClick={handleSubmitForgotPassword}
              variant="contained"
              disabled={forgotLoading}
              size="medium"

            >
              Reset Password
            </Button>
            </Grid>
          </TabPanel>
        </TabContext>
      
      
      </Box>
    </div>
  );
};

export default Update;
