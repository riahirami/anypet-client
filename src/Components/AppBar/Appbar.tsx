import * as React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import { Props } from './Appbar.props';
import { themes } from '../../Theme/Themes';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Theme } from "../../core/enums/theme";
import LanguageButton from '../LanguageSelector/LanguageSelector';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import FlagFr from '../Flags/FlagFr';
import FlagUSA from '../Flags/FlagUSA';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Avatar, Tooltip, Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Notifications from 'Components/Notifications/Notifications';
import ConversationsComponent from 'Components/Conversations/Conversations';
import CustomLink from 'Components/CustomLink/CustomLink';

import { pages, settings } from "./menuItem"
import { Badge } from 'Components/Badge/Badge';
import { RootState } from 'redux/store';
import { logout } from 'redux/slices/authSlice';
import { useLogoutUserMutation } from 'redux/api/authApi';
import { useState } from 'react';

export const ResponsiveAppBar: React.FC<Props> = ({
  mode,
  handleThemeChange,
}) => {

  const languages = [
    { code: 'fr', name: 'Frensh', flag: <FlagFr /> },
    { code: 'en', name: 'English', flag: <FlagUSA /> },
  ];

 
  const authUser = useSelector((state: RootState) => state.auth);
  const listFavorites = useSelector((state: any) => state.favorite.favoriteList);

  const dispatch = useDispatch();
  

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElUserXs, setAnchorElUserXs] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserXs = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserXs(event.currentTarget);
  };
  const handleCloseUserXs = () => {
    setAnchorElUserXs(null);
  };

  const handleLanguageSelect = (code: string) => {
    // Implement your logic to set the selected language in your application
    console.log('Selected language:', code);
  };

  const [logoutUser] = useLogoutUserMutation();

  const logOut = async () => {
    const token = authUser?.token;
    dispatch(logout());
    localStorage.clear();
    handleCloseUserMenu();
    if (token) { await logoutUser({ token }); }
  }

  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: themes[mode].topbar.backgroundColor, color: themes[mode].topbar.color }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Anypet
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', lg: 'none' } }}

          >
            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={handleOpenDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="bottom"
              open={open}
              onClose={handleCloseDrawer}
            >
              <List style={{ display: "flex", backgroundColor: themes[mode].sideBar.backgroundColor }}>
                <ListItem
                  onClick={handleCloseDrawer}
                >
                  <ListItemText>
                    <IconButton onClick={handleThemeChange}>
                      {mode === Theme.LIGHT ? (
                        <DarkModeOutlinedIcon />
                      ) : (
                        <LightModeOutlinedIcon />
                      )}
                    </IconButton>
                  </ListItemText>
                </ListItem>
                <ListItem
                >
                  <ListItemText>
                    <LanguageButton languages={languages} onSelectLanguage={handleLanguageSelect} />
                  </ListItemText>
                </ListItem>
                <ListItem
                  onClick={handleCloseDrawer}
                >
                  <ListItemText>
                    <CustomLink to="/myfavorites">
                      <IconButton>
                        <FavoriteIcon color="error" />
                        <Badge>{(listFavorites.data && listFavorites.data.length) > 0 ? listFavorites.data?.length : 0}</Badge>
                      </IconButton>
                    </CustomLink>
                  </ListItemText>
                </ListItem>
                <ListItem
                >
                  <ListItemText>
                    <ConversationsComponent />
                  </ListItemText>
                </ListItem>
                <ListItem
                  onClick={handleCloseDrawer}
                >
                  <ListItemText>
                    <Notifications />
                  </ListItemText>
                </ListItem>
                <ListItem
                >
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserXs} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={authUser?.user?.avatar} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '-48px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUserXs}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElUserXs)}
                    onClose={handleCloseUserXs}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.name} onClick={() => {
                        if (setting.name === 'Logout') {
                          logOut();
                        }
                      }}>
                        <CustomLink to={setting.path}>
                          <Typography textAlign="center">{setting.name}</Typography>
                        </CustomLink>
                      </MenuItem>
                    ))}
                  </Menu>
                </ListItem>
              </List>
            </Drawer>
          </Box>


          <PetsIcon sx={{ display: { xs: 'none', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AnyPet
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <CustomLink to={page.path} >
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block', color:themes[mode].topbar.color               }}
              >
                  {page.name} 
              </Button>
                  </CustomLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: " center" }}>
            <IconButton onClick={handleThemeChange}>
              {mode === Theme.LIGHT ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <LanguageButton languages={languages} onSelectLanguage={handleLanguageSelect} />
            <CustomLink to="/myfavorites">
              <IconButton>
                <FavoriteIcon color="error" />
                <Badge>{(listFavorites.data && listFavorites.data.length) > 0 ? listFavorites.data?.length : 0}</Badge>
              </IconButton>
            </CustomLink>

            <ConversationsComponent />

            <Notifications />

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={authUser?.user?.firstname} src={authUser?.user?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => {
                  if (setting.name === 'Logout') {
                    logOut();
                  }
                }}>
                  <CustomLink to={setting.path}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </CustomLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
