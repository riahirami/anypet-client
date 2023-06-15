import React, { useState } from 'react'
import { StateTunisia } from "core/constant/StateTunisia"
import {
    Grid, ListItemButton,
    ListItemIcon,
    ListItemText, List, Collapse
} from "@mui/material"

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { CustomGlobalGrid } from 'Components/Categories/Categorie.style';
import CustomLink from 'Components/CustomLink/CustomLink';
import { useGetAllCategoriesQuery } from 'redux/api/categoryApi';
import { setCategories } from 'redux/slices/categorySlice';
import { Category } from 'core/models/category.model';
import AlertComponent from 'Components/Alert/Alert';
import TextSkeleton from 'Components/Skeleton/TextSkeleton';
import { Props } from '../AppBar/Appbar.props';
import { themes } from '../../Theme/Themes';

export const CategoryListCollapseComponent: React.FC<Props> = ({
    mode,
    handleThemeChange,
}) => {
    const [open, setOpen] = useState(false);

    const { data: dataAllCategory, isSuccess, isLoading } = useGetAllCategoriesQuery(100);

    const categories = useSelector((state: RootState) => state.category);

    const dispatch = useDispatch()

    if (isSuccess) {
        dispatch(setCategories(dataAllCategory));
    }


    const handleClick = () => {
        setOpen(!open);
    };


    if (isLoading)
        return (
            <TextSkeleton />
        )
    if (isSuccess)
        return (
            <Grid >

                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {isSuccess &&
                    categories?.categories?.data?.map((category: Category) => (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{
                                '&:hover': {
                                    backgroundColor: themes[mode].menuItem.hover.backgroundColor,
                                }
                            }}>
                                <CustomLink to={"/advertise/category/" + category.id}  >
                                    <ListItemButton sx={{ pl: 4,textDecoration: 'none',color: themes[mode].menuItem.link.color}}>
                                        <ListItemIcon>
                                            <ArrowForwardIosOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={category.title} />
                                    </ListItemButton>
                                </CustomLink>
                            </List>
                        </Collapse>
                    ))
                }
            </Grid>
        )

    return (
        <AlertComponent severity='error' title={"no category found"} />
    )

}

