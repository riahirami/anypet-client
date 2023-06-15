import {
  Grid,
  Avatar,
  Typography,
  Divider,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  Button,
  CardContent,
} from "@mui/material";
import { Ad } from "core/models/ad.model";
import React from "react";
import {  useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formaDateTime } from "core/services/helpers";
import CustomLink from "Components/CustomLink/CustomLink"
import {CustomGridAvatarName,CustomTypography,CustomBox} from "./UserDetails.style"
import { useUserDetailsQuery } from "redux/api/userApi";
import { CustomGlobalGrid } from "Components/Advertises/Advertises.style";
import { selectCategory } from "redux/slices/categorySlice";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: 550,
  },
});

export const UserDetails = (Props?: {userId:string}) => {
  const classes = useStyles();

  const { id } = useParams();
  const { data, isLoading } = useUserDetailsQuery(id || Props?.userId);

  const categories = useSelector(selectCategory);
  
  const changeIdtoCategory = (id: string) => {
    const category  = categories?.data?.find((cat: any) => cat.id == id);
    return category?.title;
  };

  const avatar = data?.data?.avatar;

  return (
    <CustomGlobalGrid>
      <CustomGridAvatarName container spacing={2} >
        <Grid item >
          <Avatar src={avatar}>Avatar</Avatar>
        </Grid>

        <Grid item >
          <Typography>
            {data?.data?.firstname} {data?.data?.lastname}
          </Typography>
        </Grid>
      </CustomGridAvatarName>
      <Grid container>
        <Grid container item spacing={2}>
          {data?.data?.ads?.map((adData: Ad) => (
            <Grid item key={adData?.id} xs={6} md={4} lg={4} >
              {/* <AdCard adData={adData} /> */}

              <Card className={classes.root} sx={{ height: "350px" }}>
                <CardMedia
                  component="img"
                  width="150"
                  height="150"
                  image={adData?.media?.[0].file_path}
                  alt={adData?.media?.[0].file_name}
                  key={adData?.media?.[0].id}
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {adData.title}
                  </Typography>
                  <CustomBox >
                    <CustomTypography
                      color="primary"
                      variant="body2"
                    >
                      Category:
                    </CustomTypography>
                    <Typography
                      variant="body2"
                      component="p"
                    >
                      <CustomLink to={`/advertise/category/${adData?.category_id}`}>
                        {changeIdtoCategory(adData?.category_id)}
                      </CustomLink>
                    </Typography>
                  </CustomBox>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    noWrap
                  >
                    {adData.description}
                  </Typography>
                  <Divider />
                  <CustomBox >
                    <CustomTypography
                      color="primary"
                    >
                      Published:
                    </CustomTypography>
                    <Typography
                      variant="body2"
                      component="p"
                    >
                      {formaDateTime(adData.created_at)}
                    </Typography>
                  </CustomBox>

                  
                </CardContent>
                <CustomBox>
                    <Button variant="contained" color="info" >
                      <CustomLink to={"/advertise/" + adData.id}>details</CustomLink>
                    </Button>
                  </CustomBox>

              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider />
        <Typography sx={{ marginTop: "20px" }}>Comments :</Typography>
        <Grid container item spacing={2}>
          {data?.data?.comments?.map((comment: any) => (
            <React.Fragment key={comment?.id}>
              <Grid item xs={12}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={<Avatar src={comment?.user?.avatar}></Avatar>}
                    action={
                      <IconButton aria-label="settings">
                        <CustomLink to={"/advertise/" + comment.ad_id}>
                          <ArrowForwardIosIcon />
                        </CustomLink>
                      </IconButton>
                    }
                    title={comment.description}
                    subheader={formaDateTime(comment.created_at)}
                  />
                </Card>
              </Grid>
              <Divider />
            </React.Fragment>
          ))}
        </Grid>
      </Grid>

    </CustomGlobalGrid>
  );
};
