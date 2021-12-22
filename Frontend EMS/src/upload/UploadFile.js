import React from "react";
import { useNavigate } from "react-router";
import lnmiit2 from "../images/seats.png";
import logo1 from "../images/logo1.png";
import excelIcon from "../images/excelIcon.png";
import "./style.css";
import { Button } from "react-bootstrap";
// import readXlsxFile from 'read-excel-file';

const UploadFile=()=>{
    const navigate=useNavigate();

    // const takeInput=()=>{
    //     const input = document.getElementById('input');
    //     if(input.files.length==0)
    //     {
    //         alert("no files selected");
    //     }
    //     else
    //     {
    //         readXlsxFile(input.files[0]).then((rows) => {
    //             alert("File read successfully");
    //             navigate("/generate-seating-arrangement");
    //         }) 
    //     }
    // }
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
                        <h3>Exam Management</h3>
                    </div>
                    <div className="logoutUploadBox">
                        <button className="logoutButton" onClick={()=>{navigate("/login")}}>LOGOUT</button>
                    </div>
                </div>
                <div className="bodyUploadBox">
                    <div className="leftBodyContentBox">
                        <div style={{marginLeft:"30%",marginTop:"15%"}}>
                            <img
                                src={excelIcon}
                                width="50%"
                                height="50%"
                            />
                        </div>
                    </div>
                    <div className="rightBodyContentBox">
                        <div className="rightBodyContent">
                            <h4 style={{marginBottom:"10px", fontFamily:"Verdana"}}>Download Files</h4>
                            <a href='http://localhost:5000/downloadseating'><Button variant="success" className="customButton1">Download Seating Plan</Button></a>
                            <a href='http://localhost:5000/downloadtimetable'><Button variant="success" className="customButton1">Download TimeTable</Button></a>      
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </>
}

export default UploadFile;