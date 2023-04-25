import React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Summary = () => {
    const navigate = useNavigate();
  const data = useSelector((state) => state);

  return (
    <Box sx={{ m: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography variant="h3" >Summary</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Questions</TableCell>
              <TableCell>Answers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.user?.userData?.map((data, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data?.question}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {
                        typeof data?.ans === "object" && data?.ans?.map((data, index) => {
                            return(<p key={index}>{data}</p>)
                        })
                    }
                    {typeof data?.ans !== "object" && data?.ans}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button className="mt-5" onClick={() => navigate('/')} variant="contained">Go back</Button>
    </Box>
  );
};

export default Summary;
