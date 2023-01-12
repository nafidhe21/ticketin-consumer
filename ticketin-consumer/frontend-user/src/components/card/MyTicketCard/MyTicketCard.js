import React, { useEffect, useState } from "react";
import imgdummy from "../../images/eventdummy.jpg";
import "./MyTicketCard.css";
import icdate from "../../icon/ic_date.png";
import icloc from "../../icon/ic_loc.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";

const MyTicketCard = ({ data }) => {
  const cookies = new Cookies();

  const [concertDetail, setConcertDetail] = useState();
  const [ticketDetailRetrieved, setTicketDetailRetrieved] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/concerts/${data.concert_id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setConcertDetail(res.data);
        setTicketDetailRetrieved(true);
      });
  }, [ticketDetailRetrieved]);

  const urlTicketDetail = `/myticket/${data.id}`;
  console.log("dataaaa", concertDetail);
  return (
    <>
      {ticketDetailRetrieved && (
        <div className="d-flex col align-items-center mb-3 p-3 shadow myticketcardcontainer">
          <div className="leftcol d-flex col align-items-center">
            <div className="imgwrapper">
              <img className="imgticket" src={concertDetail.concertImage} width={190} height={120} alt="" />
            </div>
            <div className="ticketcontent">
              <div className="tickettitle fw-semibold">{concertDetail.concertName}</div>
              <div className="ticketdesc">
                <div className="d-flex col">
                  <img src={icdate} width={20} height={20} alt="" />
                  <div className="ms-1">{moment(concertDetail.date).format("DD MMMM YYYY")}</div>
                </div>
                <div className="d-flex col">
                  <img src={icloc} width={20} height={20} alt="" />
                  <div className="ms-1">Gor Tiketin</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rightcol d-flex justify-content-end">
            <Link to={urlTicketDetail}>
              <div className="btnviewticket text-white">View Ticket</div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MyTicketCard;
