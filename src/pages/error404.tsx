import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { PATHS } from "routes/Path";
import CustomLink from "Components/CustomLink/CustomLink";


export default function Unauthorized() {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} textAlign="center">
          <Typography variant="h1">404</Typography>
          <Typography variant="h6">
            You are not authorized to access this page!
          </Typography>
          <Button variant="contained"><CustomLink to={PATHS.PROFILE}>
            Back Home
          </CustomLink>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
