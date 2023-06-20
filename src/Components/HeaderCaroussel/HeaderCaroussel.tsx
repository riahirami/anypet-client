import { Avatar, CardMedia, Typography } from '@mui/material';
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

    const imgList = {
        data: {
            media: [
                { file_path: "adoptions.jpg" },
                { file_path: "maxresdefault.jpg" },
                { file_path: "PetAdoptionTips850.jpg" },
                { file_path: "s9374nb1uljetw02.png" },
            ]
        }

    }

    return (
        <>
            <StyledHeaderCaroussel container>
            </StyledHeaderCaroussel >
            <GridCarousel >
                <Slider {...settings}>

                    {
                        imgList?.data?.media?.map((ad: any) => (
                            

                                <CardMedia component="img" height={600} alt={ad?.file_path} key={ad?.file_path} image={process.env.PUBLIC_URL + "/article/" + ad?.file_path} />
                        ))}

                </Slider>
            </GridCarousel>

        </>
    )
}

export default HeaderCaroussel