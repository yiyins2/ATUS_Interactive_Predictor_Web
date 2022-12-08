import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import axios from 'axios';
import { margin } from '@mui/system';


export default function InputCard(props) {

    const [age, setAge] = React.useState(10); 

    const handleAgeChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const [gender, setGender] = React.useState('');

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value);
    };

    const [race, setRace] = React.useState('');

    const handleRaceChange = (event: SelectChangeEvent) => {
        setRace(event.target.value);
    };

    // const handleUpdate = 

    return (
        <Box sx={{ width: 400, margin: 2}}>
            <Card variant="outlined" >
                <CardContent>
                    <Typography style={{fontSize: 20}}>
                        Model {props.model}
                    </Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ width: 320, marginLeft: 2, display: 'flex', flexDirection: 'row'}}>
                        <Typography style={{fontSize: 17, flex: 1}}>Age</Typography>
                        <Slider 
                            min={10}
                            step={1}
                            max={100}
                            valueLabelDisplay="auto"
                            style={{marginLeft:20}}
                            value={age}
                            onChange = {handleAgeChange}
                        />
                    </Box>

                    <Box sx={{width: 320, marginLeft: 2, marginTop: 1.5}}>
                    {/* <Typography style={{fontSize: 18}}>Race</Typography> */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gneder</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
                            >
                                <MenuItem value={10}>Female</MenuItem>
                                <MenuItem value={20}>Male</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{width: 320, marginLeft: 2, marginTop: 1.5}}>
                    {/* <Typography style={{fontSize: 18}}>Race</Typography> */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Race</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={race}
                                label="Race"
                                onChange={handleRaceChange}
                            >
                                <MenuItem value={10}>White</MenuItem>
                                <MenuItem value={20}>Asian</MenuItem>
                                <MenuItem value={30}>African</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{width: 320, marginLeft: 2, marginTop: 1.5}}>
                    <Button variant="contained" >
                        {/* onClick={handleUpdate} */}
                        Update Model
                    </Button>
                    </Box>
      
                </CardActions>
            </Card>
        </Box>
    )
};