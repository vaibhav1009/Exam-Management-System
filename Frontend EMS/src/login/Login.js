import React, { useState } from "react";
import DialogBox from "../components/dialogBox/DialogBox";
import loginImg from "../images/lnmiit1.jpg";
import logo1 from "../images/logo1.png";
import './style.css';
import { useNavigate } from "react-router";

const Login=()=>{
    
    const [isError, setIsError] = useState(false);
    const navigate=useNavigate();

    const validate=()=>{
        var  username=document.getElementById("username").value;
        var password=document.getElementById("password").value;
        if(username=="coe.lnmiit" && password=="lnmiit123")
        {
            // console.log("working");
            navigate("/generate-seating-arrangement");
        }
        else{
            setIsError(true);
        }
    }  
    const noError = () => {
        setIsError(false);
    }
    return <>
        <div className="body">
            <div className="LoginBox">
                {/* <form>
                    <h1>LOGIN</h1>
                    <input type="text" name="" placeholder="Enter Username" id="username" />
                    <input type="password" name="" placeholder="Enter Password" id="password" />
                    <input type="submit" name="" value="Login" onclick="validate()" />
                </form> */}
                <div className="leftCardStyle">    
                    <div style={{position:"absolute", height:"10vh", marginTop:"20px",marginLeft:"20px"}}>
                            <img
                                src={logo1}
                                width="100%"
                                height="100%"
                            />
                    </div>
                    <div className="formStyle">
                        <h3 className="heading">Login Account</h3>
                            <div className="group">
                                <div className="label">
                                    <label>Username</label>
                                </div>
                                <div>
                                    <input type="text"  className="input" name="username" placeholder="Enter Username" id="username" />
                                </div>
                            </div> 
                            <div className="group">
                                <div className="label">
                                    <label>Password</label>
                                </div>
                                <div>
                                    <input type="password"  className="input" name="password" placeholder="Enter password" id="password"/>
                                </div>
                            </div>
                            <button className="login" onClick={()=>{validate()}}>Log In</button>
                    </div>
                </div>
                <div  className="RightCardStyle">
                    <div style={{position:"absolute", height:"90vh"}}>
                            <img
                                src={loginImg}
                                width="100%"
                                height="100%"
                            />
                    </div>
                </div>
            </div>
            
            <DialogBox open={isError} setIsError={noError} 
                        text="Wrong Username or Password"/>
        </div>
    </>
}

export default Login;