import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import { formaDateTime, statusToString } from "../../core/services/helpers";
import { Ad } from "../../core/models/ad.model";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useDeleteAd from "CustomHooks/useDeleteAd";
import { useChangeStatusAdsMutation, useListFavoriteQuery, useMarkAsAdoptedOrReservedMutation, useSetFavoriteMutation } from "redux/api/adsApi";
import { StatusOption } from "core/enums/status";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CustomLink from "Components/CustomLink/CustomLink"
import { message } from "core/constant/message"
import AlertComponent from "Components/Alert/Alert";
import { AdCardProps } from "./AdsCard.type";
import { themes } from '../../Theme/Themes';
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "redux/slices/categorySlice";



function AdCard({ adData, user, mode,
  handleThemeChange, }: AdCardProps) {

  const [setFavoritMutation, { data: datasetFavoris, isSuccess: successFavoris }] =
    useSetFavoriteMutation();

  const [isFavorite, setIsFavorite] = useState<boolean>();

  const currentUser = useSelector((state: RootState) => state.auth);
  const id = currentUser?.user?.id

  const { data: dataFavorite, isSuccess: successFavorite, refetch: refetchFavortie } = useListFavoriteQuery(id);
  const [listFavorite, setListFavorite] = useState<Ad[]>([]);


  const { handleDeleteAd } = useDeleteAd();

  const [menuAnchor, setMenuAnchor] = useState(null);

  const [
    markAsReservedOrAdopted,
    {
      data: ReservedOrAdoptedStatus,
      isLoading: loadingReservedOrAdoptedStatus,
      isSuccess: successReservedOrAdoptedStatus,
      isError: errorReservedOrAdoptedStatus,
    },
  ] = useMarkAsAdoptedOrReservedMutation()

  const [
    changeStatus,
    {
      data: dataChangeStatus,
      isLoading: loadingUpdateStatus,
      isSuccess: successChangeStatus,
      isError: errorChangeStatus,
    },
  ] = useChangeStatusAdsMutation()
  const handleStatusChange = async (
    adId: string | number | undefined,
    status: StatusOption
  ) => {
    changeStatus({ id: adId, status })
      .unwrap()
      .then(() => {
        // refetch();
      });
    // setStatusParams({ id: adId, status });
  };

  const handleMarkAsReservedOrAdopted = async (
    adId: string | number | undefined,
    status: StatusOption
  ) => {
    markAsReservedOrAdopted({ id: adId, status })
      .unwrap()
      .then(() => {
        // refetch();
      });
  };

  const handleMenuOpen = (event: any) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDelete = () => {
    if (adData.id) {
      handleDeleteAd(adData.id);
      handleMenuClose();
    }
  };

  const handleShowDetails = () => {
    handleMenuClose();
  };

  const categories = useSelector(selectCategory);
  // const listFavorites = useSelector((state: any) => state.favorite.favoriteList);

  useEffect(() => {
    if (successFavoris) {
      refetchFavortie();
    }
  }, [successFavoris]);

  const checkIsFavorit = async (id: any) => {
    if (dataFavorite && successFavorite) {
      const isFavorite = dataFavorite?.data?.find((fav: any) => fav.ad_id === id);
      isFavorite ? setIsFavorite(true) : setIsFavorite(false);
    }
  }

  const setfavoritHandle = async (id: any) => {
    await setFavoritMutation(id);
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (adData && successFavorite)
      checkIsFavorit(adData.id);

  }, [setFavoritMutation, dataFavorite, successFavorite]);


  const changeIdtoCategory = (id: string) => {
    const category = categories?.data?.find((cat: any) => cat.id == id);
    return category?.title;
  };



  return (
    <Box sx={{
      flexGrow: 1, '&:hover': {
        boxShadow: "0px -1px 15px -1px rgba(0,0,0,0.89)", transform: 'scale(1.03)',
        transition: `all 1500ms 2px`,
      }
    }}>

      {successChangeStatus && (
        <AlertComponent
          title={message.ADVERTISESTATUSCHANGED}
          severity="success"
        />
      )}

      {successReservedOrAdoptedStatus && (
        <AlertComponent
          title={message.ADVERTISESTATUSCHANGED}
          severity="success"
        />
      )}

      <Card key={adData.id} style={{
        backgroundColor: themes[mode].AdsCard.backgroundColor,
        maxWidth: "620px",
        margin: "auto",
        display: "block",
        // width: "100%",
      }}
      >
        <CardHeader
          avatar={
            <CustomLink to={"/user/details/" + adData?.user_id}>
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={user ? user?.avatar : adData?.user?.avatar}
              ></Avatar> </CustomLink>
          }
          action={
            <>
              {(currentUser?.user?.id == adData?.user_id ||
                currentUser?.user?.role_id == 2) && (
                  <>
                    <IconButton aria-label="settings" onClick={handleMenuOpen}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchor}
                      open={Boolean(menuAnchor)}
                      onClose={handleMenuClose}
                    >
                      {(adData?.status == StatusOption.Validated) ?
                        <MenuItem onClick={() => handleMarkAsReservedOrAdopted(adData?.id, StatusOption.Adopted)}>Adopted</MenuItem>
                        :
                        (adData?.status == StatusOption.Validated || adData?.status == StatusOption.Adopted) ?
                          <MenuItem onClick={() => handleMarkAsReservedOrAdopted(adData?.id, StatusOption.Validated)}>Not Adopted</MenuItem>
                          :
                          (adData?.status == StatusOption.Validated || adData?.status == StatusOption.Reserved) ?
                            <>  <MenuItem onClick={() => handleMarkAsReservedOrAdopted(adData?.id, StatusOption.Validated)}>Not Reserved</MenuItem>
                              <MenuItem onClick={() => handleMarkAsReservedOrAdopted(adData?.id, StatusOption.Adopted)}>Adopted</MenuItem> </> :
                            <></>

                      }
                      <MenuItem>
                        <CustomLink to={"/advertise/update/" + adData.id}>Update</CustomLink>
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </>
                )}
            </>
          }
          title={adData.user ? adData.user.firstname : ""}
          subheader={formaDateTime(adData.created_at)}
        />

        <CardContent sx={{
          height: "300px", margin: "auto"
        }}>
          <Grid container alignItems={"center"}>
            {adData && (
              <Grid
                item
                key={adData?.media?.[0].id}

              >
                <CardMedia
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                  component="img"
                  height="200"
                  image={adData?.media?.[0].file_path}
                  alt={adData?.media?.[0].id}
                  key={adData?.media?.[0].id}
                />
              </Grid>
            )}
          </Grid>
          <Typography variant="subtitle1" gutterBottom>
            {adData.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Category :{" "}
            <CustomLink to={`/advertise/category/${adData?.category_id}`}>
              {changeIdtoCategory(adData?.category_id)}
            </CustomLink>
          </Typography>
          <Typography variant="body1" color="text.secondary" noWrap>
            {adData.description}
          </Typography>
          {(currentUser?.user?.id === adData.user_id || adData.status != "0" && adData.status != "1" && adData.status != "2") && (
            <Typography
              color="textSecondary"
              noWrap
              variant="body2"
              gutterBottom
              style={{
                width: '100%',
                color: themes[mode].topbar.color,
                textAlign: 'center',
                margin: 'auto',
                backgroundColor:
                  adData.status == "0"
                    ? "orange"
                    : adData.status == "1"
                      ? "red"
                      : adData.status == "2"
                        ? "green"
                        : adData.status == "3"
                          ? "midnightblue"
                          : adData.status == "4"
                            ? "goldenrod"
                            : "inherit",
              }}
            >
              Status:  {statusToString(adData.status)}
            </Typography>
          )}

        </CardContent>
        <CardActions disableSpacing>
          <Grid container justifyContent="space-between">
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <IconButton
                aria-label="add to favorites"
                onClick={() => setfavoritHandle(adData.id)}
              >
                {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
              </IconButton>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <CustomLink to={"/advertise/" + adData.id}>
                <IconButton
                  color="default"
                  aria-label="details"
                  component="label"
                >
                  <VisibilityIcon />
                </IconButton>
              </CustomLink>
            </Grid>
            {currentUser?.user?.id !== adData.user_id && <Grid item xs={3} sm={3} md={3} lg={3}>

              <CustomLink to={"/user/messages/" + adData?.user_id}>
                <IconButton aria-label="send">
                  <ChatOutlinedIcon />
                </IconButton>
              </CustomLink>
            </Grid>}
          </Grid>

          {/* admin actions */}


        </CardActions>
        {currentUser?.user?.role_id == 2 && <Grid container style={{ padding: "5px" }}>
          <Grid item key={adData.id} xs={12} sm={4} md={4} lg={4} >
            <Button
              variant="contained"
              color="warning"
              disabled={loadingUpdateStatus}
              onClick={() =>
                handleStatusChange(adData.id, StatusOption.Waiting)
              }
            >Waiting</Button>
          </Grid>
          <Grid item key={adData.id} xs={12} sm={4} md={4} lg={4} >
            <Button
              variant="contained"
              color="success"
              disabled={loadingUpdateStatus}
              onClick={() =>
                handleStatusChange(adData.id, StatusOption.Validated)
              }
            >Valide</Button>
          </Grid>
          <Grid item key={adData.id} xs={12} sm={4} md={4} lg={4} >
            <Button
              variant="contained"
              color="error"
              disabled={loadingUpdateStatus}
              onClick={() =>
                handleStatusChange(adData.id, StatusOption.Canceled)
              }
            >Cancel</Button>
          </Grid>
        </Grid>}
      </Card>
    </Box>
  );
}

export default AdCard;
