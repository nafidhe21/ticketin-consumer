import React from 'react'
import "./LoginPage.css";
import loginimg from "../../images/loginimage.png";
import icemailblack from "../../icon/ic_email_black.png";
import icpassword from "../../icon/ic_password.png";
import logocolor from "../../images/logocolor.png";
import icback from "../../icon/ic_back.png"
import { useState } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const [user_id, setUser_id] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPassTrue, setIsPassTrue] = useState(false)
    const cookies = new Cookies()
    const navigate = useNavigate();

    const login = (e) => {
        const data = { email, password }
        e.preventDefault()

        axios.post("http://localhost:5000/api/users/login", data)
            .then(res => {
                setIsPassTrue(false)
                const decode = jwt_decode(res.data.token)
                setUser_id(decode.user_id)
                cookies.set("token", res.data.token, { expires: new Date(Date.now + 1) })
                cookies.set("dataEmail", decode.email, { expires: new Date(Date.now + 1) })
                cookies.set("dataId", decode.user_id, { expires: new Date(Date.now + 1) })
                cookies.set("username", decode.username, { expires: new Date(Date.now + 1) })
                if (user_id) {
                    navigate("/")
                }
            }).catch((error) => {
                setEmail("")
                setPassword("")
                setIsPassTrue(true)
            })
    }
    return (
        <div className="containerlogin">
            <div className="loginwrapper d-flex">
                <img className="leftcol" src={loginimg} height={657} alt="" />
                <div className="rightcol">
                    <div className="logo">
                        <a href='/'><img className='icback' src={icback} alt="" width={20} /></a>
                        <img src={logocolor} alt="" width={100} />
                    </div>
                    <h4>Login</h4>
                    <p>Welcome back! Please enter your details.</p>
                    <div className="logindetail">
                        <div className="inputwrapper">
                            <img className="icon" src={icemailblack} alt="" />
                            <input placeholder="Email" className="logininput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="inputwrapper">
                            <img className="icon" src={icpassword} alt="" />
                            <input placeholder="Password" className="logininput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    {isPassTrue && (
                        <div className="wrong">
                            <h5>Wrong Email/Password</h5>
                        </div>
                    )}
                    <button className="buttonlogin" onClick={login}>Login</button>
                    <div className="goregister">Don’t have an account?<a class="text-black" href='/register'><b>Register</b></a></div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage