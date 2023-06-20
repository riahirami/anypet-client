import { styled } from '@mui/material/styles';
import {
    Grid,
    Container
} from '@mui/material'

export const CustomGlobalGrid = styled(Grid)({
    paddingTop:"100px",
    width:'100%'
 });

export const CustomConversationBox = styled(Grid)(({ theme }) => ({
    display: "flex",
    backgroundColor: "ghostwhite",
    borderBottom: "1px solid skyblue",
    // borderRadius: "20px",
    margin: "5px",
    width:"99%",
    minWidth:"95vw",
}))
export const GridVerticalDivider = styled(Grid)(({ theme }) => ({
    borderLeft: "1px solid skyblue", paddingLeft: "25px" 
}))

