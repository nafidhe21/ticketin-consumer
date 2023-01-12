import React from 'react'
import "./RegisterPage.css";
import registerimg from "../../images/registerimage.png";
import icprofile from "../../icon/ic_profile.png";
import ictelp from "../../icon/ic_telp.png";
import icdate from "../../icon/ic_date.png";
import icemailblack from "../../icon/ic_email_black.png";
import icpassword from "../../icon/ic_password.png";
import logocolor from "../../images/logocolor.png";
import icback from "../../icon/ic_back.png"
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [passwordHash, setpasswordHash] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const register = (e) => {
        if (!name || !username || !age || !phoneNumber || !email || !passwordHash) {
            return setError(true)
        }
        const data = { name, username, age, phoneNumber, email, passwordHash }
        e.preventDefault()

        axios.post("http://localhost:5000/api/users/register", data).then(res => {
            console.log(res)
            navigate("/login")
        })
    }

    return (
        <div className="containerregister">
            <div className="registerwrapper d-flex">
                <img className="leftcol" src={registerimg} height={657} alt="" />
                <div className="rightcol">
                    <div className="logo">
                        <a href='/login'><img className='icback' src={icback} alt="" width={20} /></a>
                        <img src={logocolor} alt="" width={100} />
                    </div>
                    <h4>Register</h4>
                    <p>Let’s get started.</p>
                    <div className="registerdetail">
                        <div className="inputwrapper">
                            <img className="icon" src={icprofile} alt="" />
                            <input placeholder="name" className="profileinput" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="inputwrapper">
                            <img className="icon" src={icprofile} alt="" />
                            <input placeholder="Username" className="profileinput" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="inputwrapper">
                            <img className="icon" src={icdate} alt="" />
                            <input placeholder="Age" className="profileinput" type="text" required value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="inputwrapper">
                            <img className="icon" src={ictelp} alt="" />
                            <input placeholder="Phone Number" className="profileinput" type="text" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="inputwrapper">
                            <img className="icon" src={icemailblack} alt="" />
                            <input placeholder="Email" className="registerinput" type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="inputwrapper">
                            <img className="icon" src={icpassword} alt="" />
                            <input placeholder="Password" className="registerinput" required type="password" value={passwordHash} onChange={(e) => setpasswordHash(e.target.value)} />
                        </div>
                    </div>
                    {error && (
                        <div className="wrong">
                            <p>You must fill the form</p>
                        </div>
                    )}
                    <button className="buttonregister" onClick={register}>Register</button>
                    <div className="gologin">Already have an account??<a class="text-black" href='/login'><b>Login</b></a></div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage