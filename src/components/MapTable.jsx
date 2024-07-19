import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function MapTable({ selectprovince }) {
  return (
    <TableContainer component={Paper}>
        <Typography component={"h1"} className="text-center bg-midnight text-white"> State Wise Data Table </Typography>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="center">State/Province</TableCell>
            <TableCell align="center">Confirmed Cases</TableCell>
            <TableCell align="center">Active Cases</TableCell>
            <TableCell align="center">Recovered Cases</TableCell>
            <TableCell align="center">Fatality Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectprovince.map((row) => (
            <TableRow
              key={row.region.lat}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.region.province}
              </TableCell>
              <TableCell align="center">{row.confirmed}</TableCell>
              <TableCell align="center">{row.active}</TableCell>
              <TableCell align="center">{row.recovered}</TableCell>
              <TableCell align="center">{row.fatality_rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
