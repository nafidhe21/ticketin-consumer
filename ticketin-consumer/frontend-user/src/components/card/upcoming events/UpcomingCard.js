import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgdummy from "../../images/eventdummy.jpg";
import "./UpcomingCard.css";
import moment from 'moment';

const UpcomingCard = ({data}) => {
  const concertDetail = data
  console.log("upcoming",concertDetail)
  const convertedDate = moment(concertDetail.date).format("DD MMMM YYYY");

  // const [concertDate, setconcertDate] = useState(convertedDate)

  // console.log("dateeee",concertDate)
  const concertDetailLink = `/concerts/${concertDetail.id}`
  return (
    <div class="col-md-4 col-sm-6">
      <Link className="text-link" to={concertDetailLink}>
        <div className="shadow rounded-4 my-3">
          <div className="d-flex row ">
            <div className="cardimagewrapper">
              <img src={concertDetail.concertImage} alt="" className="imagecard" />
            </div>
            <div className="contentwrapper d-flex row ps-4 py-3">
              <div className="datetext">{convertedDate}</div>
              <div className="descwrapper">
                <div className="titlecontent">{concertDetail.concertName}</div>
                <div className="desccontent">{concertDetail.description}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>

    // <div class="col-md-4 col-sm-6 upcomingcard my-3 rounded-4 bg-primary">
    // <div className="d-flex row">
    //   <div className="cardimagewrapper">
    //     <img src={imgdummy} alt="" className="imagecard" />
    //   </div>
    //   <div className="contentwrapper d-flex row ps-4 py-3">
    //     <div className="datetext">11 March 2023</div>
    //     <div className="descwrapper">
    //       <div className="titlecontent">BLACKPINK Born Pink Word Tour Jakarta</div>
    //       <div className="desccontent">Well get you directly seated and inside for you to enjoy the show.</div>
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
};

export default UpcomingCard;
