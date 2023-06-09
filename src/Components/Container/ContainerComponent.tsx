import React from "react";
import { Grid } from "@mui/material";
import { Props } from '../AppBar/Appbar.props';
import { themes } from '../../Theme/Themes';
import Categories from "Components/Categories/Categories";
import AllNotifications from "pages/AllNotifications";
import Signin from "pages/signin";
import { Advertises } from "Components/Advertises/Advertises";
import {
    Routes,
    Route,
} from "react-router-dom";
import AdDetails from "pages/Advertises/AdDetails";
import AdsByCategory from "pages/Advertises/AdsByCategory";
import { UserDetails } from "pages/UserDetails/UserDetails";
import Conversations from "pages/Conversations/Conversations";
import Messages from "pages/Messages/Messages";
import Chat from "pages/Chat/Chat";
import ListFavorit from "pages/Advertises/ListFavorit";
import ContactUs from "pages/Contact-us/ContactUs";
import ChatComponent from "Components/Chat/ChatComponent";
import ListPartners from "pages/Partner/ListPartner/ListPartners";
import ShowPartner from "pages/Partner/ShowPartner/ShowPartner";

import Slider from "react-slick";
import StateListCollapseComponent from "Components/ListMenuCollapse/StateListCollapseComponent";
import { CategoryListCollapseComponent } from "Components/ListMenuCollapse/CategoryListCollapseComponent";


export const ContainerComponent: React.FC<Props> = ({
    mode,
    handleThemeChange,
}) => {

    return (
        <Grid container spacing={1} style={{ minHeight: "100vh", height: "100%", backgroundColor: themes[mode].container.backgroundColor }}>



            <Grid item md={12}>
                <Routes>
                    <Route >
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/home" element={
                            <><Grid container> <Grid item md={2}>

                                {/* <Categories mode={mode} handleThemeChange={handleThemeChange} /> */}
                                <CategoryListCollapseComponent />
                                <StateListCollapseComponent />
                                
                            </Grid>
                                <Grid item md={10}>

                                    <Advertises mode={mode} handleThemeChange={handleThemeChange} />
                                </Grid>
                            </Grid>
                                <Grid item md={12}>
                                    <ListPartners />
                                </Grid></>

                        } />
                        <Route
                            path="partner/:id"
                            element={<ShowPartner />} />
                        <Route path="/advertise/category/:id" element={<AdsByCategory mode={mode} handleThemeChange={handleThemeChange} />} />
                        <Route
                            path="advertise/:id"
                            element={<AdDetails handleThemeChange={handleThemeChange} mode={mode} />} />
                        <Route
                            path="notifications/:id"
                            element={<AllNotifications />} />
                        <Route
                            path="user/details/:id"
                            element={<UserDetails userId={""} />} />
                        <Route
                            path="user/messages/:id"
                            element={<Messages />} />
                        <Route
                            path="user/conversations/"
                            element={<Conversations />} />
                        <Route
                            path="/contact-us"
                            element={<ContactUs />} />
                        <Route
                            path="/chat"
                            element={<Chat />} />
                        <Route
                            path="/myfavorites"
                            element={<ListFavorit mode={mode} handleThemeChange={handleThemeChange} />} />
                    </Route>
                </Routes>
            </Grid>
        </Grid>
    );
};