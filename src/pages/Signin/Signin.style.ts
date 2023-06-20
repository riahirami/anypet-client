import { styled } from '@mui/material/styles';
import {
    Avatar, Box,
    Button
} from '@mui/material'

export const CustomSignInBox = styled(Box)(({ theme }) => ({
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "aliceblue",
    position: "relative",
    padding: "30px",
    border: "2px solid #048694"
}))


export const CustomImg = styled('img')(({ theme }) => ({
    width: "100%",
    opacity: '0.7',
    position: "absolute",
    top: "250px",
    left: "0px",
    bottom: "0px"
}))

export const CustomButton = styled(Button)(({ theme }) => ({
    mt: 3,
    mb: 2
}))
export const CustomAvatar = styled(Avatar)(({ theme }) => ({
    m: 1,
    backgroundColor: "048694"
}))
