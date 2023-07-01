import React from "react";
import {
  useListAllNotificationsQuery,
  useMarkAllAsReadNotificationsMutation,
} from "redux/api/userApi";
import { getNotificationMessage, formaDateTime } from "core/services/helpers";
import { getCurrentUser } from "core/utils/functionHelpers";
import { Typography, Grid, Box, Tab, IconButton, Divider } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomLink from "Components/CustomLink/CustomLink"
import { CustomGlobalGrid } from "Components/Advertises/Advertises.style";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const AllNotifications = () => {
  const currentUser = getCurrentUser();
  const [value, setValue] = React.useState("1");

  const { data, isLoading, isSuccess } = useListAllNotificationsQuery(
    currentUser?.user?.id
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };



  console.log({ data });
  return (
    <CustomGlobalGrid style={{ width: "100vw" }}>

      <Box sx={{ width: "100%", typography: "body1", mt: 10 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} >
              <Tab label="Commentes" value="1" />
              <Tab label="Ads status" value="2" />
              <Tab label="Advertises recommended" value="3" />
              <Tab label="Reservations Response" value="4" />
              <Tab label="Reservations Request" value="5" />
            </TabList>
          </Box>

          <TabPanel value="1">
            {data?.data?.AdCommented.length > 0 ? data?.data?.AdCommented?.map((notification: any) => (
              <>
                <Grid
                  key={notification.id}
                  container
                  justifyContent={"space-between"}
                  sx={{ margin: "10px", padding: "10px" }}
                >
                  <Grid item>
                    <Typography variant="subtitle1">
                      {" "}
                      {getNotificationMessage(notification)}
                    </Typography>
                    <Typography variant="body2">
                      {" "}
                      {formaDateTime(notification.created_at)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {notification?.data?.url ? (
                      <IconButton  >
                        <CustomLink to={notification?.data?.url}>
                          <VisibilityOutlinedIcon color="info" />
                        </CustomLink>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </>
            )) :
              <p>not notifications found</p>}

          </TabPanel>

          <TabPanel value="2">
            {data?.data?.AdStatusUpdated.length > 0 ? data?.data?.AdStatusUpdated?.map((notification: any) => (
              <>
                <Grid
                  key={notification.id}
                  container
                  justifyContent={"space-between"}
                  sx={{ margin: "10px", padding: "10px" }}
                >
                  <Grid item>
                    <Typography variant="subtitle1">
                      {" "}
                      {getNotificationMessage(notification)}
                    </Typography>
                    <Typography variant="body2">
                      {" "}
                      {formaDateTime(notification.created_at)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {notification?.data?.url ? (
                      <IconButton  >
                        <CustomLink to={notification?.data?.url}>
                          <VisibilityOutlinedIcon color="info" />
                        </CustomLink>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </>
            ))
              :
              <p>not notifications found</p>
            }

          </TabPanel>

          <TabPanel value="3">
            {data?.data?.AdMatchingInterrestNotification.length > 0 ? data?.data?.AdMatchingInterrestNotification?.map((notification: any) => (
              <>
                <Grid
                  key={notification.id}
                  container
                  justifyContent={"space-between"}
                  sx={{ margin: "10px", padding: "10px" }}
                >
                  <Grid item>
                    <Typography variant="subtitle1">
                      {" "}
                      {getNotificationMessage(notification)}
                    </Typography>
                    <Typography variant="body2">
                      {" "}
                      {formaDateTime(notification.created_at)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {notification?.data?.url ? (
                      <IconButton  >
                        <CustomLink to={notification?.data?.url}>
                          <VisibilityOutlinedIcon color="info" />
                        </CustomLink>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </>
            ))
              :
              <p>not notifications found</p>
            }
          </TabPanel>
          <TabPanel value="4">
            {(data?.data?.RespondOnReservationNotification.length > 0) ? data?.data?.RespondOnReservationNotification?.map((notification: any) => (
              <>
                <Grid
                  key={notification.id}
                  container
                  justifyContent={"space-between"}
                  sx={{ margin: "10px", padding: "10px" }}
                >
                  <Grid item>
                    <Typography variant="subtitle1">
                      {" "}
                      {getNotificationMessage(notification)}
                    </Typography>
                    <Typography variant="body2">
                      {" "}
                      {formaDateTime(notification.created_at)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {notification?.data?.url ? (
                      <IconButton  >
                        <CustomLink to={notification?.data?.url}>
                          <VisibilityOutlinedIcon color="info" />
                        </CustomLink>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </>
            ))
              :
              <p>not notifications found</p>}
          </TabPanel>
          <TabPanel value="5">
            {(data?.data?.ReservationNotification.length > 0) ? data?.data?.ReservationNotification?.map((notification: any) => (
              <>
                <Grid
                  key={notification.id}
                  container
                  justifyContent={"space-between"}
                  sx={{ margin: "10px", padding: "10px" }}
                >
                  <Grid item>
                    <Typography variant="subtitle1">
                      {" "}
                      {getNotificationMessage(notification)}
                    </Typography>
                    <Typography variant="body2">
                      {" "}
                      {formaDateTime(notification.created_at)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {notification?.data?.url ? (
                      <IconButton  >
                        <CustomLink to={notification?.data?.url}>
                          <VisibilityOutlinedIcon color="info" />
                        </CustomLink>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </>
            )) :
              <p>not notifications found</p>}
          </TabPanel>
        </TabContext>
      </Box>
    </CustomGlobalGrid>
  );
};

export default AllNotifications;
