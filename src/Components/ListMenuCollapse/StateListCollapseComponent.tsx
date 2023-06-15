import React from 'react'
import { StateTunisia } from "core/constant/StateTunisia"
import {
    Typography, Grid, ListItemButton,
    ListItemIcon,
    ListItemText, List, Collapse
} from "@mui/material"

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SignpostIcon from '@mui/icons-material/Signpost';

import { CustomGlobalGrid } from 'Components/Categories/Categorie.style';
import CustomLink from 'Components/CustomLink/CustomLink';
import { PATHS } from 'routes/Path';

import { Props } from '../AppBar/Appbar.props';
import { themes } from '../../Theme/Themes';

const StateListCollapseComponent: React.FC<Props> = ({
    mode,
    handleThemeChange,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Grid >


            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <SignpostIcon />
                </ListItemIcon>
                <ListItemText primary="State" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {
                StateTunisia.map((state) => (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <CustomLink to={"/ads/state/" + state.id}>
                                <ListItemButton sx={{
                                    textDecoration: 'none', color: themes[mode].menuItem.link.color,
                                    '&:hover': {
                                        backgroundColor: themes[mode].menuItem.hover.backgroundColor,
                                    }
                                }}>
                                    <ListItemIcon  >
                                        <LocationOnIcon  />
                                    </ListItemIcon>
                                    <ListItemText primary={state.name} />
                                </ListItemButton>
                            </CustomLink>
                        </List>
                    </Collapse>
                ))
            }
        </Grid>
    )
}

export default StateListCollapseComponent