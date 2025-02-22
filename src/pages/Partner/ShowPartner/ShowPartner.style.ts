import { styled } from "@mui/material/styles";
import {  Grid } from "@mui/material";

export const StyledGridLogo = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    marginTop:"10px",

});

export const StyledGridInfo = styled(Grid)({
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "nowrap",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",


});
export const StyledGridMedia = styled(Grid)({
    display: "flex",

});

export const StyledGlobalGrid = styled(Grid)({
    paddingTop: "100px",
//  width: "100vw",
 minWidth:"670px",  
 margin:"auto"
});

export const StyledGridInfoItem = styled(Grid)({
    display: "flex",
    padding:"20px"
});