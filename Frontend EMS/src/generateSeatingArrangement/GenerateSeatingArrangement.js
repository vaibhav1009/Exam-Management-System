import React, { useState } from "react";
import { useNavigate } from "react-router";
import lnmiit2 from "../images/seats.png";
import logo1 from "../images/logo1.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { Button, Dropdown } from "react-bootstrap";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";

const GenerateSeatingArrangement=()=>{
    const navigate=useNavigate();

    const availableCourseYears=[{
        year: "2021-22-I"
    },
    {
        year: "2021-22-II"
    },
    {
        year: "2022-23-I"
    },
    {
        year: "2022-23-II"
    },
    {
        year: "2023-24-I"
    },
    {
        year: "2023-24-II"
    }];

    const examName=[{
        exam: "Mid-Semester"
    },
    {
        exam: "End-Semester"
    }];
    
    const MidsemExamTime=[{
        time: "08:00 AM -09:30 AM"
    },
    {
        time: "10:00 AM -11:30 AM"
    },
    {
        time: "12:00 PM -01:30 PM"
    },
    {
        time: "02:00 PM -03:30 PM"
    },
    {
        time: "04:00 PM -05:30 PM"
    }];

    const EndsemExamTime=[{
        time: "08:00 AM -11:00 AM"
    },
    {
        time: "11:30 AM -02:30 PM"
    },
    {
        time: "03:00 PM -06:00 PM"
    }];

    const batchYear=[{
        year: "1"
    },
    {
        year: "2"
    },
    {
        year: "3"
    },
    {
        year: "4"
    }];

    const branchName=[{
        name: "CSE"
    },
    {
        name: "CCE"
    },
    {
        name: "ME"
    },
    {
        name: "ECE"
    },
    {
        name: "All"
    }];

    const [courseYear,setCourseYear]=useState("2021-22-I");
    const [currentExamName,setCurrentExamName]=useState("Mid-Semester");
    const [currentBatchYear,setCurrentBatchYear]=useState("1");
    const [currentBranchName,setCurrentBranchName]=useState("CSE");
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState("8:00 AM - 9:30 AM");

    const handleDateChange=(date)=>{
        setStartDate(date);
    }
    const handleSeatingArrangement= (e)=>{
        e.preventDefault();
        let today = new Date().toLocaleDateString();
        let chooseDate = startDate.toLocaleDateString();

        if(today==chooseDate)
        {
            alert("You cant choose today's date");
        }
        else
        {
            alert("Seating Arrangement Created. To download seating arrangement , go to the next page");
            const data={
                CourseSemester:courseYear,
                ExamName:currentExamName,
                Batch:currentBatchYear,
                Branch:currentBranchName,
                Date:startDate,
                Time:startTime
            };
            if(currentBatchYear=="1")
            {
                setCurrentBranchName("All");
                data.Branch="All";
            }
            try {
                //use fetch operation here
               // e.preventDefault();
               
                const datao = {courseYear,currentExamName,currentBatchYear,currentBranchName,startDate,startTime};
               
                fetch('http://localhost:5000/',{
                    method:'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(datao)
                }).then(()=>{
                     console.log("DOne");
                })
        
        
                alert("Creating Seating Arrangement ....");

                
            } catch (e) {
                if (e.response && e.response.data) {
                    alert("Received some error while sending data");
                }
            }
        }
    }

    return <>
    <div style={{position:"absolute", height:"100vh", width:"100vw",zIndex:"-2",opacity:"0.9"}}>
            <img
                src={lnmiit2}
                width="100%"
                height="100%"
            />
    </div>
    <div style={{paddingTop:"30vh",paddingLeft:"20vw"}}>
        <div className="uploadBox">
                <div className="headerUploadBox">
                    <div className="logoUploadBox">
                    <img
                        src={logo1}
                        width="100%"
                        height="100%"
                    />
                    </div>
                    <div className="titleUploadBox">
                        <h3>Generate Seating Arrangement</h3>
                    </div>
                    <div className="logoutUploadBox">
                        <button className="logoutButton" onClick={()=>{navigate("/login")}}>LOGOUT</button>
                    </div>
                </div>
                <div className="bodyGenerateSeatingArrangementBox">
                    <div className="upperBodyBox">

                        <div className="upperColumns">
                            <h6 style={{marginBottom:"30px", fontFamily:"Verdana"}}>Academic Year</h6>
                            <Dropdown>
                                <Dropdown.Toggle  className="customDropDown" id="dropdown-basic">
                                    {courseYear}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        availableCourseYears && availableCourseYears.map(
                                            (currentCourseYear)=>
                                            <Dropdown.Item onClick={()=>{setCourseYear(currentCourseYear.year)}}>{currentCourseYear.year}</Dropdown.Item>
                                        )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="upperColumns">
                            <h6 style={{marginBottom:"30px", fontFamily:"Verdana"}}>Exam</h6>
                            <Dropdown>
                                <Dropdown.Toggle  className="customDropDown" id="dropdown-basic">
                                    {currentExamName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        examName && examName.map(
                                            (currentExam)=>
                                            <Dropdown.Item onClick={()=>{
                                                setCurrentExamName(currentExam.exam);
                                                if(currentExam.exam=="Mid-Semester"){
                                                    setStartTime("8:00 AM - 9:30 AM");
                                                }
                                                else{
                                                    setStartTime("8:00 AM - 11:00 AM");
                                                }
                                            }}>{currentExam.exam}</Dropdown.Item>
                                        )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="upperColumns">
                            <h6 style={{marginBottom:"30px", fontFamily:"Verdana"}}>Batch Year</h6>
                            <Dropdown>
                                <Dropdown.Toggle  className="customDropDown" id="dropdown-basic">
                                    {currentBatchYear}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        batchYear && batchYear.map(
                                            (batch)=>
                                            <Dropdown.Item onClick={()=>{setCurrentBatchYear(batch.year)}}>{batch.year}</Dropdown.Item>
                                        )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="upperColumns">
                            <h6 style={{marginBottom:"30px", fontFamily:"Verdana"}}>Branch</h6>
                            <Dropdown>
                                {
                                    currentBatchYear=="1" ?
                                    <Dropdown.Toggle  className="customDropDown disabled" id="dropdown-basic">
                                     All
                                    </Dropdown.Toggle>
                                    :
                                    <>
                                        <Dropdown.Toggle  className="customDropDown" id="dropdown-basic">
                                        {currentBranchName}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        {
                                            branchName && branchName.map(
                                                (branch)=>
                                                <Dropdown.Item onClick={()=>{setCurrentBranchName(branch.name)}}>{branch.name}</Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </>
                                }
                            </Dropdown>
                        </div>

                    </div>
                    <div className="lowerBodyBox">
                        <div className="lowerColumns">
                            <h6>Start Date Of Exams</h6>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <Grid container justifyContent='space-around'>
                                    <KeyboardDatePicker
                                    minDate={new Date()}
                                    disableToolbar
                                    variant='dialog'
                                    format='MM/dd/yyyy'
                                    margin='normal'
                                    id='date-picker'
                                    label='Date Picker'
                                    value={startDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label':'change-date'
                                    }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="lowerColumns">
                            <h6 style={{marginBottom:"30px", fontFamily:"Verdana"}}>Start Time Of Exams</h6>  
                            
                            <Dropdown>
                                <Dropdown.Toggle  className="customDropDown" id="dropdown-basic">
                                    {startTime}
                                </Dropdown.Toggle>
                                {
                                    currentExamName=="Mid-Semester" ?
                                    <Dropdown.Menu>
                                        {
                                            MidsemExamTime && MidsemExamTime.map(
                                                (examTime)=>
                                                <Dropdown.Item onClick={()=>{setStartTime(examTime.time)}}>{examTime.time}</Dropdown.Item>
                                            )}
                                    </Dropdown.Menu>
                                    :
                                    <Dropdown.Menu>
                                        {
                                            EndsemExamTime && EndsemExamTime.map(
                                                (examTime)=>
                                                <Dropdown.Item onClick={()=>{setStartTime(examTime.time)}}>{examTime.time}</Dropdown.Item>
                                            )}
                                    </Dropdown.Menu>
                                }
                            </Dropdown>    
                                    
                        </div>
                        <div className="lowerColumns">
                            <Button variant="success" className="customButton" onClick={handleSeatingArrangement}>Generate Seating Arrangement</Button>
                            <Button variant="dark" className="customNextButton" onClick={()=>{navigate("/download-file")}}>Next</Button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </>
}

export default GenerateSeatingArrangement;