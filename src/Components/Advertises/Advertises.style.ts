import { styled } from "@mui/material/styles";
import { Button, FormControl, TextField, Grid } from "@mui/material";


export const CustomGlobalGrid = styled(Grid)({
   paddingTop: "100px",
   padding: "20px", 
});
export const CustomAdsGrid = styled(Grid)({
   // borderTop: "15px ridge #52c0ff",
   paddingTop:"20px",
});
export const CustomFilterGrid = styled(Grid)({

   // borderRadius: "0% 0% 10% 10% / 0% 0% 100% 100%",
//    borderTop: "5px ridge #52c0ff",
//   borderLeft: "5px ridge #52c0ff",
//   borderRight: "5px ridge #52c0ff",
  marginTop: "-20px",
  padding: "20px",
  margin: "auto",
  width: "90%",
});

export const CustomSearchBox = styled(Grid)({
   border:"2px solid gray",
   marginLeft: "15px",
   borderRadius: "10px",
   backgroundColor:"white"
});

