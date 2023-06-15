import React, { useEffect, useState } from "react";
import {
  useGetAdByIdQuery,
  useListFavoriteQuery,
  useSetFavoriteMutation,
} from "../../redux/api/adsApi";
import { Ad } from "../../core/models/ad.model";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/spinner";
import {
  Avatar,
  Box,
  IconButton,
  Button,
  CardMedia,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField, Typography
} from "@mui/material";

import AdCard from "../../Components/Card/AdsCard";
import { formaDateTime, getState } from "core/services/helpers";
import FavoriteIcon from "@mui/icons-material/Favorite";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { getCurrentUser } from "core/utils/functionHelpers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomLink from "Components/CustomLink/CustomLink"
import AlertComponent from "Components/Alert/Alert";
import { message as CONSTMessage } from "core/constant/message"
import { Comment } from "../../Components/Comment/Comment";
import { Props } from "Components/AppBar/Appbar.props";
import { useCreateReservationsMutation } from "redux/api/reservationApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { selectCategory } from "redux/slices/categorySlice";
import { CustomGlobalGrid } from '../../Components/Advertises/Advertises.style';

import 'react-animated-slider/build/horizontal.css';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./Slider.settings";
import { themes } from "Theme/Themes";



const AdDetails: React.FC<Props> = ({ mode,
  handleThemeChange }) => {


  const { id } = useParams();
  const { data: { data: adData } = {}, isLoading } = useGetAdByIdQuery(id);
  const [AdDetails, setAdDetails] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [setFavorit, { data: datasetFavoris, isSuccess: successFavoris }] =
    useSetFavoriteMutation();

  const user = getCurrentUser();

  const { data, refetch } = useListFavoriteQuery(user?.user?.id);
  const [makeReservation, {data:ReservationData, isSuccess: successReservation, isLoading: reservationLoading, isError }] = useCreateReservationsMutation();

  const [isFavorite, setIsFavorit] = useState<boolean>();

  const categories = useSelector(selectCategory);

  const listFavorites = useSelector((state: any) => state.favorite.favoriteList);

  const changeIdtoCategory = (id: string) => {
    const category = categories?.data?.find((cat: any) => cat.id == id);
    return category?.title;
  };


  useEffect(() => {
    setAdDetails(adData);
  }, [adData]);


  // TODO optimise this function or replace it by a slice
  const checkIsFavorit = async (id: any) => {
    const favoris = await data?.data.find((fav: any) => fav.ad_id == id);
    if (favoris) {
      setIsFavorit(true);
    } else {
      setIsFavorit(false);
    }
  };

  useEffect(() => {
    checkIsFavorit(adData?.id);
  }, [isLoading]);

  const dispatch = useDispatch();

  const setfavorit = async (id: any) => {
    await setFavorit(id);
    await checkIsFavorit(id);
    // dispatch(toggleFavorite(id));

    refetch();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeMessageField = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessage(e.target.value);
  };
  const [selectedPicker, setSelectedPicker] = useState(false);

  const [dateValue, setDateValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("");


  const handleDatePicker = (date: dayjs.Dayjs | null | string) => {
    setSelectedPicker(true);
    const datePicker = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    const dateString = datePicker?.substring(0, 10).replace(/-/g, "");
    setDateValue(dateString);
  };

  const handleTimeChange = (time: any) => {
    const formattedTime = dayjs(time).format("HH:mm");
    setTimeValue(formattedTime);
  };

  useEffect(() => {
    if (successReservation)
      setOpen(false)
  }, [successReservation]);


  const makeReservationHandler = async () => {
    await makeReservation({
      receiver_id: adData?.user?.id,
      ad_id: adData?.id,
      message: message,
      reservation_date: dateValue + " " + timeValue,
    });
  }
  
  return (
    <CustomGlobalGrid>
      {successReservation && (
        <AlertComponent
          title={CONSTMessage.RESERVATIONSEND}
          severity="success"
        />
      )}
              {isError && <AlertComponent title={CONSTMessage.ERRORRESERVATIONSEND} severity={"error"} />}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Choose a date and add a message to your reservation request"}</DialogTitle>
        <DialogContent >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", 'TimePicker']}>
              <DatePicker
                value={dateValue}
                label="Choose your date"
                onChange={(newDate) => handleDatePicker(newDate)}
              />
              <TimePicker
                value={timeValue}
                label="Schedule the time"
                onChange={(newTime) => handleTimeChange(newTime)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="message"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            multiline
            minRows={2}
            onChange={handleChangeMessageField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => makeReservationHandler()} disabled={reservationLoading}>Valide</Button>
        </DialogActions>
      </Dialog>


      <Grid item xs={12} md={12}>
        {isLoading && <Spinner />}

        <Grid container justifyContent="space-between">
          <Grid item xs={7} md={7}>
            <Box sx={{ p: "5px" }}>
              <Typography component="h1">{adData?.title}</Typography>
            </Box>
            <Typography sx={{ mb: "10px", p: "5px" }}>
              <LabelImportantIcon color="primary"></LabelImportantIcon>
              Category:{" "}
              <CustomLink to={`/advertise/category/${adData?.category_id}`}>
                {changeIdtoCategory(adData?.category_id)}
              </CustomLink>{" "}
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="add to favorites"
              onClick={() => setfavorit(adData.id)}
              sx={{ marginLeft: "auto" }}
            >
              {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
            </IconButton>
          </Grid>
        </Grid>

        {/* <Box  sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: " center" }} > */}
        <Grid style={{ width: "96vh", margin: "auto" }}>

          <Slider {...settings} >

            {adData &&
              adData?.media?.map((media: any) => {
                return (
                  <Grid item key={media.id} xs={12} sm={12} md={12} lg={12}>
                    <CardMedia style={{
                      objectFit: "contain"
                    }}
                      component="img"
                      // width="200"
                      height="400"
                      image={media.file_path}
                      key={media.id}
                    />
                  </Grid>
                );
              })}
          </Slider>
        </Grid>
        {/* </Box> */}

        <Grid
          container
          sx={{ mt: "30px", p: "5px" }}
          justifyContent={"space-between"}
        >
          <Grid item>
            <CustomLink to={"/user/details/" + adData?.user?.id}>
              <Avatar src={adData?.user?.avatar}></Avatar>
            </CustomLink>
            <Typography>
              <CustomLink to={"/user/details/" + adData?.user?.id}>
                {adData?.user?.firstname} {adData?.user?.lastname}
              </CustomLink>
            </Typography>
          </Grid>

          {user?.user?.id !== adData?.user_id &&
            <>
              <Grid item alignItems={"flex-end"}>
                <Button onClick={handleClickOpen} variant="contained">reservation</Button>
              </Grid><Grid item alignItems={"flex-end"}>
                <CustomLink to={"/user/messages/" + adData?.user?.id}>
                  <Button variant="contained">send message</Button>
                </CustomLink>
              </Grid>
            </>
          }
        </Grid>
        <Divider />
        <Typography sx={{ mb: "10px", p: "10px" }}>
          {adData?.description}
        </Typography>
      </Grid>

      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon sx={{ color: "warning.main" }} />
          <Typography>{getState(adData?.state)} - {adData?.city}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon sx={{ color: "warning.main" }} />
          <Typography>{adData?.street}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MarkunreadMailboxIcon sx={{ color: "warning.main" }} />
          <Typography>{adData?.postal_code}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalPhoneIcon sx={{ color: "warning.main" }} />
          <Typography>+216 {adData?.user?.phone}</Typography>
        </Grid>
      </Grid>
      <Grid>
        <Comment handleThemeChange={handleThemeChange} mode={mode} />
      </Grid>
    </CustomGlobalGrid>
  );
};

export default AdDetails;
