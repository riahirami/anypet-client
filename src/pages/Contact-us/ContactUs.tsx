import React, { useState } from "react";
import {
    useContactAdminMutation,
} from "redux/api/userApi";
import {
   
    Grid,
    Typography,
   
} from "@mui/material";
import {CustomImg, CustomTextFieldMessage, CustomSendButton, CustomGlobalGrid, GridMessage, GridContact } from "./ContactUs.style";
import { useSelector } from "react-redux";
import { RootState } from 'redux/store';
import AlertComponent from "Components/Alert/Alert";
import { message as MessagesConstant } from "core/constant/message";

const ContactUs = () => {

    const [message, setMessage] = useState("");
    const [sendMessage, { data: NewMessage, isLoading: loadingSendMsg, isSuccess: msgSuccess, isError }] = useContactAdminMutation();

    const authUser = useSelector((state: RootState) => state.auth);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        await sendMessage(message);
        setMessage("");
    };
    return (
        <>
              {msgSuccess && <AlertComponent title={NewMessage.message} severity={"success"} />}
              {isError && <AlertComponent title={MessagesConstant.ERRORCONTACTUS} severity={"error"} />}

            <div>ContactUs</div>
            <CustomGlobalGrid container spacing={1}>
                <Grid item xs={12} sm={8} md={6} lg={6}>
                    <GridMessage>
                        <Typography>Message : </Typography>
                        <Grid item xs={12} md={12}>
                            <CustomTextFieldMessage
                                id="message"
                                name="message"
                                value={message}
                                onChange={handleChange}
                                focused
                                multiline
                                minRows={5}
                                placeholder="write your message"
                            ></CustomTextFieldMessage>
                        </Grid>
                        <Grid>
                            <CustomSendButton
                                type="button"
                                onClick={() => handleSendMessage()}
                                color="primary"
                                variant="contained"
                                disabled={loadingSendMsg}
                                fullWidth
                            > Send
                            </CustomSendButton>
                        </Grid>

                    </GridMessage>
                </Grid>
                <Grid item xs={12} sm={8} md={4} lg={4}>
                    <GridContact >
                        <CustomImg
                            src={process.env.PUBLIC_URL + "/illustrations/anypet-logo-plus-text.png"}
                            alt="Man playing with a dog"
                        ></CustomImg>                        
                        <Typography>Phone : +216 55444777</Typography>
                        <Typography>Address : Tunis - street 114 - postal coe 1002</Typography>
                        <Typography>Email: anypet2023@gmail.com</Typography>
                    </GridContact>
                </Grid>

            </CustomGlobalGrid>

        </>

    )
}

export default ContactUs