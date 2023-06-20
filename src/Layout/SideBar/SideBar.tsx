import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "../../Components/SidebarSrc";

import { SidebarFooter } from "../../Components/SidebarSrc/SidebarFooter";
import { Badge } from "../../Components/SidebarSrc/Badge";
import { } from "../../Components/SidebarSrc/PackageBadges";
import { SidebarHeader } from "../../Components/SidebarSrc/SidebarHeader";

import { Diamond } from "../../icons/Diamond";
import { BarChart } from "../../icons/BarChart";
import { Global } from "../../icons/Global";
import { Book } from "../../icons/Book";
import { Calendar } from "../../icons/Calendar";
import { PATHS } from "../../routes/Path";

import { SideBarGrid, menuItemStyles } from "./SideBar.style";

import { } from "../../core/services/helpers";
import { useProfileQuery } from "redux/api/authApi";
import { Spinner } from "./../../Components/Spinner/spinner";
import { getToken, getCurrentUser } from "core/utils/functionHelpers";
import { useSelector } from "react-redux";
import { useGetMyAdsQuery } from "redux/api/adsApi";
import { Service } from "icons/Service";
import { User } from "icons/User";
import { Message } from "icons/Message";
import CustomLink from "Components/CustomLink/CustomLink"
import { Props } from "Components/AppBar/Appbar.props";
import { themes } from '../../Theme/Themes';
import { Grid } from "@mui/material"



export const Playground: React.FC<Props> = ({
  mode,
  handleThemeChange,
  children
}) => {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const tokenValue = getToken();

  const currentUser = getCurrentUser();
  const id = currentUser?.user?.id;
  const { data: dataProfile } = useProfileQuery(tokenValue.token);


  const { firstname, lastname, email, phone, avatar, role_id } =
    dataProfile?.user ?? {};

  const { data, isSuccess, isLoading } = useGetMyAdsQuery(id);

  const [role, setRole] = useState(role_id);
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (tokenValue) setRole(role_id);
  }, []);

  return (

    <Grid container>


      <Grid  >
        <SideBarGrid>
          <Sidebar
            // breakPoint="xs"
            backgroundColor={
              themes[mode].topbar.backgroundColor}
            rootStyles={{
              color: themes[mode].topbar.color, paddingTop: "70px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SidebarHeader
                style={{ marginBottom: "24px", marginTop: "16px" }}
              />
              <div style={{ flex: 1, marginBottom: "32px" }} >
                <Menu menuItemStyles={menuItemStyles} >
                  <CustomLink to="/profile">
                    <MenuItem
                      icon={<Book />}
                    >
                      Profil
                    </MenuItem></CustomLink>
                  <SubMenu
                    label="Advertise"
                    icon={<Diamond />}
                    suffix={
                      <Badge variant="danger" shape="circle">
                        {data?.count}
                      </Badge>
                    }
                  >

                    <CustomLink to={"/myadvertises/" + id}>  <MenuItem
                      suffix={
                        <Badge variant="danger" shape="circle">
                          {data?.count}
                        </Badge>
                      }
                    >
                      {" "}
                      My advertises
                    </MenuItem></CustomLink>
                    <CustomLink to={PATHS.AddAdvertise}>
                      <MenuItem>
                        {" "}
                        Add advertise
                      </MenuItem></CustomLink>
                  </SubMenu>

                  <CustomLink to={PATHS.MYRESERVATIONS}>
                    <MenuItem icon={<Calendar />}> Reservations</MenuItem>
                  </CustomLink>
                </Menu>
              </div>
              {/* <SidebarFooter collapsed={collapsed} /> */}
            </div>
          </Sidebar >
        </SideBarGrid >
      </Grid>
      <Grid style={{flex:"1"}} >
        {children}
      </Grid>
    </Grid>


  );




};
