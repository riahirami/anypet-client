import { Container, Grid } from "@mui/material";
import AdCard from "Components/Card/AdsCard";
import Spinner from "Components/Spinner/spinner";
import { Ad } from "core/models/ad.model";
import React from "react";
import { useGetMyAdsQuery } from "redux/api/adsApi";
import { getToken } from "core/utils/functionHelpers";
import { useProfileQuery } from "redux/api/authApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from 'redux/store';
import { Props } from "Components/AppBar/Appbar.props";

const MyAdvertises: React.FC<Props> = ({ mode,
  handleThemeChange }) => {

  
  // const {id} = useParams();

  const authUser = useSelector((state: RootState) => state.auth);

 
  const { data: MyAds, isSuccess, isLoading } = useGetMyAdsQuery(authUser?.user?.id);


  return (
    <Grid sx={{mt:15 }}>
      {isLoading && <Spinner />}

      <Container>
        {}

          <Grid container spacing={2}>
            {
              MyAds?.data.map((ad: Ad) => (
                <Grid item key={ad.id} xs={12} sm={6} md={4} lg={3}>
                  <AdCard adData={ad} mode={mode} handleThemeChange={handleThemeChange} />
                </Grid>
              ))}
          </Grid>
      </Container>
    </Grid>
  );
};

export default MyAdvertises;
