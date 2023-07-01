import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

export const StyledHeaderCaroussel = styled(Grid)({
    display: "flex",
    justifyContent: "space-around",
});
export const GridCarousel = styled(Grid)({
    width: "90vw", 
    height: "600px", 
    objectFit: "contain",
    minWidth: "690px", 
    margin: "auto", 
    // marginRight:"50px",
    marginBottom: "90px", 
    paddingTop: "120px",

});