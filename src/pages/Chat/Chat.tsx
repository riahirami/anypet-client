import React, { useEffect, useState } from "react";

import {
    Box,
    Avatar,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import {
    useSendMessageMutation,
    useGetConversationQuery,
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

import {
    CustomSendButton, CustomTextFieldMessage, CustomGlobalGrid, CustomGrid,
    CustomBox
} from "../Messages/Messages.style"
import { pusherConfig } from "core/constant/Pusher"
import Conversations from 'pages/Conversations/Conversations';
import { Routes, Route, } from "react-router-dom";
import { useGetListConversationsQuery } from 'redux/api/userApi';
const Chat = () => {
    const currentUser = getCurrentUser();
    const id = "3";
    const [message, setMessage] = useState("");
    const [sendMessage, { data: NewMessage, isLoading: loadingSendMsg, isSuccess: msgSuccess }] = useSendMessageMutation();

    const {
        data: ConversationData,
        isSuccess,
        isLoading,
        refetch,
    } = useGetConversationQuery(id);

    const [allMessages, setAllMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (isSuccess && ConversationData) {
            setAllMessages((prevMessages) => [...prevMessages, ...ConversationData]);
        }
    }, [isSuccess]);

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
    };
    return (
        <Grid container >

            <Grid item md={4}>
                <Conversations />
            </Grid>
            <Grid item md={8}>

                <>
                    {isLoading && <Spinner />}
                    <Button variant="text">
                        <CustomLink to={"/user/conversations/"}>
                            <ArrowBackIosOutlinedIcon />
                        </CustomLink>
                    </Button>
                    <CustomGlobalGrid >
                        <Box>
                            {isSuccess &&
                                allMessages?.map((message: Message) => (
                                    <CustomGrid message={message} currentUser={currentUser}>
                                        {message?.message?.length > 0 && (
                                            <>
                                                <Avatar src={message?.sender_avatar || message?.sender?.avatar} sx={{ width: 24, height: 24 }} />
                                            </>
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
                </>

            </Grid>
        </Grid>

    )
}

export default Chat