import React, { useEffect, useState } from "react";
import { useGetAdsByCategoryQuery, useGetMediaByIdQuery } from "../../redux/api/adsApi";
import { useParams } from "react-router-dom";
import { Grid, Container, Typography } from "@mui/material";

import { Ad } from "../../core/models/ad.model";
import AdCard from "../../Components/Card/AdsCard";
import { Props } from "Components/AppBar/Appbar.props";
import { CustomGlobalGrid } from "Components/Categories/Categorie.style";
import CardSkeleton from "Components/Skeleton/CardSkeleton";


const AdsByCategory = ({ mode,
  handleThemeChange, }: Props) => {
  const { id } = useParams();
  const {
    data: { data: adData } = {},
    isSuccess,
    isLoading,
    isFetching
  } = useGetAdsByCategoryQuery(id);
  const [Ads, setAds] = useState();


  if ((isLoading || isFetching))
    return (
      <CardSkeleton />)

  if (isSuccess && adData?.data?.length > 0)
    return (
      <Container>
        { }
        <Grid container >
          {
            adData?.data?.map((item: Ad) => (
              <Grid item key={item.id} xs={12} sm={4} md={4} lg={3}>
                {<AdCard adData={item} handleThemeChange={handleThemeChange} mode={mode} />}
              </Grid>
            ))}
        </Grid>
      </Container>
    );

  return (
    <CustomGlobalGrid>

      <Typography>
        No advertises on this category
      </Typography>
    </CustomGlobalGrid>
  )
};

export default AdsByCategory;
