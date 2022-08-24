import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ResponsiveAppBar } from "../components/GlobalNavBar";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CollapsibleTable from "../components/LastActivityTable";
import Container from "@mui/material/Container";
import { CrimesMap } from "../components/Map";

const MetricBox: React.FC<{ crime: string; place: string; amount: number }> = ({
  crime,
  amount,
  place,
}) => {
  const boxStyle = {
    p: 2,
    m: 1,
    border: "1px #bdbbbbc7 solid",
    borderTop: "2px  #1976d2 solid",
    background: "#2222220a",
  };
  return (
    <Box sx={boxStyle}>
      <Stack direction={"column"}>
        <p style={{ margin: "3px 2px 11px 0px" }}>
          <MinorCrashIcon sx={{ marginRight: "5px" }} />
          {crime}
        </p>
        <p style={{ margin: 2, marginLeft: "31px" }}>
          {place} {amount} Incidentes
        </p>
        <Typography
          variant="caption"
          noWrap
          component="a"
          sx={{
            ml: 4,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Ultimo hace 3 min
        </Typography>
      </Stack>
    </Box>
  );
};

const Dashboard: NextPage = () => {
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-around"}>
        <MetricBox
          {...{ crime: "Robo mano Armada", place: "Cdmx", amount: 11 }}
        />
        <MetricBox {...{ crime: "Secuestro", place: "Edomex", amount: 2 }} />
        <MetricBox
          {...{ crime: "Homicidio", place: "Hidalgo", amount: 11 }}
        />{" "}
        <MetricBox
          {...{ crime: "Robo mano Armada", place: "Cdmx", amount: 11 }}
        />
        <MetricBox {...{ crime: "Secuestro", place: "Edomex", amount: 2 }} />
        <MetricBox {...{ crime: "Secuestro", place: "Edomex", amount: 2 }} />
      </Stack>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          noWrap
          sx={{
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
            mb: 3,
          }}
        >
          Last crimes in your zone
        </Typography>
        <Stack direction={"row"} spacing={3}>
          <CollapsibleTable />
          <CrimesMap />
        </Stack>
      </Box>
    </>
  );
};
export default Dashboard;
