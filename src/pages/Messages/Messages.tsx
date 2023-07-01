import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  Avatar,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  useSendMessageMutation,
  useGetConversationQuery,
  useMarkOneAsReadNotificationsMutation,
  useGetUnreadMessagesQuery,
} from "redux/api/userApi";
import Pusher from "pusher-js";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "core/utils/functionHelpers";
import { formaDateTime } from "core/services/helpers";
import SendIcon from "@mui/icons-material/Send";
import { Message } from "core/models/Message.model";
import { Spinner } from "Components/Spinner/spinner";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CustomLink from "Components/CustomLink/CustomLink"
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

import {
  CustomSendButton, CustomTextFieldMessage, CustomGlobalGrid, CustomGrid,
  CustomBox
} from "./Messages.style"
import { pusherConfig } from "core/constant/Pusher"
import { Props } from "Components/AppBar/Appbar.props";
import { themes } from "Theme/Themes";

const Messages: React.FC<Props> = ({ mode,
  handleThemeChange }) => {
  const { id } = useParams();
  const currentUser = getCurrentUser();

  const [message, setMessage] = useState("");
  const [sendMessage, { data: NewMessage, isLoading: loadingSendMsg, isSuccess: msgSuccess }] = useSendMessageMutation();

  const {
    data: ConversationData,
    isSuccess,
    isLoading,
    refetch,
  } = useGetConversationQuery(id);



  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const [markMessageAsRead] = useMarkOneAsReadNotificationsMutation();


  const { data: unreadMessages } = useGetUnreadMessagesQuery(currentUser?.user?.id);

  const messageIdsToCheck = allMessages.map((message) => message.id);
  const notificationIdsToCheck = unreadMessages?.data?.map((unreadMsg:any) => unreadMsg?.data?.messageId);

  function markMessagesAsRead(messageIdsToCheck : number[], notificationIdsToCheck : number[]) {
    messageIdsToCheck.forEach((messageId: number) => {
      if (notificationIdsToCheck.includes(messageId)) {
        markMessageAsRead(messageId)
          .then(() => {
            console.log(`Message with ID ${messageId} marked as read.`);
          })
          .catch((error: any) => {
            console.error(`Error marking message with ID ${messageId} as read:`, error);
          });
      }
    });
  }
  
  useEffect(() => {
    if(unreadMessages)
    markMessagesAsRead(messageIdsToCheck, notificationIdsToCheck);
  }, [id,allMessages,unreadMessages]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAllMessages([]);
    if (isSuccess && ConversationData) {
      setAllMessages((prevMessages) => [...prevMessages, ...ConversationData]);
    }
    if (gridRef.current) {
      gridRef.current.scrollTop = gridRef.current.scrollHeight;
    }
  }, [id, isSuccess]);



  useEffect(() => {
    Pusher.logToConsole = false;

    var pusher = new Pusher(pusherConfig.id, {
      cluster: pusherConfig.cluster,
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data: Message) {
      setAllMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe("chat");
      pusher.disconnect();
    };
  }, [msgSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (
    id_receiver: string | number | undefined
  ) => {
    await sendMessage({ receiver_id: id_receiver, message });
    setMessage("");
   
    if (gridRef.current) {
      gridRef.current.scrollTop = gridRef.current.scrollHeight;
    }
  };

  const handleSetAsRead = async (id: number | string) => {
    await markMessageAsRead(id)
  }
  
  return (
    <Grid style={{ backgroundColor: themes[mode].messages.backgroundColor, borderRadius: '10px' }}>
      {isLoading && <Spinner />}
 
      <CustomGlobalGrid >
        <Box >
          {isSuccess &&
            allMessages?.map((message: Message, index: number) => (
              <CustomGrid ref={gridRef} message={message} currentUser={currentUser}>
                {message?.message?.length > 0 && (
                  <CustomLink to={"/user/details/" + message?.sender?.id}>
                    <Avatar src={message?.sender_avatar || message?.sender?.avatar} sx={{ width: 24, height: 24 }} />
                  </CustomLink>
                )}
                <CustomBox message={message} currentUser={currentUser}>
                  <Typography variant="body1">{message?.message}</Typography>
                  <Typography variant="caption">{message?.created_at && formaDateTime(message?.created_at)}</Typography>
                 
                </CustomBox>
              </CustomGrid>
            ))}

        </Box>
      </CustomGlobalGrid>
      <Grid>
        <Grid>
          <CustomTextFieldMessage
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            focused
          ></CustomTextFieldMessage>
          <CustomSendButton
            type="button"
            onClick={() => handleSendMessage(id)}
            color="primary"
            variant="contained"
            disabled={loadingSendMsg}
          >
            <SendIcon />
          </CustomSendButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Messages;
