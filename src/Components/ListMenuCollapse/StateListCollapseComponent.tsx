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


const StateListCollapseComponent = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
                <Grid>
        

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
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <CustomLink to={"/ads/state/"+ state.id }>
                                <ListItemText primary={state.name} />
                                </CustomLink>
                            </ListItemButton>
                        </List>
                    </Collapse>
                ))
            }
        </Grid>
    )
}

export default StateListCollapseComponent