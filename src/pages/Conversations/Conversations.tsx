import { Grid, Typography, Avatar } from "@mui/material";
import { formaDateTime } from "core/services/helpers";
import React from "react";
import { useGetListConversationsQuery } from "redux/api/userApi";
import { Message } from "core/models/Message.model";
import { getCurrentUser } from "core/utils/functionHelpers";
import Spinner from "Components/Spinner/spinner";
import CustomLink from "Components/CustomLink/CustomLink"
import {CustomConversationBox,GridVerticalDivider} from "./Conversations.style"
import {CustomGlobalGrid} from "Components/Advertises/Advertises.style"

const Conversations = () => {
  const { data, isLoading } = useGetListConversationsQuery();
  const currentUser = getCurrentUser();

  

  return (
    <>
      <div>Conversations</div>
      {isLoading && <Spinner />}
      <CustomGlobalGrid container>
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
      </CustomGlobalGrid>
    </>
  );
};

export default Conversations;
