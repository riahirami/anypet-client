import React, { useState, useEffect } from "react";
import { getCurrentUser } from "core/utils/functionHelpers";
import Pusher from "pusher-js";
import {
    useListUnreadNotificationsQuery,
    useMarkAllAsReadNotificationsMutation,
} from "redux/api/userApi";
import { IconButton, Typography, Menu, Grid, MenuItem } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomLink from "Components/CustomLink/CustomLink";
import { Badge } from "Components/Badge/Badge";
import { PATHS } from "routes/Path";
import { getNotificationMessage } from "core/services/helpers";
import { pusherConfig } from "core/constant/Pusher"
import AlertComponent from "Components/Alert/Alert"

export const Notif = () => {
    const currentUser = getCurrentUser();
    const userID = currentUser?.user?.id;
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [markAllAsRead] = useMarkAllAsReadNotificationsMutation();

    const { data: unreadNotifications, isSuccess } = useListUnreadNotificationsQuery(
        userID
    );


    const [allNotifications, setAllNotifications] = useState<any[]>([]);

    const handleMyOwnNotifications = () => {
        const filteredNotifications = unreadNotifications?.data.filter(
            (notif: any) => notif.notifiable_id == userID
        );
        setNotifNumber(filteredNotifications?.length);
        return filteredNotifications;

    }

    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);

    const openNotificationMenu = Boolean(notificationAnchorEl);

    const handleNotificationClose = async () => {
        setNotificationAnchorEl(null);
        await markAllAsRead();
        setNotifNumber(0);
        setAllNotifications([]);
    };

    const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };


    useEffect(() => {
        if (isSuccess && unreadNotifications) {
          const filteredNotifications = handleMyOwnNotifications();
          setAllNotifications(filteredNotifications);
          setNotifNumber(unreadNotifications?.data?.length);
        }
      }, [isSuccess, unreadNotifications]);

   


    useEffect(() => {
        Pusher.logToConsole = true;

        var pusher = new Pusher(pusherConfig.id, {
            cluster: pusherConfig.cluster,
        });
        var channel = pusher.subscribe("notifications");
        channel.bind("notif", function (data: any) {

            const filteredNotifications = handleMyOwnNotifications();
            if (data.notifiable_id === userID) {
                if (!allNotifications.some((notif) => notif.id == data.id)) {
                  setAllNotifications((prevNotifs) => [...prevNotifs, data]);
                  setShowAlert(true);
                //   setAlertMessage("You have a new notification ");
                  setAlertMessage(getNotificationMessage(data));
                }
              } else {
                setAllNotifications((prevNotifs) => [...prevNotifs, ...filteredNotifications]);
              }    });


        return () => {
            pusher.unsubscribe("notifications");
            pusher.disconnect();
        };
    }, [isSuccess]);

    const unreadNotificationCount = allNotifications.filter(
        (notification) => !notification.read_at
    ).length;

    const [notifNumber, setNotifNumber] = useState(
        unreadNotificationCount
    );

    useEffect(() => {
        setNotifNumber(unreadNotificationCount)
        console.log({ unreadNotifications, allNotifications,notifNumber,unreadNotificationCount });
      }, [unreadNotificationCount]);


    return (
        <div>
            {showAlert && (
                <AlertComponent
                    title={alertMessage}
                    severity="info"
                    onClose={() => setShowAlert(false)}
                />
            )}
            <IconButton
                id="notification-button"
                aria-controls={openNotificationMenu ? "notification-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openNotificationMenu ? "true" : undefined}
                onClick={handleNotificationClick}
            >
                <NotificationsOutlinedIcon />
                <Badge>{notifNumber}</Badge>

            </IconButton>
            <Menu
                id="notification-menu"
                anchorEl={notificationAnchorEl}
                open={openNotificationMenu}
                onClose={handleNotificationClose}
                MenuListProps={{
                    "aria-labelledby": "notification-button",
                }}
            >
                {unreadNotificationCount > 0 ? (
                    allNotifications?.map((notification: any) => (
                        <MenuItem key={notification.id}>
                            {getNotificationMessage(notification)}
                            <Grid item>
                                {(notification?.data) ? (
                                    <IconButton>
                                        <CustomLink to={notification?.data?.ad_id}>
                                            <VisibilityOutlinedIcon color="info" />
                                        </CustomLink>
                                    </IconButton>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem>
                        <Typography>No unread notifications</Typography>
                    </MenuItem>
                )}
                <MenuItem onClick={() => handleNotificationClose()}>
                    <CustomLink to={PATHS.ALLNOTIFICATIONS + currentUser?.user?.id}>
                        <Typography align="center" color={"darkcyan"}>
                            See All
                        </Typography>
                    </CustomLink>
                </MenuItem>
            </Menu>
        </div>
    );
}

