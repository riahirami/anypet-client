import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'redux/store';
import { Grid,Typography } from '@mui/material';
import AdCard from 'Components/Card/AdsCard';
import { Theme } from 'core/enums/theme';
import { CustomGlobalGrid } from 'Components/Advertises/Advertises.style';
import { Props } from "Components/AppBar/Appbar.props";
import CardSkeleton from "Components/Skeleton/CardSkeleton";

const AdsByState= ({ mode,
  handleThemeChange, }: Props) =>{
  const { id } = useParams();

  const ads = useSelector((state: RootState) =>
    state.ad.ad?.data?.filter((ad: any) => ad.state == id)
  );


  if (ads.length < 1)
    return (
      <CustomGlobalGrid sx={{ml:10}}>
        <Typography>no advertises available on this state</Typography>
      </CustomGlobalGrid>
    )

  return (
    <Grid>
      <CustomGlobalGrid>
        {ads?.map((ad: any) => (
          <AdCard adData={ad} mode={mode} handleThemeChange={handleThemeChange} />
        ))}
      </CustomGlobalGrid>
    </Grid>
  )
}

export default AdsByState