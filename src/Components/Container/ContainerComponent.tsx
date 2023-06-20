import React from "react";
import { Grid } from "@mui/material";
import { Props } from '../AppBar/Appbar.props';
import { themes } from '../../Theme/Themes';
import Categories from "Components/Categories/Categories";
import AllNotifications from "pages/AllNotifications";
import Signin from "pages/Signin/signin";
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
import AdsByState from "pages/Advertises/AdsByState";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard/Dashboard/Dashboard";
import MyAdvertises from "pages/Dashboard/Advertises/MyAdvertises";
import Update from "pages/Dashboard/Profile/Update";
import UserReservations from "pages/Dashboard/Reservations/UserReservations";
import { PATHS } from "routes/Path";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Playground } from "Layout/SideBar/SideBar";
import { ProSidebarProvider } from "Components/SidebarSrc/ProSidebarProvider";
import AddAdvertise from "pages/Dashboard/Advertises/AddAdvertise";
import AdUpdate from "pages/Dashboard/Advertises/AdUpdate";


export const ContainerComponent: React.FC<Props> = ({
    mode,
    handleThemeChange,
}) => {
    const authUser = useSelector((state: RootState) => state.auth);

    return (
        <Grid container spacing={1} style={{ minWidth: "700px", minHeight: "100vh", backgroundColor: themes[mode].container.backgroundColor }}>

            <Grid>
                <Routes>
                    <Route >
                        <Route path="/ads/state/:id" element={<AdsByState mode={mode} handleThemeChange={handleThemeChange} />} />

                        <Route path="/signin" element={<Signin />} />
                        <Route path="/home" element={
                            <Home mode={mode} handleThemeChange={handleThemeChange} />
                        } />
                        <Route
                            path="partner/:id"
                            element={
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <ShowPartner />
                                </Grid>} />
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
                            element={<Conversations handleThemeChange={handleThemeChange} mode={mode}  >
                            <Messages handleThemeChange={handleThemeChange} mode={mode}  />
                        </Conversations>} />
                        <Route
                            path="user/conversations/"
                            element={<Conversations handleThemeChange={handleThemeChange} mode={mode}  >
                                <Messages handleThemeChange={handleThemeChange} mode={mode}  />
                            </Conversations>} />
                        <Route
                            path="/contact-us"
                            element={<ContactUs />} />
                        <Route
                            path="/chat"
                            element={<Chat />} />
                        <Route
                            path="/myfavorites"
                            element={<ListFavorit mode={mode} handleThemeChange={handleThemeChange} />} />



                        <Route
                            path="/profile"
                            element={
                                <ProSidebarProvider>
                                    <Playground mode={mode} handleThemeChange={handleThemeChange} >
                                        <Update />
                                    </Playground>
                                </ProSidebarProvider>} />
                        <Route
                            path={PATHS.AddAdvertise}
                            element={
                                <ProSidebarProvider>
                                    <Playground mode={mode} handleThemeChange={handleThemeChange} >
                                        <AddAdvertise mode={mode} handleThemeChange={handleThemeChange} />
                                    </Playground>
                                </ProSidebarProvider>
                            } />
                        <Route
                            path={"myadvertises/" + authUser?.user?.id}
                            element={
                                <ProSidebarProvider>
                                    <Playground mode={mode} handleThemeChange={handleThemeChange} >
                                        <MyAdvertises mode={mode} handleThemeChange={handleThemeChange} />
                                    </Playground>
                                </ProSidebarProvider>
                            } />
                        <Route
                            path={PATHS.MYRESERVATIONS}
                            element={
                                <ProSidebarProvider>
                                    <Playground mode={mode} handleThemeChange={handleThemeChange} >
                                        <UserReservations mode={mode} handleThemeChange={handleThemeChange} />
                                    </Playground>
                                </ProSidebarProvider>
                            } />
 <Route
                            path={PATHS.updateAdvertise}
                            element={
                                <ProSidebarProvider>
                                    <Playground mode={mode} handleThemeChange={handleThemeChange} >
                                        <AdUpdate mode={mode} handleThemeChange={handleThemeChange} />
                                    </Playground>
                                </ProSidebarProvider>
                            } />
                    </Route>
                </Routes>
            </Grid>
        </Grid>
    );
};