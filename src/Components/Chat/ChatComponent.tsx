import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const StyledCard = styled(Card)({
    width: 260,
    position: "fixed",
    bottom: "0",
    right: "0",
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 5,
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
});

const ChatHeader = styled('div')({
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    fontSize: 18,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
});

const ChatWindow = styled('div')({
    height: 220,
    overflowY: 'scroll',
});

const MessageList = styled(List)({
    listStyle: 'none',
    margin: 0,
    padding: 0,
});

const ChatInput = styled('div')({
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    borderTop: '1px solid #ccc',
});

const MessageInput = styled(TextField)({
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: 5,
    fontSize: 14,
});

const SendButton = styled(Button)({
    border: 'none',
    outline: 'none',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 14,
    padding: '5px 10px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(0, 0, 0)',
        boxShadow: '0 4px 18px 0 rgba(0, 0, 0, 0.25)',
    },
});

const ChatComponent = () => {
    return (
        <StyledCard>
            <ChatHeader>Chat</ChatHeader>
            <ChatWindow>
                <MessageList></MessageList>
            </ChatWindow>
            <ChatInput>
                <MessageInput
                    type="text"
                    placeholder="Type your message here"
                    variant="outlined"
                />
                <SendButton variant="contained">Send</SendButton>
            </ChatInput>
        </StyledCard>
    );
};

export default ChatComponent;
