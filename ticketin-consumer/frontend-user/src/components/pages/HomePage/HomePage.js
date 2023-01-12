import React, { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import banner from "../../images/banner.png";
import bannercontentimg from "../../images/bannercontentimg.png";
import bannermid from "../../images/bannermid.png";
import aboutimage from "../../images/aboutimage.png";
import "./HomePage.css";
import UpcomingCard from "../../card/upcoming events/UpcomingCard";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const data = [1, 2, 3, 4, 5, 6];

const HomePage = () => {
  const [concertData, setConcertData] = useState([]);

  const cookies = new Cookies();
  // console.log("tokennn", cookies.get("token"));
  useEffect(() => {
    cookies.get("token") === undefined
      ? axios
          .get("http://localhost:5000/api/concerts/public/all", {
            headers: {
              Authorization: `Bearer ${cookies.get("token")}`,
            },
          })
          .then((res) => {
            console.log("hoii", res);
            setConcertData(res.data);
          })
      : axios
          .get("http://localhost:5000/api/concerts/all", {
            headers: {
              Authorization: `Bearer ${cookies.get("token")}`,
            },
          })
          .then((res) => {
            setConcertData(res.data);
          });
  }, []);

  return (
    <div class="">
      <Navbar />
      <div className="">
        <div className="bannerwrapper" style={{ backgroundImage: `url(${banner})` }}>
          <div className="container">
            <div class="w-100 vh-100 d-flex row justify-content-center align-items-center">
              <div class="col-sm-6 justify-content-center align-items-center d-flex">
                <img src={bannercontentimg} alt="" width={250} />
              </div>
              <div class="col-sm-6 ">
                <h2 class="text-white">BLACKPINK Born Pink World Tour Jakarta 2023</h2>
                <p class="text-white">Get tickets for BLACKPINK Born Pink World Tour Jakarta 2023 right now, only at Tiketin</p>
                <div class="buttonticket">
                  <div className="text-white fw-semibold">Get Ticket</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="upcomingevents row mt-5 mb-5">
            <h4 class="fw-bold mb-5">Upcoming Events</h4>

            {concertData.map((e) => {
              console.log("eeeeee", e);
              return <UpcomingCard data={e} />;
            })}
          </div>

          <div className="d-flex justify-content-center">
            <div className="btnloadmore">
              <div className="textbtnloadmore fw-semibold">
                <Link className="text-link" to="/concerts">
                  Load More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bannermid py-3 my-5" style={{ backgroundImage: `url(${bannermid})` }}>
          <div className="container">
            <div className="d-flex flex-md-row flex-column justify-content-center align-items-center">
              <div className="bannertext">
                <div className="bannertitle">BLACKPINK Born Pink World Tour Jakarta</div>
                <div className="d-flex column align-items-center">
                  <div className="bannerdate">11 March 2023</div>
                  <div className="bannerbtn">
                    <div className="textbannerbtn">Get Ticket</div>
                  </div>
                </div>
              </div>
              <div className="bannerimg">
                <img src={bannercontentimg} alt="" width={120} />
              </div>
            </div>
          </div>
        </div>

        <div id="about" className="about container mb-5">
          <div className="d-flex row ">
            <h4 class="fw-bold mb-5">About</h4>
            <div className="aboutimage mb-4">
              <img className="aboutimage" src={aboutimage} alt="" />
            </div>
            <div className="aboutdesc">
              TiketIn sudah 18 tahun setia menghibur para penikmat aksi panggung secara langsung. Sejak tahun 2002, TiketIn berhasil menghadirkan deretan performer lokal dan
              internasional untuk memberikan experience terbaik setiap tahunnya. Perjalanan kami masih panjang! Dengan semangat "Comeback Live & Louder", TiketIn 2022 hadir untuk merayakan setiap momen kebebasan kamu!
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
