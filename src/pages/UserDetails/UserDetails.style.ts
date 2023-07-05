import { styled } from '@mui/material/styles';
import {
    Grid,Box,
    Typography
} from '@mui/material'

export const CustomGlobalGrid = styled(Grid)({
    paddingTop:"100px",
    paddingRight:"10px", 
    paddingLeft:"10px",
    // height:"100%",
 });

export const CustomGridAvatarName = styled(Grid)(({ theme }) => ({
    display: "flex",flexDirection:'column',flexWrap:'wrap', alignItems: "center", marginBottom: "10px", marginLeft: "10px" 
}))
export const CustomTypography = styled(Typography)(({ theme }) => ({
    marginRight: "8px"
}))
export const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex", alignItems: "center",justifyContent:'center'}))
export const CustomBoxDetails = styled(Box)(({ theme }) => ({
    display: "flex", alignItems: "center",}))
