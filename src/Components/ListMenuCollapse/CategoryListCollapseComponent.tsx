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

export const CategoryListCollapseComponent = () => {
    const [open, setOpen] = useState(true);

    const { data: dataAllCategory, isSuccess } = useGetAllCategoriesQuery(100);

    const categories = useSelector((state: RootState) => state.category);

    const dispatch = useDispatch()

    if (isSuccess) {
        dispatch(setCategories(dataAllCategory));
    }

    console.log({categories});

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <CustomGlobalGrid>

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {isSuccess &&
                categories?.categories?.data.map((category:Category) => (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <CustomLink to={"/advertise/category/" + category.id}>
                                <ListItemButton sx={{ pl: 4 }}>
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
        </CustomGlobalGrid>
    )
}

