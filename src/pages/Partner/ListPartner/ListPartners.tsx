import { Avatar, Grid } from '@mui/material';
import { useGetPartnersQuery, useDeletePartnerMutation } from 'redux/api/partnerApi';
import { Partner } from "core/models/partner.model";
import { PATHS } from 'routes/Path';
import CustomLink from 'Components/CustomLink/CustomLink';
import { StyledListPartner } from './ListPartner.style';
import Slider from "react-slick";

// Import css files

import { settings } from './Slider.settings';

const ListPartners = () => {
    const { data: partners, isSuccess } = useGetPartnersQuery();
    const [deletPartner] = useDeletePartnerMutation();



    return (
        <>
            <StyledListPartner container>



            </StyledListPartner >
            <Grid style={{ width: "96vw", minWidth:"690px",margin:"auto",marginBottom:"10px" }}>
                <Slider {...settings}>

                    {isSuccess &&
                        partners?.data?.data?.map((partner: Partner) => (
                            <CustomLink key={partner.id} to={"/partner/" + partner?.id}>
                                <Avatar src={partner?.logo} sx={{ height: 150, width: 150, border: "4px solid #5fa8d3", m: 5 }}></Avatar>
                            </CustomLink>
                        ))}

                </Slider>
            </Grid>

        </>
    )
}

export default ListPartners