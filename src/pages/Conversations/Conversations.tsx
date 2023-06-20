import { Grid, Typography, Avatar } from "@mui/material";
import { formaDateTime } from "core/services/helpers";
import React, { useState } from "react";
import { useGetListConversationsQuery } from "redux/api/userApi";
import { Message } from "core/models/Message.model";
import { getCurrentUser } from "core/utils/functionHelpers";
import Spinner from "Components/Spinner/spinner";
import CustomLink from "Components/CustomLink/CustomLink"
import { CustomConversationBox, GridVerticalDivider,CustomGlobalGrid } from "./Conversations.style"
import { Props } from "Components/AppBar/Appbar.props";
import { themes } from "Theme/Themes";
import { useParams } from "react-router-dom";


const Conversations: React.FC<Props> = ({ mode,
  handleThemeChange,
  children }) => {
  const { data, isLoading } = useGetListConversationsQuery();
  const currentUser = getCurrentUser();
  const {id} = useParams() ; 

  const [activeConversationId, setActiveConversationId] = useState<string | number | undefined |null>(id);

  return (
    <>
      {isLoading && <Spinner />}
      <CustomGlobalGrid container >
        <Grid item xs={12} sm={12} md={4} lg={4}>

          {data &&
            data?.map((conversations: Message) => (
              <CustomConversationBox
                
                key={conversations?.id}
                style={{
                  backgroundColor:
                    conversations?.id === activeConversationId
                      ? themes[mode].messages.backgroundColor
                      : themes[mode].conversations.backgroundColor,
                }}
                onClick={() => setActiveConversationId(conversations?.id)}
              >
                <Grid  sx={{ m: "20px" }}>
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
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8}>
          {children}
        </Grid>
      </CustomGlobalGrid>
    </>
  );
};

export default Conversations;
