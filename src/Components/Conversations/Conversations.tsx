import { Grid, Typography, Avatar, Box } from "@mui/material";
import { formaDateTime } from "core/services/helpers";
import React, { useState } from "react";
import { useGetListConversationsQuery } from "redux/api/userApi";
import { Message } from "core/models/Message.model";
import { getCurrentUser } from "core/utils/functionHelpers";
import CustomLink from "Components/CustomLink/CustomLink"
import { CustomConversationBox, GridVerticalDivider } from "./Conversations.style"
import { IconButton, Menu, MenuItem } from "@mui/material";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'; import { Badge } from "Components/Badge/Badge"

const Conversations = () => {
  const { data, isLoading } = useGetListConversationsQuery();
  const currentUser = getCurrentUser();
  const [messageNumber, setMessageNumber] = useState(0);

  const [messageAnchorEl, setMessageAnchorEl] =
    useState<null | HTMLElement>(null);

  const openMessageMenu = Boolean(messageAnchorEl);

  const handleMessageClick = (event: React.MouseEvent<HTMLElement>) => {
    setMessageAnchorEl(event.currentTarget);
  };

  const handleMessageClose = async () => {
    setMessageAnchorEl(null);
    setMessageNumber(0);
  };

  return (
    <>
      <Grid container>
        <IconButton
          id="notification-button"
          aria-controls={openMessageMenu ? "message-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMessageMenu ? "true" : undefined}
          onClick={handleMessageClick}
        >
          <MailOutlineOutlinedIcon />
          <Badge  >
            {messageNumber ? messageNumber : "0"}
          </Badge>
        </IconButton>
        <Menu
          id="message-menu"
          anchorEl={messageAnchorEl}
          open={openMessageMenu}
          onClose={handleMessageClose}
          MenuListProps={{
            "aria-labelledby": "message-button",
          }}
        >
          {data &&
            data?.map((conversations: Message) => (
              <CustomConversationBox
                item
                md={12}
                key={conversations?.id}

              >
                <Grid item sx={{ m: "20px" }}>
                  <CustomLink to={"/user/messages/" + conversations?.receiver_id}>
                    <Avatar
                      src={
                        conversations?.receiver_id === currentUser?.user?.id
                          ? conversations?.sender?.avatar
                          : conversations?.receiver?.avatar
                      }
                    />
                    <Typography>
                      {conversations?.receiver_id === currentUser?.user?.id
                        ? conversations?.sender?.firstname
                        : conversations?.receiver?.firstname}
                    </Typography>
                  </CustomLink>
                </Grid>
                <GridVerticalDivider
                  item
                  sx={{ m: "20px" }}

                >
                  <CustomLink to={"/user/messages/" + conversations?.receiver_id}>
                    <Typography>Message: {conversations?.message}</Typography>
                    <Typography>
                      {formaDateTime(conversations?.created_at)}
                    </Typography>
                  </CustomLink>
                </GridVerticalDivider>
              </CustomConversationBox>
            ))}
          <MenuItem onClick={() => handleMessageClose()}>
            <CustomLink to={"user/conversations/"}>
              <Typography align="center" color={"darkcyan"}>
                See All
              </Typography>
            </CustomLink>
          </MenuItem>
        </Menu> 
      </Grid>
    </>
  );
};

export default Conversations;
