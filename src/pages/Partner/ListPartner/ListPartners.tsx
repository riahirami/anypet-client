import { Typography, Grid, Avatar, CardMedia } from '@mui/material';
import { useGetPartnersQuery, useDeletePartnerMutation } from 'redux/api/partnerApi';
import { Partner } from "core/models/partner.model";
import { PATHS } from 'routes/Path';
import CustomLink from 'Components/CustomLink/CustomLink';
import { StyledListPartner } from './ListPartner.style';
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from './Slider.settings';

const ListPartners = () => {
    const { data: partners, isSuccess, isLoading } = useGetPartnersQuery();
    const [deletPartner] = useDeletePartnerMutation();

 
    function handleDeletePartner(id: string) {
        deletPartner(id)
            .unwrap()
            .then(() => {
                // setShowModal(true);
                // refetch();
            });
    }
    return (
        <>
            <StyledListPartner container>



            </StyledListPartner >

            <Slider {...settings}>

                {isSuccess &&
                    partners?.data?.data?.map((partner: Partner) => (
                        <CustomLink key={partner.id} to={"/partner/" + partner?.id}>
                            <Avatar src={partner?.logo} sx={{ height: 150, width: 150, border: "4px solid #5fa8d3", m: 5 }}></Avatar>
                        </CustomLink>
                    ))}

            </Slider>
        </>
    )
}

export default ListPartners