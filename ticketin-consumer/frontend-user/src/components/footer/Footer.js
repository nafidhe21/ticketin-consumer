import React from "react";
import "./Footer.css";
import logodummy from "../images/logo.png";
import icemail from "../icon/ic_email.png";
import iccall from "../icon/ic_call.png";
import icig from "../icon/ic_ig.png";

const Footer = () => {
  return (
    <div className="footer py-5 ">
      <div className="d-flex row justify-content-center">
        <div className="col-md-4 d-flex justify-content-center">
          <div className="">
            <img src={logodummy} alt="" width={100} />
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center">
          <div className="row">
            <div className="footerheader">
              <h4 className="text-white">Contact</h4>
            </div>
            <div className="contactlist d-flex row">
              <div className="d-flex mb-2">
                <img src={iccall} alt="" />
                <div className="text-white">08262839232</div>
              </div>
              <div className="d-flex  mb-2">
                <img src={icig} alt="" />
                <div className="text-white">Tiketin</div>
              </div>
              <div className="d-flex  mb-2">
                <img src={icemail} alt="" />
                <div className="text-white">cs@tiketin.com</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center">
          <div className="row">
            <h4 className="text-white">Make a Concert</h4>
            <div className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
