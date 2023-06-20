import { MenuItem } from "@mui/material";
import React from "react";
import { StateSelectProps } from "./SelectState.type";
import { StyledTextFieldList } from "./SelectState.style";
import { StateTunisia } from "core/constant/StateTunisia";

const SelectState = ({ value, onChange }: StateSelectProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <StyledTextFieldList
            id="outlined-select-perPage"
            select
            label="Select state"
            value={value}
            onChange={handleChange}
        >
            <MenuItem >Select an option</MenuItem>
            {StateTunisia.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>
                    {item.name}
                </MenuItem>
            ))}
        </StyledTextFieldList>
    );
};

export default SelectState;
