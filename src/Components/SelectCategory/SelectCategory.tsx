import { MenuItem } from "@mui/material";
import React from "react";
import { CategorySelectProps } from "./SelectCategory.type";
import { StyledTextFieldList } from "./SelectCategory.style";

import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Category } from "core/models/category.model";
import { useGetAllCategoriesQuery } from "redux/api/categoryApi";
import { useDispatch } from 'react-redux';
import { setCategories } from 'redux/slices/categorySlice';

const SelectCategory = ({ value, onChange }: CategorySelectProps) => {
    const { data: dataAllCategory, isSuccess, isLoading } = useGetAllCategoriesQuery(100);

    const categories = useSelector((state: RootState) => state.category);

    const dispatch = useDispatch()

    if (isSuccess) {
        dispatch(setCategories(dataAllCategory));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <StyledTextFieldList
            id="outlined-select-perPage"
            select
            label="Select category"
            value={value}
            onChange={handleChange}
        >
            <MenuItem >Select an option</MenuItem>
            {categories?.categories?.data?.map((category: Category) => (
                <MenuItem key={category.id} value={category.id}>
                    {category.title}
                </MenuItem>
            ))}
        </StyledTextFieldList>
    );
};

export default SelectCategory;
