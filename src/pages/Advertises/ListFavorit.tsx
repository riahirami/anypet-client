import React, { useEffect, useState } from "react";
import { useListFavoriteQuery } from "../../redux/api/adsApi";
import AdCard from "Components/Card/AdsCard";
import Spinner from "Components/Spinner/spinner";
import { Button, Grid, Typography, Container } from "@mui/material";
import { Ad } from "core/models/ad.model";
import { User } from "core/models/user.model";
import { PATHS } from "routes/Path";
import { useParams } from "react-router-dom";
import CustomLink from "Components/CustomLink/CustomLink"
import { Props } from "Components/AppBar/Appbar.props";
import CardSkeleton from "Components/Skeleton/CardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { CustomGlobalGrid } from "Components/Advertises/Advertises.style";

const ListFavorit: React.FC<Props> = ({
  mode,
  handleThemeChange,
}) => {

  const listFavorites = useSelector((state: any) => state.favorite.favoriteList);



  if (!listFavorites) return <Spinner />;

  if (listFavorites.count == 0)
    return (
      <CustomGlobalGrid sx={{mt:10}}>

        <Typography>No favorite advertises </Typography>
        <Button variant="text">
          <CustomLink to={PATHS.HOME}>See all</CustomLink>
        </Button>
      </CustomGlobalGrid>
    );

  return (
    <Grid sx={{mt:10}}>
      <Container >
        <Grid container spacing={1} sx={{mt:5}}>
          <Grid container spacing={2}>
            {listFavorites?.data?.map((ad: any) => (
              <Grid item key={ad.id} xs={12} sm={6} md={4} lg={3}>
                <AdCard key={ad.id} adData={ad?.ad} user={ad?.user} handleThemeChange={handleThemeChange} mode={mode} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}




export default ListFavorit;
