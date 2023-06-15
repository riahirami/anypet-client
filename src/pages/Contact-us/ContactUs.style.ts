import { styled } from '@mui/material/styles';
import {
    Grid, Box,
    Button, TextField
} from '@mui/material'
import { Message } from 'core/models/Message.model';
import { User } from 'core/models/user.model';

export const CustomTextFieldMessage = styled(TextField)(({ theme }) => ({
    // paddingLeft: "30px",
    paddingTop: "20px",
    // paddingBottom: "50px",
    width: "100%",
    margin: "auto",
}));

export const CustomGlobalGrid = styled(Grid)({
    marginTop: "100px",
    display:"flex",
    justifyContent:"space-evenly",
});

export const CustomSendButton = styled(Button)(({ theme }) => ({
    marginTop: "40px",
}))

export const GridMessage = styled(Grid)(({ theme }) => ({
    padding: "50px",
    margin: "auto",
    borderRadius:"10px",
    border: "2px solid #1565c0",

    minWidth: "450px",
}))

export const GridContact = styled(Grid)(({ theme }) => ({
    paddingLeft: "30px",
    margin: "auto",
    borderRadius:"10px",
    backgroundColor:"#5fa8d3",
    border: "2px solid #5fa8d3",
    height: "100%",
    minWidth: "450px",

}))
export const CustomImg = styled("img")(({ theme }) => ({

    width: "90%",
    display:"flex",
    margin:"auto",
}))

interface CustomGridProps {
    message: Message;
    currentUser: any;
}

export const CustomGrid = styled(Grid)<CustomGridProps>(({ theme, message, currentUser }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: message.receiver_id === currentUser?.user?.id ? 'flex-start' : 'flex-end',
}));

export const CustomBox = styled(Box)<CustomGridProps>(({ theme, message, currentUser }) => ({
    backgroundColor:
        message.sender_id === currentUser?.user?.id
            ? 'cornflowerblue'
            : message.receiver_id === currentUser?.user?.id
                ? 'chartreuse'
                : 'inherit',
    marginLeft: message.sender_id === currentUser?.user?.id ? '20px' : '20px',
    textAlign: 'left',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    width: '300px',
}));

