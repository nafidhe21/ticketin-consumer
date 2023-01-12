import React, { useEffect } from "react";
import "./ProfilePage.css";
import imgdecor from "../../images/img_decor.png";
import icprofile from "../../icon/ic_profile.png";
import ictelp from "../../icon/ic_telp.png";
import icdate from "../../icon/ic_date.png";
import icemailblack from "../../icon/ic_email_black.png";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import swal from "sweetalert";

const ProfilePage = () => {
  const [profile, setProfile] = useState();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const cookies = new Cookies();
  console.log("hei",cookies.get("dataId"))

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${cookies.get("dataId")}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setName(res.data.name);
        setAge(res.data.age);
        setUsername(res.data.username);
        setPhoneNumber(res.data.phoneNumber);
        setEmail(res.data.email);
      });
  }, []);

  const handleSubmitProfile = () => {
    axios
      .put(
        `http://localhost:5000/api/users/${cookies.get("dataId")}`,
        {
          username: username,
          phoneNumber: phoneNumber,
          name: name,
          email: email,
          age: age,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("resss",res)
        swal("Success!", "Profile Edited!", "success");
      });
  };

  console.log("profileeee", name);
  return (
    <div className="">
      <Navbar />
      <div className="container containerprofile">
        <div className="profilewrapper d-flex">
          <img className="leftcol" src={imgdecor} height={500} alt="" />
          <div className="rightcol">
            <h4>My Account</h4>
            <div className="profiledetail">
              <div className="inputwrapper">
                <img className="icon" src={icprofile} alt="" />
                <input placeholder={name} className="profileinput" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="inputwrapper">
                <img className="icon" src={icprofile} alt="" />
                <input placeholder={username} className="profileinput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="inputwrapper">
                <img className="icon" src={icdate} alt="" />
                <input placeholder={age} className="profileinput" type="text" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="inputwrapper">
                <img className="icon" src={ictelp} alt="" />
                <input placeholder={phoneNumber} className="profileinput" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <div className="inputwrapper">
                <img className="icon" src={icemailblack} alt="" />
                <input placeholder={email} className="profileinput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div onClick={handleSubmitProfile} className="buttonsave">
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
