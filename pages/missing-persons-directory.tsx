import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Collapse,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import contem from "../public/contemplative-reptile.jpeg";
import Image from "next/image";
import Grid from "@mui/material/Unstable_Grid2";
import WorkIcon from "@mui/icons-material/Work";
import ImageIcon from "@mui/icons-material/Image";
import {
  ExpandLess,
  ExpandMore,
  Girl,
  RemoveRedEye,
  StarBorder,
  SvgIconComponent,
} from "@mui/icons-material";
import FaceIcon from "@mui/icons-material/Face";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Web3Context } from "../context/web3Provider";
import { AppLink } from "../components/AppLink";

interface Person {
  name: string;
}
interface Colapse {
  children: React.ReactNode;
  content: Person;
}
const CollapsibleSection = ({ children, content }: Colapse) => {
  return (
    <>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>{children}</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Body" />
        {true ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div"></List>
      </Collapse>
    </>
  );
};
const MissingPersonDirectory: NextPage = () => {
  const { peopleContract } = useContext(Web3Context);
  const [personsDirectory, setPersonsDirectory] = useState<Person[]>([]);

  useEffect(() => {
    const getRecords = async () => {
      const records = await  peopleContract.getCrimeReports()
      setPersonsDirectory(records)
    };
    getRecords()
  }, [peopleContract]);

  return (
    <Stack>
      <Stack direction={'row'} spacing={3} justifyContent="center" alignItems="center">
        

        <Button variant="outlined" >
          <AppLink href={'add-missing-person' } label={'Register disappearance'} />
        </Button>
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        p={3}
      >
        {
          personsDirectory.map((person: Person, index: number) => (
            <Grid xs={2} sm={4} md={4} key={`image-${index}`}>
              <Card sx={{ p: 3 }}>
                <Stack direction="row">
                  <Image
                    height="140"
                    width="440"
                    alt="green iguana"
                    src="/contemplative-reptile.jpeg"
                  />
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          <FaceIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Appearance" />
                      {true ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                      <List component="div">
                        <div style={{ paddingLeft: 60 }}>
                          Cabello: lacio, largo, cafe Ojos: medianos cafe Tez:
                          morena Cejas: Semipobladas Boca:- Nariz:
                        </div>
                      </List>
                    </Collapse>

                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          <Girl />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Body" />
                      {true ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                      <List component="div">
                        <div style={{ paddingLeft: 60 }}>Complexion: bombona</div>
                      </List>
                    </Collapse>

                    <CollapsibleSection content={person}>
                      <FaceIcon />
                    </CollapsibleSection>
                  </List>
                </Stack>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Stack>
  );
};

export default MissingPersonDirectory;
