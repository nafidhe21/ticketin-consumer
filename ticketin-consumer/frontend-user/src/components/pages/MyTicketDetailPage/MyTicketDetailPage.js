import React, { useEffect, useState } from "react";
import "./MyTicketDetailPage.css";
import imgdummy from "../../images/eventdummy.jpg";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";

const MyTicketDetailPage = () => {
  const { id } = useParams();
  const cookies = new Cookies();

  const [ticketDetailData, setTicketDetailData] = useState();
  const [concertDetail, setConcertDetail] = useState();
  const [ticketDetailRetrieved, setTicketDetailRetrieved] = useState(false);

  useEffect(() => {
    const url = `http://localhost:5000/api/tickets/${id}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setTicketDetailData(res.data);

        axios
          .get(`http://localhost:5000/api/concerts/${res.data.concert_id}`, {
            headers: {
              Authorization: `Bearer ${cookies.get("token")}`,
            },
          })
          .then((res) => {
            setConcertDetail(res.data);
            setTicketDetailRetrieved(true);
          });
      });
  }, [ticketDetailRetrieved]);

  console.log("aaaaaaa", ticketDetailData);
  return (
    <>
      {ticketDetailRetrieved && (
        <div className="">
          <Navbar />
          <div className="MyTicketDetailPagecontainer container">
            <h4 className="fw-bold mb-5">My Ticket</h4>
            <div className="  d-flex justify-content-center ">
              <div className="ticket shadow">
                <img className="imageticket" src={concertDetail.concertImage} alt="" />
                <div className="ticketcontent">
                  <div className="tickettitle fw-bold mb-3">{concertDetail.concertName}</div>
                  <div className="d-flex col justify-content-between mb-3">
                    <div className="contentcolumn">
                      <div className="fw-semibold">Date</div>
                      <div>{moment(concertDetail.date).format("DD MMMM YYYY")}</div>
                    </div>
                    <div className="contentcolumn">
                      <div className="fw-semibold">Time's</div>
                      <div>{concertDetail.time}</div>
                    </div>
                  </div>
                  <div className="d-flex col justify-content-between">
                    <div className="contentcolumn">
                      <div className="fw-semibold">Location</div>
                      <div>Gor Tiketin</div>
                    </div>
                    <div className="contentcolumn">
                      <div className="fw-semibold">Amount</div>
                      <div className={ticketDetailData.amount.A1_am === 0 ? "hidden" : "show"}>A1 : {ticketDetailData.amount.A1_am} person</div>
                      <div className={ticketDetailData.amount.A2_am === 0 ? "hidden" : "show"}>A2 : {ticketDetailData.amount.A2_am} person</div>
                      <div className={ticketDetailData.amount.A3_am === 0 ? "hidden" : "show"}>A3 : {ticketDetailData.amount.A3_am} person</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default MyTicketDetailPage;
