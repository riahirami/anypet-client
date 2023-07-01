import {
    Grid, Typography, Button, Tab, Box, Avatar, Card,
    Badge,
    CardContent,
    CardActions
} from '@mui/material';
import React from 'react'
import { useGetMyReservationsQuery, useResponseOnReservationsMutation } from 'redux/api/reservationApi';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ReservationDateTime, formaDateTime, statusToString } from 'core/services/helpers';
import CustomLink from "Components/CustomLink/CustomLink"
import AlertComponent from "Components/Alert/Alert";
import { message } from "core/constant/message"
import { SmallAvatar, CustomReservationCard, CardActionsCustom, GridReservation } from "./Reservation.style"
import { Props } from 'Components/AppBar/Appbar.props';
import { themes } from 'Theme/Themes';
import { useMarkAsAdoptedOrReservedMutation } from 'redux/api/adsApi';
import { StatusOption } from 'core/enums/status';


const UserReservations: React.FC<Props> = ({ mode,
    handleThemeChange }) => {

    const { data: MyReservation, isLoading, isSuccess } = useGetMyReservationsQuery();
    const [responseOnReservation, { isLoading: loadingResponse, isSuccess: respondSuccess }] = useResponseOnReservationsMutation();
    const [value, setValue] = React.useState("1");

    const [
        markAsReservedOrAdopted,
        {
            data: ReservedOrAdoptedStatus,
            isLoading: loadingReservedOrAdoptedStatus,
            isSuccess: successReservedOrAdoptedStatus,
            isError: errorReservedOrAdoptedStatus,
        },
    ] = useMarkAsAdoptedOrReservedMutation()

    const handleMarkAsReservedOrAdopted = async (
        adId: string | number | undefined,
        status: StatusOption
    ) => {
        markAsReservedOrAdopted({ id: adId, status })
            .unwrap()
            .then(() => {
                // refetch();
            });
    };
    const responseOnReservationHandler = async (reservationId: string | number, status: number) => {
        await responseOnReservation({
            id: reservationId,
            status: status
        })
        const reservation =  MyReservation?.data?.received?.find(reservation => reservation.id === reservationId)
        if (status == 2) {
            await handleMarkAsReservedOrAdopted(reservation?.ad_id, StatusOption.Reserved);
        }

    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Grid style={{ marginTop: "80px" }}>
            {respondSuccess && (
                <AlertComponent
                    title={message.RESERVATIONUPDATED}
                    severity="success"
                />
            )}

            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="Reservations tabs">
                        <Tab label="Received" value="1" />
                        <Tab label="Send" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid container spacing={3} style={{ width: "100%" }}>
                        {MyReservation?.data?.received?.map((item) => (
                            <Grid item xs={12} sm={12} md={4} lg={3} key={item?.id}>
                                <CustomReservationCard style={{ backgroundColor: themes[mode].topbar.backgroundColor, color: themes[mode].topbar.color }}  >
                                    <Grid style={{ display: "flex", justifyContent: "center" }}>

                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                <CustomLink to={"/user/details/" + item?.sender_id}>
                                                    <SmallAvatar alt={item?.sender?.firstname} src={item?.sender?.avatar} sx={{ width: 70, height: 70 }} />
                                                </CustomLink>}
                                        >
                                            <CustomLink to={"/advertise/" + item?.ad_id}>
                                                <Avatar alt={item?.advertisement?.title} src={item?.advertisement?.media?.[0].file_path} sx={{ width: 180, height: 180 }} />
                                            </CustomLink>
                                        </Badge></Grid>
                                    <CardContent>
                                        <CustomLink to={"/user/details/" + item?.sender_id}>

                                            <Typography gutterBottom variant="h5" component="div">
                                                From :  {item?.sender?.firstname} {item?.sender?.lastname}
                                            </Typography>
                                        </CustomLink>
                                        <CustomLink to={"/advertise/" + item?.ad_id}>
                                            <Typography noWrap>
                                                Advertise : {item?.advertisement?.title}
                                            </Typography>
                                        </CustomLink>
                                        <Typography noWrap>
                                            Message : {item?.message}
                                        </Typography>
                                        <Typography noWrap>
                                            Reservation : {ReservationDateTime(item?.reservation_date)}
                                        </Typography>
                                        <Typography style={{
                                            color:
                                                item?.status == 0
                                                    ? "orange"
                                                    : item?.status == 1
                                                        ? "red"
                                                        : item?.status == 2
                                                            ? "green"
                                                            : "inherit",
                                        }}>
                                            Status :  {statusToString(item?.status)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            Created at :  {formaDateTime(item?.created_at)}
                                        </Typography>

                                    </CardContent>
                                    <CardActions style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        {item?.status === 0 &&
                                            <>
                                                <Button size="small" variant='contained' color='success' disabled={loadingResponse} onClick={() => responseOnReservationHandler(item?.id, 2)}>validate</Button>
                                                <Button size="small" variant='contained' color='error' disabled={loadingResponse} onClick={() => responseOnReservationHandler(item?.id, 1)}>decline</Button>
                                            </>
                                        }

                                    </CardActions>
                                </CustomReservationCard>
                            </Grid>
                        ))}
                    </Grid>

                </TabPanel>

                <TabPanel value="2">
                    <Grid container spacing={3} style={{ width: "100%" }}>

                        {MyReservation?.data?.send?.map((item) => (
                            <Grid item xs={12} sm={12} md={4} lg={3} key={item?.id}>
                                <CustomReservationCard style={{ backgroundColor: themes[mode].topbar.backgroundColor, color: themes[mode].topbar.color }}  >
                                    <Grid style={{ display: "flex", justifyContent: "center" }}>

                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                <CustomLink to={"/user/details/" + item?.sender_id}>
                                                    <SmallAvatar alt={item?.receiver?.avatar} src={item?.receiver?.avatar} sx={{ width: 70, height: 70 }} />
                                                </CustomLink>
                                            }
                                        >
                                            <CustomLink to={"/advertise/" + item?.ad_id}>
                                                <Avatar alt={item?.advertisement?.title} src={item?.advertisement?.media?.[0].file_path} sx={{ width: 180, height: 180 }} />
                                            </CustomLink>
                                        </Badge>
                                    </Grid>

                                    <CardContent>
                                        <CustomLink to={"/user/details/" + item?.receiver_id}>
                                            <Typography gutterBottom variant="h5" component="div" noWrap>
                                                To :  {item?.receiver?.firstname} {item?.receiver?.lastname}
                                            </Typography>
                                        </CustomLink>
                                        <CustomLink to={"/advertise/" + item?.ad_id} >
                                            <Typography noWrap>
                                                Advertise : {item?.advertisement?.title}
                                            </Typography>
                                        </CustomLink>

                                        <Typography noWrap>
                                            Reservation : {ReservationDateTime(item?.reservation_date)}
                                        </Typography>
                                        <Typography noWrap>
                                            Message : {item?.message}
                                        </Typography>
                                        <Typography style={{
                                            color:
                                                item?.status == 0
                                                    ? "orange"
                                                    : item?.status == 1
                                                        ? "red"
                                                        : item?.status == 2
                                                            ? "green"
                                                            : "inherit",
                                        }}>
                                            Status :  {statusToString(item?.status)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            Created at :  {formaDateTime(item?.created_at)}
                                        </Typography>
                                        <CardActionsCustom>
                                            {item?.status === 0 &&
                                                <Button size="small" variant='contained' color='error' disabled={loadingResponse} onClick={() => responseOnReservationHandler(item?.id, 1)}>Cancel</Button>
                                            }
                                        </CardActionsCustom>
                                    </CardContent>

                                </CustomReservationCard>
                            </Grid>

                        ))}
                    </Grid>


                </TabPanel>


            </TabContext >

        </Grid>
    )
}

export default UserReservations