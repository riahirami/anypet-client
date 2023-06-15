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
import { useChangeStatusAdsMutation, useListFavoriteQuery, useSetFavoriteMutation } from "redux/api/adsApi";
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

  const dispatch = useDispatch();

  const [setFavorit, { data: datasetFavoris, isSuccess: successFavoris }] =
    useSetFavoriteMutation();

  const [isFavorite, setIsFavorite] = useState<boolean>();


  const currentUser = useSelector((state: RootState) => state.auth);

  const id = currentUser?.user?.id

  const { data: dataFavorite, isSuccess: successFavorite, refetch: refetchFavortie } = useListFavoriteQuery(id);
  const [listFavorite, setListFavorite] = useState<Ad[]>([]);


  const { handleDeleteAd } = useDeleteAd();

  const [menuAnchor, setMenuAnchor] = useState(null);


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
  const listFavorites = useSelector((state: any) => state.favorite.favoriteList);

  useEffect(() => {
    if (successFavorite) {
      refetchFavortie();
    }
  }, [successFavorite]);

  useEffect(() => {
    if (adData)
      checkIsFavorit(adData.id);

  }, []);


  const changeIdtoCategory = (id: string) => {
    const category = categories?.data?.find((cat: any) => cat.id == id);
    return category?.title;
  };

  const checkIsFavorit = async (id: any) => {
    if (listFavorites) {
      const isFavorite = listFavorites.data?.find((fav: any) => fav.ad_id === id);
      if (isFavorite)
        setIsFavorite(true);
      else
        setIsFavorite(false);
    }


  }

  const setfavorit = async (id: any) => {
    await setFavorit(id);
    setIsFavorite(!isFavorite);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {successChangeStatus && (
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
        // width: "65vh",
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
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      <MenuItem>
                        <CustomLink to={"/advertise/update/" + adData.id}>Update</CustomLink>
                      </MenuItem>
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

       
        </CardContent>
        <CardActions disableSpacing>
          <Grid container justifyContent="space-between">
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <IconButton
                aria-label="add to favorites"
                onClick={() => setfavorit(adData.id)}
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
