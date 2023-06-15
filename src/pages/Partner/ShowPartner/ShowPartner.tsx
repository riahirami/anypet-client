import React from 'react'
import { useGetPartnerByIdQuery } from 'redux/api/partnerApi';
import { Typography, Grid, Avatar, CardMedia, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ContainerSkeleton } from "Components/Skeleton/ContainerSkeleton";
import {  StyledGridLogo, StyledGridInfo, StyledGlobalGrid, StyledGridInfoItem } from "./ShowPartner.style";

import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';

import 'react-animated-slider/build/horizontal.css';

import Slider from "react-slick";
import { settings } from './Slider.settings';

const ShowPartner = () => {
    const { id } = useParams();



    const { data: partnerData, isSuccess, isLoading, isFetching } = useGetPartnerByIdQuery(id);

    const partner = partnerData?.data;

    if (isLoading || isFetching)
        return (
            <>
                <ContainerSkeleton />
            </>
        )

    return (

        <StyledGlobalGrid  style={{ width: "100vw" }}>
        
            {/* <StyledGridMedia> */}
            <Slider {...settings}>

                {isSuccess &&
                    partner?.media?.map((media: any) => {
                        return (
                            <Grid item key={media.id}>
                                <CardMedia style={{
                                    objectFit: "contain"
                                }}
                                    component="img"
                                    width="100vh"
                                    height="450"
                                    image={media.file_path}
                                    key={media.id}
                                />
                            </Grid>
                        );
                    })}
            </Slider>
            {/* </StyledGridMedia> */}
            <Divider>

                <StyledGridLogo container>
                    <Grid item>
                        <Avatar src={partner?.logo} sx={{ height: 100, width: 100 }}></Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">{partner?.name}</Typography>
                    </Grid>
                </StyledGridLogo>
            </Divider>
            <StyledGridInfo container >
                <StyledGridInfoItem item>

                    <Typography>{partner?.description}</Typography>
                </StyledGridInfoItem>
                <StyledGridInfoItem item>
                    <LocationOnOutlinedIcon />

                    <Typography>address :{partner?.address}</Typography>

                </StyledGridInfoItem>
                <StyledGridInfoItem item>
                    <PhoneInTalkOutlinedIcon />   <Typography>contact: {partner?.contact}</Typography>

                </StyledGridInfoItem>
                <StyledGridInfoItem item>

                    <AdsClickOutlinedIcon />  <Typography>website : {partner?.link}</Typography>
                </StyledGridInfoItem>
            </StyledGridInfo>

        </StyledGlobalGrid>

    )
}

export default ShowPartner