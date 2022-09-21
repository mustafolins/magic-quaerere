import React, { Component } from 'react'
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// export this array so parent class can use it.
export const colors = [
    {
        color: 'green',
        code: 'g'
    },
    {
        color: 'white',
        code: 'w'
    },
    {
        color: 'red',
        code: 'r'
    },
    {
        color: 'blue',
        code: 'u'
    },
    {
        color: 'black',
        code: 'b'
    }
]

export default class ColorSelector extends Component {
    render() {
        return (
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="color-multiple-chip-label">Color</InputLabel>
                <Select
                    labelId="color-multiple-chip-label"
                    id="color-multiple-chip"
                    multiple
                    value={(this.props.color != null) ? this.props.color : []}
                    onChange={this.props.colorChanged}
                    input={<OutlinedInput id="color-select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        // render selected values as chips
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip
                                    key={colors.find((color) => color.code === value).color}
                                    label={colors.find((color) => color.code === value).color}
                                    style={
                                        {
                                            color: (value === 'w') ? 'black' : 'white',
                                            backgroundColor: colors.find((color) => color.code === value).color
                                        }
                                    } />
                            ))}
                        </Box>
                    )}
                >
                    {/* Create menu items from colors array. */}
                    {colors.map((color) => (
                        <MenuItem
                            key={color.color}
                            value={color.code}
                        >
                            {color.color}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
}
