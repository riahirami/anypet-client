import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import {

  selectAuth,
} from "../../../../redux/slices/authSlice";
import {
  useProfileQuery,
  useResendEmailVerificationMutation,
  useUpdateUserMutation
} from "../../../../redux/api/authApi";
import { Alert, AlertTitle, Avatar, Container } from "@mui/material";
import Spinner from "../../../../Components/Spinner/spinner";
import { useTranslation } from "react-i18next";
import { dashboard } from "../../../../core/constant/dashboard";
import CustomModal from "../../../../Components/Modal/CustomModal";
import {
  Button,
  Grid,
  Typography, Divider, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField, IconButton
} from "@mui/material";
import { getToken } from "core/utils/functionHelpers";
import { CustomContainerProfile, CustomGlobalGrid, CustomGridCover, CustomGridProfileInformations } from "./Profile.style"
import { resendEmailVerificationMsg } from "core/constant/resendEmailVerification";
import AlertComponent from "Components/Alert/Alert";
import { message } from "core/constant/message";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

interface FormValues {
  firstname: string;
  lastname: string;
  phone: string;
  address?: string;
}

const initialFormValues: FormValues = {
  firstname: '',
  lastname: '',
  phone: '',
  address: '',
};

function Profile() {
  const { token } = useAppSelector(selectAuth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const tokenValue = getToken();
  const [showModal, setShowModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const {
    data: dataProfile,
    isError,
    isSuccess,
    isLoading,
  } = useProfileQuery(tokenValue.token);
  const [
    updateInformation,
    {
      data: informationData,
      isSuccess: informationSuccess,
      isError: informationError,
      isLoading: informationLoading,
    },
  ] = useUpdateUserMutation();

  const [
    resendEmail,
    {
      data: resendEmailData,
      isLoading: loadingResend,
      isSuccess: successResend,
      isError: errorResend,
    },
  ] = useResendEmailVerificationMutation();



  const { firstname, lastname, email, phone, avatar } = dataProfile?.user ?? {};

  function handleLogout() {
    // dispatch(logout);
    if (token) {
      localStorage.clear();
      navigate("/signin");
    }
  }

  async function handleResendEmail() {
    const responseResend = await resendEmail(tokenValue);

    if (responseResend) {
      setDescriptionModal(resendEmailVerificationMsg.successResendEmail);
      setShowModal(true);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const handleSubmitUpdateInformation = async () => {
    await updateInformation(formValues)
    handleClose();


  };

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div>
        <Alert
          severity="warning"
          sx={{ height: "60", t: "center", paddingLeft: "30%" }}
        >
          <AlertTitle>Warning</AlertTitle>
          {dashboard.checkEmailMsg}
        </Alert>

        <Button
          type="button"
          onClick={() => handleResendEmail()}
          disabled={isLoading}
        >
          resend email verification
        </Button>
        
        {loadingResend && <Spinner />}

        {loadingResend ? (
          <Spinner />
        ) : successResend ? (
          showModal && (
            <CustomModal
              title="Verification email"
              description={descriptionModal}
            />
          )
        ) : errorResend ? (
          <Alert severity="error" sx={{ height: "60", textAlign: "center" }}>
            <AlertTitle>Error</AlertTitle>
            {resendEmailVerificationMsg.errorResendEmail}
          </Alert>
        ) : null}
      </div>
    );

  if (isSuccess && dataProfile?.user)


    return (
      <>
        {informationSuccess && (
          <AlertComponent
            title={message.INFORMATIONCHANGED}
            severity="success"
            variant="filled"
          />
        )}
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Update your information"}</DialogTitle>
          <DialogContent >
            <TextField
              autoFocus
              margin="dense"
              id="firstname"
              label="firstname"
              type="text"
              fullWidth
              value={formValues.firstname}
              variant="standard"
              placeholder={firstname}
              onChange={handleChangeField}
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastname"
              label="lastname"
              type="text"
              fullWidth
              variant="standard"
              value={formValues.lastname}
              placeholder={lastname}
              onChange={handleChangeField}
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="phone"
              type="text"
              fullWidth
              value={formValues.phone}
              variant="standard"
              placeholder={phone}
              onChange={handleChangeField}
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="address"
              type="text"
              fullWidth
              variant="standard"
              multiline
              value={formValues.address}
              minRows={2}
              onChange={handleChangeField}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitUpdateInformation} disabled={informationLoading}>Valide</Button>
          </DialogActions>
        </Dialog>

        <CustomGlobalGrid>
          <CustomContainerProfile>
            <CustomGridCover item>
              <Avatar sx={{ width: 120, height: 120 }} alt={firstname} src={avatar} />

            </CustomGridCover>

            <Divider>
              <Typography variant="h5" style={{ padding: '15px' }}>Welcome {firstname} </Typography>

            </Divider>

            <CustomGridProfileInformations container >
              <Grid item>
                <Typography>First name: {firstname}</Typography>
              </Grid>
              <Grid item>
                <Typography>Last name: {lastname}</Typography>
              </Grid>
              <Grid item>
                <Typography>Email: {email}</Typography>
              </Grid>
              <Grid item>
                <Typography>Phone: {phone}</Typography>
              </Grid>
              <Grid item>
                <IconButton color="info" onClick={() => handleClickOpen()}>
                  <BorderColorOutlinedIcon />
                </IconButton>
              </Grid>
            </CustomGridProfileInformations>
            <Divider />
          </CustomContainerProfile>
        </CustomGlobalGrid>


      </>
    );
  else return <p>{t("profile.user_not_found")}</p>;
}

export default Profile;
