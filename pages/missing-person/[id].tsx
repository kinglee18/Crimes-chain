
import { Avatar, Box, Card, Container, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { MissingPeople } from '../../dapp/typechain-types';
import { Web3Context } from '../../context/web3Provider';
import { useRouter } from 'next/router';
import { Boy, Girl, Person } from '@mui/icons-material';
import moment from 'moment';
import { CrimesMap } from '../../components/Map';
import { CustomizedTimeline } from '../../components/Timeline';
import { CommonColors } from '../../utils/interfaces';

function MissinPerson() {
    const { peopleContract } = useContext(Web3Context);
    const [record, setPersonsDirectory] = useState<MissingPeople.ReportStructOutput>();
    const router = useRouter();
    const { id } = router.query;
    const [userLocation, setUserLocation] = useState<GeolocationPosition>();
    const [locations, setLocations] = useState([]);
    const [followUpReports, setFollowUpReports] = useState([]);

    const showPosition = (position: GeolocationPosition) => {
        setUserLocation(position)
    }
    const submitTip = async (detail: string) => {
        try {
            const response = await peopleContract.createFollowup(detail, Number.parseInt(id));
            await response.wait();
        } catch (error) {
            console.log(error);
        }
    };
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    useEffect(() => {
        getLocation()
    }, []);

    useEffect(() => {
        const getRecords = async () => {
            let records = await peopleContract.getCrimeReports();
            setPersonsDirectory(records[id]);
            const locationsToShow = await peopleContract.getAllReportCoordinates(id);
            setLocations(locationsToShow.map(loc => ({
                coordinates: {
                    lat: Number.parseFloat(loc.lat),
                    lng: Number.parseFloat(loc.lng),
                },
                radius: Number.parseFloat(loc.radius)
            })));
            const newReports = await peopleContract.getFollowupReports(id);
            setFollowUpReports(newReports);
        };
        if (id) {
            getRecords();
        }
    }, [peopleContract, id]);


    const person = record?.missingPerson;


    return (
        <Container sx={{ marginTop: 2 }}>
            {record &&
                (<Card sx={{ p: 3 }}>
                    <Stack direction="row" pb={3}>
                        <Image
                            height="440"
                            width="440"
                            alt="photo"
                            src={`https://ipfs.io/ipfs/${person.images[0]}`}
                        />

                        <List
                            sx={{
                                width: "100%",
                                bgcolor: "background.paper",
                            }}
                        >
                            <Stack direction={'row'} pl={2}>
                                <ListItemAvatar>
                                    <Avatar>
                                        {
                                            person.genre === 0 && <Boy />
                                        }
                                        {
                                            person.genre === 1 && <Girl />
                                        }
                                        {
                                            person.genre === 2 && <Person />
                                        }
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={person.name} />
                            </Stack>

                            <Box pl={2}>
                                <ListItem divider={true} disablePadding>
                                    <ListItemText primary={`Weight: ${person.weight.toString()}`} />
                                </ListItem>
                                <ListItem divider={true} disablePadding>
                                    <ListItemText primary={`Height: ${person.height.toString()}`} />
                                </ListItem>
                                <ListItem divider={true} disablePadding>
                                    <ListItemText
                                        primary={`Birth Date: ${moment(Number.parseInt(person.birthDate.toString())).format('DD-MMM-YYYY')}`}
                                    />
                                </ListItem>
                                <ListItem divider={true} disablePadding>
                                    <ListItemText primary={`Nationality: ${person.nationality}`} />
                                </ListItem>
                                <ListItem  divider disablePadding>
                                    <ListItemText primary={`Hair: ${CommonColors[person.eyes]}`} divider />
                                    </ListItem>
                                    <ListItem  divider disablePadding>
                                    <ListItemText primary={`Hair: ${CommonColors[person.hair]}`} divider />
                                </ListItem>
                            </Box>
                        </List>
                    </Stack>
                    {userLocation && <CrimesMap  {...{
                        initialPosition: userLocation,
                        enableControls: false,
                        locations
                    }} />}
                    {record && <CustomizedTimeline {...{ record, submitTip, followUpReports }} />}
                </Card>
                )}
        </Container >
    )
}

export default MissinPerson