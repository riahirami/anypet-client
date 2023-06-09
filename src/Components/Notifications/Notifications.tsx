import React, { useState,useEffect } from "react";
import { PATHS } from "routes/Path";
import { getCurrentUser } from "core/utils/functionHelpers";
import {
  useListUnreadNotificationsQuery,
  useMarkAllAsReadNotificationsMutation,
} from "redux/api/userApi";
import { getNotificationMessage } from "core/services/helpers";
import { IconButton, Typography, Menu, Grid, MenuItem} from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomLink from "Components/CustomLink/CustomLink";
import { Badge } from "Components/Badge/Badge";

const Notifications = () => {
  const [markAllAsRead] = useMarkAllAsReadNotificationsMutation();
  const currentUser = getCurrentUser();

  const { data: unreadNotifications } = useListUnreadNotificationsQuery(
    currentUser?.user?.id
  );
  const [notifNumber, setNotifNumber] = useState(
    unreadNotifications?.data?.length
  );

  useEffect(()=>(
    setNotifNumber(unreadNotifications?.data?.length)
  ),[unreadNotifications])


  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const openNotificationMenu = Boolean(notificationAnchorEl);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = async () => {
    setNotificationAnchorEl(null);
    await markAllAsRead();
    setNotifNumber(0);
  };

  return (
    <div>
      <IconButton
        id="notification-button"
        aria-controls={openNotificationMenu ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openNotificationMenu ? "true" : undefined}
        onClick={handleNotificationClick}
      >
        <NotificationsOutlinedIcon />
        <Badge>
          {notifNumber ? notifNumber : "0"}
        </Badge>
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
        {notifNumber > 0 ? (
          unreadNotifications?.data?.map((notification: any) => (
            <MenuItem key={notification.id}>
              {getNotificationMessage(notification)}
              <Grid item>
                {notification?.data?.url ? (
                  <IconButton>
                    <CustomLink to={notification?.data?.url}>
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
          <CustomLink to={PATHS.ALLNOTIFICATIONS  +currentUser?.user?.id}>
            <Typography align="center" color={"darkcyan"}>
              See All
            </Typography>
          </CustomLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Notifications;
