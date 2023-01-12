import React from "react";
import icprofile from "../icon/ic_tiketin_profile.png";
import logo from "../images/logo_tiketin.png";
import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  return (
    <div>
      <nav class="navbar fixed-top navbar-expand-lg p-md-1 navbarcolor navbar-dark" style={{ backgroundColor: "#C3025C" }}>
        <div class="container">
          <a class="navbar-brand" href="/">
            <img src={logo} alt="" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <div class="mx-auto"></div>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold" href="/">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-semibold" href="/myticket">
                  My Ticket
                </a>
              </li>
              {cookies.get("token") === undefined ? (
                <li class="nav-item">
                  <a class="nav-link text-white fw-semibold" href="/login">
                    Login
                  </a>
                </li>
              ) : (
                <li class="nav-item">
                  <div
                    style={{ cursor: "pointer" }}
                    class="nav-link text-white fw-semibold"
                    onClick={() => {
                      cookies.remove("token");
                      cookies.remove("dataEmail");
                      cookies.remove("dataId");
                      cookies.remove("username");
                      navigate("/");
                    }}
                  >
                    Logout
                  </div>
                </li>
              )}

              <li class="nav-item">
                <a class="nav-link text-white fw-semibold" href="/profile">
                  <img src={icprofile} width={25} height={25} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
