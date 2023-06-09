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
        width: "100%",
        height: "auto",
        backgroundColor: "aquamarine",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginTop: 'auto', // Pushes the footer to the bottom

      }}
      style={{ backgroundColor: themes[mode].footer.backgroundColor}} 
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              AnyPet App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | Anypli copyrights`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};