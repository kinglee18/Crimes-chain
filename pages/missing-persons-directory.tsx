import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Boy,
  ExpandLess,
  ExpandMore,
  Girl,
  Person,
} from "@mui/icons-material";
import { Web3Context } from "../context/web3Provider";
import { AppLink } from "../components/AppLink";
import { MissingPeople } from "../dapp/typechain-types";
import moment from "moment";
import Link from "next/link";
import { CommonColors } from "../utils/interfaces";


const MissingPersonDirectory: NextPage = () => {
  const { peopleContract } = useContext(Web3Context);
  const [personsDirectory, setPersonsDirectory] = useState<MissingPeople.ReportStructOutput[]>([]);

  useEffect(() => {
    const getRecords = async () => {
      let records = await peopleContract.getCrimeReports();
      setPersonsDirectory(records)
    };
    getRecords()
  }, [peopleContract]);


  return (
    <Stack>
      <Stack direction={'row'} spacing={3} justifyContent="center" alignItems="center" sx={{mt: 3}}>
        <Button variant="outlined" >
          <AppLink href={'add-missing-person'} label={'Register disappearance'} />
        </Button>
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        p={3}
      >
        {
          personsDirectory.map((record, index: number) => {
            const {missingPerson} = record;
            return <Grid xs={2} sm={4} md={4} key={`image-${index}`}>
                <Card sx={{ p: 3 }}>
                  <Link href={`/missing-person/${record.id}/`}>
                  <Stack direction="row">
                    <Image
                      height="440"
                      width="440"
                      alt="green iguana"
                      src={`https://ipfs.io/ipfs/${missingPerson.images[0]}`}
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
                              missingPerson.genre === 0 && <Boy/>
                            }
                                                      {
                              missingPerson.genre === 1 && <Girl/>
                            }
                                                      {
                              missingPerson.genre === 2 && <Person/>
                            }
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={missingPerson.name} />
                      </Stack>

                      <Box pl={2}>
                        <ListItem  divider disablePadding>
                          <ListItemText primary={`Weight: ${missingPerson.weight.toString()}`} divider />
                        </ListItem>
                        <ListItem  divider disablePadding>
                          <ListItemText primary={`Height: ${missingPerson.height.toString()}`} divider />
                        </ListItem>
                        <ListItem  divider disablePadding>
                          <ListItemText 
                            primary={`Birth Date: ${ moment(Number.parseInt(missingPerson.birthDate.toString())).format('DD-MMM-YYYY')}`}
                            divider
                          />
                        </ListItem>
                        <ListItem  divider disablePadding>
                          <ListItemText primary={`Nationality: ${missingPerson.nationality}`} divider />
                        </ListItem>
                        <ListItem  divider disablePadding>
                          <ListItemText primary={`Hair: ${CommonColors[missingPerson.eyes]}`} divider />
                        </ListItem>
                        <ListItem  divider disablePadding>
                          <ListItemText primary={`Hair: ${CommonColors[missingPerson.hair]}`} divider />
                        </ListItem>
                      </Box>
                    </List>
                  </Stack>
                  </Link>
                </Card>
              </Grid>
          })
        }
      </Grid>
    </Stack>
  );
};

export default MissingPersonDirectory;
