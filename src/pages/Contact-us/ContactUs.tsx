import React, { useEffect, useState } from "react";
import {
    useSendMessageMutation,
} from "redux/api/userApi";
import {
    Box,
    Avatar,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import { CustomTextFieldMessage,CustomSendButton,CustomGlobalGrid } from "./ContactUs.style";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { RootState } from 'redux/store';

const ContactUs = () => {

    const [message, setMessage] = useState("");
    const [sendMessage, { data: NewMessage, isLoading: loadingSendMsg, isSuccess: msgSuccess }] = useSendMessageMutation();

    const authUser = useSelector((state: RootState) => state.auth);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async (
        id_receiver: string | number | undefined
    ) => {
        await sendMessage({ receiver_id: 5, message });
        setMessage("");
    };

    return (
        <>
            <div>ContactUs</div>
            <CustomGlobalGrid>
                <CustomGlobalGrid>
                    <CustomTextFieldMessage
                        id="message"
                        name="message"
                        value={message}
                        onChange={handleChange}
                        focused
                    ></CustomTextFieldMessage>
                    <CustomSendButton
                        type="button"
                        onClick={() => handleSendMessage(authUser?.user?.id)}
                        color="primary"
                        variant="contained"
                        disabled={loadingSendMsg}
                    >
                        <SendIcon />
                    </CustomSendButton>
                </CustomGlobalGrid>
            </CustomGlobalGrid>

        </>

    )
}

export default ContactUs