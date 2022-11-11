import { AddPhotoAlternate } from '@mui/icons-material';
import { Button, CardActionArea, Divider, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextareaAutosize, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Dispatch, Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { PhotoLoader } from './PhotoLoader';


export interface DisappeareancesForm {
    name: string,
    locations?: google.maps.MVCArray,
    birthDate: Date,
    genre: string,
    nationality: string,
    eyes: string,
    hair: string,
    height: number,
    weight: number
    remarks: string
}
interface PersonalDataFormProps {
    formValues: DisappeareancesForm,
    setFormValues: Dispatch<DisappeareancesForm>,
    images: any[],
    setImages: Dispatch<any>
}
enum CommonColors {
    BLACK = 0, BROWN = 1, BLUE = 2, GREEN = 3, OTHER = 4
}
export const PersonalDataForm = ({ formValues, setFormValues, images = [], setImages }: PersonalDataFormProps) => {


    const updateFormField = (event: SyntheticEvent | SelectChangeEvent<string>) => {
        setFormValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    

    const updateBirthDate = (value: string) => {
        setFormValues((prev) => ({ ...prev, birthDate: value }));
    }
    return (
        <div>
        <Stack direction="row"

            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}>
            <Grid container spacing={3} className="personal-data-form" >
                <Grid xs={4}>
                    <TextField 
                        fullWidth 
                        label="Name" 
                        name="name" 
                        variant="filled" 
                        onChange={updateFormField} 
                        required
                        value={formValues.name}
                    />
                </Grid>
                <Grid xs={2}>
                    <TextField 
                        fullWidth 
                        label="Height" 
                        name="height" 
                        variant="filled" 
                        onChange={updateFormField} 
                        required
                        type='number'
                        value={formValues.height}
                    />
                </Grid>
                <Grid xs={2}>
                    <TextField 
                        fullWidth 
                        label="Weight" 
                        name="weight" 
                        variant="filled" 
                        onChange={updateFormField} 
                        required
                        type='number' 
                        value={formValues.weight}
                    />
                </Grid>
                <Grid xs={4}>
                    <DesktopDatePicker
                        label="BirthDate"
                        inputFormat="MM/dd/yyyy"
                        value={formValues.birthDate}
                        onChange={updateBirthDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid xs={3}>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValues.genre}
                            label="Genre"
                            name="genre"
                            onChange={updateFormField}
                            required
                        >
                            <MenuItem value={0}>Male</MenuItem>
                            <MenuItem value={1}>Female</MenuItem>
                            <MenuItem value={2}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <TextField 
                        fullWidth 
                        label="Nationality" 
                        name="nationality" 
                        variant="filled" 
                        required
                        onChange={updateFormField} 
                        value={formValues.nationality}
                    />
                </Grid>
                <Grid xs={3}>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label">eyes</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValues.eyes}
                            label="eyes"
                            name="eyes"
                            required
                            onChange={updateFormField}
                        >
                         
                            <MenuItem value={0}>Green</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={3}>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label">hair</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValues.hair}
                            label="hair"
                            name="hair"
                            onChange={updateFormField}
                            
                        >
                            <MenuItem value={0}>brown</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={8}>
                    <TextField
                        label="Remarks" 
                        value={formValues.remarks}
                        onChange={updateFormField}
                        name='remarks'
                        fullWidth
                        required
                        variant="filled" 
                    />
                </Grid>
            </Grid>
            <div style={{ width: '80%', padding: 10 }}>
                <PhotoLoader {...{ images, setImages }} />
            </div>

        </Stack>
        </div>
    )
};