import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../Home/homeStyle.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Button, Grid, TextField } from "@mui/material";
import { Data } from "../../data/data";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/reducer/userReducer";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormLabel } from "react-bootstrap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questionAns, setQuestionsAns] = useState(Data);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedCheckBox, setSelectedCheckBox] = useState([]);
  const [allCheckBox, SetAllCheckBox] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("radio");
  const [question, setQuestion] = useState();
  const [ans, setAns] = useState([]);

  const getPreviosData = useSelector((state) => state?.user?.userData);

  // console.log('---------- getting previos data ----------', getPreviosData);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getValue = (value) => {
    setSelectedValues((current) => [...current, value]);
  };

  const getCheckBoxValue = (e, question) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCheckBox([...selectedCheckBox, value]);
    } else {
      setSelectedCheckBox(selectedCheckBox?.filter((e) => e !== value));
    }
    const newData = { question: question, ans: selectedCheckBox };
    SetAllCheckBox(newData);
  };

  const gotToSummary = () => {
    const mergedData = [...selectedValues, allCheckBox];
    dispatch(setUserData(mergedData));
    navigate("/summary");
  };

  const Addnew = () => {
    const newDataToAdd = {
      question: question,
      ansType: value,
      ans: ans
    }
    const mergedData = [...selectedValues, allCheckBox];
    dispatch(setUserData([...mergedData,newDataToAdd]));
    navigate("/summary");
    setOpen(false);
  }

  return (
    <Box className="p-2 m-5">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              sx={{ m: 1 }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Add new
            </Typography>
            <TextField
              sx={{ m: 1 }}
              fullWidth
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              label="Please Enter Question"
              variant="outlined"
            />
            <TextField
              sx={{ m: 1 }}
              fullWidth
              id="outlined-basic"
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              label="Please enter Ans"
              variant="outlined"
            />
            <FormControl sx={{ m: 1 }}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="radio"
                  control={<Radio />}
                  label="Single Select"
                />
                <FormControlLabel
                  value="checkbox"
                  control={<Radio />}
                  label="Multiple select"
                />
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button onClick={() => Addnew()} variant="contained">Add</Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <Card>
        <CardContent>
          <Box className="inner-box-contaimer">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid xs={12} sx={{ textAlign: "center" }}>
                  <span className="titleText">
                    Pain & Functional Description
                  </span>
                  <p>
                    The description of the current situation gives you Optimum
                    Trainer a picture of and clues to the underlying cases of
                    your problems
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <span>
                    If you have problem with pain/aches, stiffness, weakness of
                    functional problems, describe this/these below. (List the
                    symptoms in descending order with the most troublesome
                    first)
                  </span>
                </Grid>
                <Grid xs={12}>
                  <div className="empty-div mt-2"></div>
                </Grid>
                {questionAns?.map((data, index) => {
                  return (
                    <Grid key={index} xs={12}>
                      <Box className="question-answer-view">
                        <span> {data?.question} </span>
                        {data?.ansType === "radio" && (
                          <FormControl>
                            <RadioGroup
                              row
                              sx={{ m: 2 }}
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              {data?.ans?.map((ans, index) => {
                                return (
                                  <FormControlLabel
                                    key={index}
                                    value={ans}
                                    onChange={(e) =>
                                      getValue({
                                        question: data?.question,
                                        ans: e.target.value,
                                      })
                                    }
                                    control={<Radio />}
                                    label={ans}
                                  />
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                        )}
                      </Box>
                      {data?.ansType === "checkbox" && (
                        <FormGroup>
                          {data?.ans?.map((ans, index) => {
                            return (
                              <FormControlLabel
                                key={index}
                                required
                                value={ans}
                                onChange={(e) =>
                                  getCheckBoxValue(e, data?.question)
                                }
                                control={<Checkbox />}
                                label={ans}
                              />
                            );
                          })}
                        </FormGroup>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <Box sx={{ justifyContent: "center" }}>
              <AddCircleIcon
                onClick={handleOpen}
                fontSize="large"
                className="plushIcon"
              />
              <hr />
            </Box>
            <Box className="buttonView mt-5">
              <Button sx={{ mr: 1, minWidth: "150px" }} variant="contained">
                Back
              </Button>
              <Button
                onClick={() => gotToSummary()}
                sx={{ ml: 1, minWidth: "150px" }}
                variant="contained"
              >
                Next
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
