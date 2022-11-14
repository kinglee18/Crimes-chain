import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import {
    Alert,
    AlertProps,
    Button,
    IconButton,
    Snackbar,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Web3Context } from "../context/web3Provider";
import Box from '@mui/material/Box';
import { CrimesMap } from "../components/Map";
import { DisappeareancesForm, PersonalDataForm } from "../components/PersonalDataForm";
import { CircleProps } from "../utils/interfaces";
import { create, IPFSHTTPClient } from "ipfs-http-client";


interface SnackBarOptions {
    open: boolean,
    message?: String,
    severity?: AlertProps
};

const AddMissingPerson: NextPage = () => {
    const { peopleContract } = useContext(Web3Context);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    const showPosition = (position: GeolocationPosition) => {
        setUserLocation(position)
    }

    const [snackbar, toogleSnackBar] = useState<SnackBarOptions>({ open: false });
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const steps = [
        { label: 'Register Personal Data', key: 'person' },
        { label: 'Disappeareance data', key: 'dissapeareance' },
    ];

    useEffect(() => {
        getLocation()
    }, []);

    const handleNext = () => {
        if (!validateForm()) {
            toogleSnackBar({ open: true, message: "You must fill all the fields", severity: 'warning' });
            return false;
        }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [userLocation, setUserLocation] = useState<GeolocationPosition>();
    const [formValues, setFormValues] = useState<DisappeareancesForm>({} as DisappeareancesForm);
    const [images, setImages] = useState<any[]>([]);
    const [locations, setLocations] = useState<CircleProps[]>([]);

    const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT;
    const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET;
    const authorization = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString('base64');


    let ipfs: IPFSHTTPClient | undefined;
    try {
        ipfs = create({
            url: "https://ipfs.infura.io:5001/api/v0",
            headers: { authorization }
        });
    } catch (error) {
        console.error("IPFS error ", error);
        ipfs = undefined;
    }

    const saveImages = async () => {
        const ipfsImages = [];
        const arrayBuf = await Promise.all(images.map(async (image) => await (await fetch(image)).arrayBuffer()) )
        arrayBuf.map(ab => new File([ab], 'img', { type: 'image/jpeg' }));
        for await (const file of (ipfs as IPFSHTTPClient).addAll(arrayBuf)) {
            ipfsImages.push(file.path)
          }
        return ipfsImages;
    };
    
    const registerDisappearance = async () => {
        const ipfsImages = await saveImages();
        let newLocations = locations.map(location => ({
            lat: location.coordinates.lat.toString(),
            lng: location.coordinates.lng.toString(),
            radius: location.radius.toString()
        }));
        const request = {
            ...formValues,
            images: ipfsImages,
            birthDate: formValues.birthDate.getTime()
        };
        peopleContract.createReport(newLocations, request).then(
            () => {
                toogleSnackBar({ open: true, message: 'Your information has been saved', severity: 'success' })
            }
        ).catch(
            (e:any) => {
                if (e.operation === 'sendTransaction') {
                    toogleSnackBar({ open: true, message: 'Connect your wallet to save this record', severity: 'warning' })
                } else {
                    toogleSnackBar({ open: true, message: e.message, severity: 'warning' })
                }
            }
        )
    };
    const submitForm = () => {
        if (locations.length >= 1) {
            registerDisappearance();
        } else {
            toogleSnackBar({ open: true, message: 'You need to register at leat one location', severity: 'warning' })
        }
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
            >
            </IconButton>
        </React.Fragment>
    );
    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };
    const validateForm = () => {
        for (const objValue of Object.values(formValues)) {
            if (objValue === undefined || objValue === null) {
                return false;
            }
        }
        return Object.values(formValues).length === 9 && images.length
    };
    return (
        <Box sx={{ margin: 3, padding: 5 }}>
            <form>
                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) => {
                        const stepProps: { completed?: boolean } = {};


                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={step.label} {...stepProps}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <Box sx={{ padding: 3 }}>

                    {
                        activeStep === 0 && (
                            <PersonalDataForm {...{ formValues, setFormValues, images, setImages }} />
                        )
                    }
                    {
                        activeStep === 1 && (
                            <DisappeareanceData {...{ userLocation, locations, setLocations }} />
                        )
                    }

                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>

                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="contained"
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                {activeStep === steps.length - 1 ?
                                    <Button type="button" onClick={submitForm} variant="contained">Save and Finish</Button> :
                                    <Button type="button" onClick={handleNext} variant="contained">Next</Button>
                                }
                            </Box>
                        </React.Fragment>
                    )}
                </Box>

            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={2000}
                onClose={() => toogleSnackBar({ open: false })}
                message={snackbar.message}
                action={action}
            >
                <Alert severity={snackbar.severity || 'info'}>{snackbar.message}</Alert>

            </Snackbar>
        </Box>
    );
};

type DisappeareanceDataProps = {
    userLocation: GeolocationPosition | undefined,
    locations: CircleProps[],
    setLocations: React.Dispatch<any>
}
const DisappeareanceData = ({ userLocation, locations, setLocations }: DisappeareanceDataProps) => {
    return (
        <Grid xs={12}>
            <Stack direction={"row"} spacing={3}>
                {userLocation && <CrimesMap {...{
                    initialPosition: userLocation,
                    enableControls: true,
                    locations,
                    setLocations
                }} />}
            </Stack>
        </Grid>
    );
}
export default AddMissingPerson;
