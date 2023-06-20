import React, { useState } from 'react'
import {
    Routes,
    Route, Router
} from "react-router-dom";
import { Playground } from "../../../Layout/SideBar/SideBar";
import { Typography, Grid } from '@mui/material';
import { Props } from 'Components/AppBar/Appbar.props';
import { ProSidebarProvider } from 'Components/SidebarSrc';
import { Theme } from 'core/enums/theme';
import ContactUs from 'pages/Contact-us/ContactUs';
const Dashboard: React.FC<Props> = ({ mode, handleThemeChange }) => {

    return (
        <Grid container>


            <Grid item xs={4} sm={4} md={4} lg={4} >
                <ProSidebarProvider>
                    <Playground handleThemeChange={handleThemeChange} mode={mode} />
                </ProSidebarProvider>
            </Grid>
            <Grid className="content" item xs={8} sm={8} md={8} lg={8} >
              
            </Grid>

        </Grid>
    )
}

export default Dashboard