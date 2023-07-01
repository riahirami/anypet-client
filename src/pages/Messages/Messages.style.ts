import { styled } from '@mui/material/styles';
import {
    Grid, Box,
    Button, TextField
} from '@mui/material'
import { Message } from 'core/models/Message.model';
import { User } from 'core/models/user.model';

export const CustomTextFieldMessage = styled(TextField)(({ theme }) => ({
    paddingLeft: "50px",
    paddingTop: "20px",
    paddingBottom: "50px",
    width: "80%",
    borderColor: "aqua",
    marginTop: "15px",
}))

export const CustomSendButton = styled(Button)(({ theme }) => ({
    marginTop: "40px", marginLeft: "5px"
}))
export const CustomGlobalGrid = styled(Grid)(({ theme }) => ({
    height: "410px", 
    overflowY: "scroll",
    marginTop:"5px",
    marginRight:"10px",
    marginLeft:"10px",
}))

interface CustomGridProps {
    message: Message;
    currentUser: any;
}

export const CustomGrid = styled(Grid)<CustomGridProps>(({ theme, message, currentUser }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: message.receiver_id === currentUser?.user?.id ? 'flex-start' : 'flex-end',
    overflowY: 'auto'
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

