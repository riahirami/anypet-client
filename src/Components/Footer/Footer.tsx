import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Props } from '../AppBar/Appbar.props';
import { themes } from '../../Theme/Themes';

export const  Footer: React.FC<Props>= ({
    mode,
    handleThemeChange,
  }) =>  {
  return (
    <Box
      sx={{
        minWidth:"692px",
        height: "auto",
        backgroundColor: "aquamarine",
        paddingTop: "1rem",
        // paddingBottom: "1rem",
        marginTop: 'auto', // Pushes the footer to the bottom instead of auto

      }}
      style={{ backgroundColor: themes[mode].footer.backgroundColor}} 
    >
      <Container >
        <Grid container direction="column" alignItems="center">
          <Grid item >
            <Typography color="black" variant="h5">
              AnyPet App
            </Typography>
          </Grid>
          <Grid item >
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | Anypli copyrights`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};