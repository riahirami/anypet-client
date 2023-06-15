import { Avatar, Grid, Typography } from '@mui/material';
import { useGetPartnersQuery, useDeletePartnerMutation } from '../../redux/api/partnerApi';
import { Partner } from "../../core/models/partner.model";
import { PATHS } from '../../routes/Path';
import CustomLink from '../CustomLink/CustomLink';
import { GridCarousel, StyledHeaderCaroussel } from './HeaderCaroussel.style';
import Slider from "react-slick";
import { settings } from './SliderHeaderCaroussel.settings';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

const HeaderCaroussel = () => {

    const ads = useSelector((state: RootState) => state.ad.ad);

    return (
        <>
            <StyledHeaderCaroussel container>
            </StyledHeaderCaroussel >
            <GridCarousel >
                <Slider {...settings}>

                    {
                        ads?.data?.map((ad: any) => (
                            <CustomLink key={ad.id} to={"/advertise/" + ad?.id}>
                                <Avatar style={{width: '100vw',objectFit: 'cover'}} variant="square" src={ad?.media?.[1].file_path} sx={{
                                    margin: 30,
                                    height: 400,
                                    width: 500,
                                    // border: "4px solid #185A61",
                                    m: 5,
                                    
                                }}></Avatar>
                            </CustomLink>
                        ))}

                </Slider>
            </GridCarousel>

        </>
    )
}

export default HeaderCaroussel