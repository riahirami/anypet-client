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
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Avatar, Tooltip, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Notifications from 'Components/Notifications/Notifications';
import ConversationsComponent from 'Components/Conversations/Conversations';
import CustomLink from 'Components/CustomLink/CustomLink';

import { pages, settings } from "./menuItem"
import { Badge } from 'Components/Badge/Badge';
import { RootState } from 'redux/store';
import { logout } from 'redux/slices/authSlice';
import { useLogoutUserMutation } from 'redux/api/authApi';

export const ResponsiveAppBar: React.FC<Props> = ({
  mode,
  handleThemeChange,
}) => {

  const languages = [
    { code: 'fr', name: 'Frensh', flag: <FlagFr /> },
    { code: 'en', name: 'English', flag: <FlagUSA /> },
  ];

  const authUser = useSelector((state: RootState) => state.auth);
  const favorite = useSelector((state: RootState) => state.favorite);

  const dispatch = useDispatch();


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

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
  const handleLanguageSelect = (code: string) => {
    // Implement your logic to set the selected language in your application
    console.log('Selected language:', code);
  };

  const [logoutUser] = useLogoutUserMutation() ;

  const logOut = async () => {
    const token = authUser?.token ;
    dispatch(logout());
    localStorage.clear();
    handleCloseUserMenu();
    if (token)
   { await logoutUser({token});}
  }

  return (
    <AppBar position="fixed" style={{ backgroundColor: themes[mode].topbar.backgroundColor }} >
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <CustomLink to={page.path} >
                    <Typography textAlign="center">{page.name}</Typography>
                  </CustomLink>
                </MenuItem>
              ))}
            </Menu>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <CustomLink to={page.path} >
                  {page.name} </CustomLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} style={{ display: "flex", alignItems: " center" }}>

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
                <Badge>{favorite?.favoriteList?.length > 0 ? favorite?.favoriteList?.length : 0}</Badge>
              </IconButton>
            </CustomLink>

            <ConversationsComponent />

            <Notifications />

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={authUser?.user?.avatar} />
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
