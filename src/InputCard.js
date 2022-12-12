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
import Switch from '@mui/material/Switch';

import axios from 'axios';


export default function InputCard(props) {

    const [age, setAge] = React.useState(10); 
    const [ageSwitch, setAgeSwitch] = React.useState(true); 

    const handleAgeChange = event => {
        setAge(event.target.value);
    };

    const [gender, setGender] = React.useState('');
    const [genderSwitch, setGenderSwitch] = React.useState(true);

    const handleGenderChange = event => {
        setGender(event.target.value);
    };

    const [race, setRace] = React.useState('');
    const [raceSwitch, setRaceSwitch] = React.useState(true); 

    const handleRaceChange = event => {
        setRace(event.target.value);
    };

    const [income, setIncome] = React.useState('');
    const [incomeSwitch, setIncomeSwitch] = React.useState(true); 

    const handleIncomeChange = event => {
        setIncome(event.target.value);
    };

    const handleUpdate = async event => {
        const features = []
        const feature_values = []
        if (ageSwitch) {
            features.push('age')
            feature_values.push(age)
        }
        if (genderSwitch) {
            features.push('gender')
            feature_values.push(gender)
        }
        if (raceSwitch) {
            features.push('race')
            feature_values.push(race)
        }
        if (incomeSwitch) {
            features.push('salary')
            feature_values.push(income)
        }
        const res = await axios.put(
            'http://127.0.0.1:5000/model_input_put', {
            'model': props.model, 
            'features': features, 
            'feature_values': feature_values
        })
        props.update_radar(res.data[0])
        props.update_bar(res.data[1])
        props.update_scatter(res.data[2])
    };


    const marginTop = 2; 
    const marginLeft = 0; 
    const cardWidth = 420; 

    return (
        <Box sx={{ width: 500, margin: 2}}>
            <Card variant="outlined" >
                <CardContent>
                    <Typography style={{fontSize: 22, color: props.color}}>
                        Model {props.model}
                    </Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ width: cardWidth, marginLeft: marginLeft, display: 'flex', flexDirection: 'row'}}>
                        <Switch checked={ageSwitch} style={{marginRight: 2}} onChange={e => {setAgeSwitch(e.target.checked); }} />
                        <Typography style={{fontSize: 17}}>Age</Typography>
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

                    <Box sx={{width: cardWidth, marginLeft: marginLeft, marginTop: marginTop, display: 'flex', flexDirection: 'row'}}>
                        <Switch checked={genderSwitch} onChange={e => {setGenderSwitch(e.target.checked); }} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
                            >
                                <MenuItem value={1}>Male</MenuItem>
                                <MenuItem value={2}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{width: cardWidth, marginLeft: marginLeft, marginTop: marginTop, display: 'flex', flexDirection: 'row'}}>
                        <Switch checked={raceSwitch} onChange={e => {setRaceSwitch(e.target.checked); }} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Race</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={race}
                                label="Race"
                                onChange={handleRaceChange}
                            >
                                <MenuItem value={1}>White only</MenuItem>
                                <MenuItem value={2}>Black only</MenuItem>
                                <MenuItem value={3}>American Indian, Alaskan Native only</MenuItem>
                                <MenuItem value={4}>Asian only</MenuItem>
                                <MenuItem value={5}>Hawaiian/Pacific Islander only</MenuItem>
                                <MenuItem value={6}>White-Black</MenuItem>
                                <MenuItem value={7}>White-American Indian</MenuItem>
                                <MenuItem value={8}>White-Asian</MenuItem>
                                <MenuItem value={9}>White-Hawaiian</MenuItem>
                                <MenuItem value={10}>Black-American Indian</MenuItem>
                                <MenuItem value={11}>Black-Asian</MenuItem>
                                <MenuItem value={12}>Black-Hawaiian</MenuItem>
                                <MenuItem value={13}>American Indian-Asian</MenuItem>
                                <MenuItem value={14}>American Indian-Hawaiian</MenuItem>
                                <MenuItem value={15}>Asian-Hawaiian</MenuItem>
                                <MenuItem value={16}>White-Black-American Indian</MenuItem>
                                <MenuItem value={17}>White-Black-Asian</MenuItem>
                                <MenuItem value={18}>White-Black-Hawaiian</MenuItem>
                                <MenuItem value={19}>White-American Indian-Asian</MenuItem>
                                <MenuItem value={20}>White-American Indian-Hawaiian</MenuItem>
                                <MenuItem value={21}>White-Asian-Hawaiian</MenuItem>
                                <MenuItem value={22}>Black-American Indian-Asian</MenuItem>
                                <MenuItem value={23}>White-Black-American Indian-Asian</MenuItem>
                                <MenuItem value={24}>White-American Indian-Asian-Hawaiian</MenuItem>
                                <MenuItem value={25}>Other 3 race combinations</MenuItem>
                                <MenuItem value={26}>Other 4 and 5 race combinations </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: cardWidth, marginLeft: marginLeft, display: 'flex', flexDirection: 'row', marginTop: marginTop}}>
                        <Switch checked={incomeSwitch} onChange={e => {setIncomeSwitch(e.target.checked); }} />
                        <Typography style={{fontSize: 17, flex: 1}}>Weekly Income</Typography>
                        <Slider 
                            min={0}
                            step={1}
                            max={30000}
                            valueLabelDisplay="auto"
                            style={{marginLeft:20}}
                            value={income}
                            onChange = {handleIncomeChange}
                        />
                    </Box>

                    <Box sx={{width: cardWidth, marginLeft: 2, marginTop: marginTop, marginBottom: 2}}>
                    <Button variant="contained" onClick={handleUpdate} style={{fontSize: 17}}>
                        Update Model
                    </Button>
                    </Box>
      
                </CardActions>
            </Card>
        </Box>
    )
};