import React, { useEffect, useState } from "react";
import imgdummy from "../../images/eventdummy.jpg";
import imgstage from "../../images/stage.png";
import icdate from "../../icon/ic_date.png";
import icloc from "../../icon/ic_loc.png";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import "./ConcertDetail.css";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import moment from "moment";
import swal from "sweetalert";
import Cookies from "universal-cookie";

const ConcertDetail = () => {
  const { id } = useParams();

  const [concertDetailData, setConcertDetailData] = useState();
  const [concertRetrieved, setConcertRetrieved] = useState(false);
  const [totalA1, setTotalA1] = useState(0);
  const [totalA2, setTotalA2] = useState(0);
  const [totalA3, setTotalA3] = useState(0);

  const cookies = new Cookies();

  const navigate = useNavigate();
  
  useEffect(() => {
    const url = `http://localhost:5000/api/concerts/${id}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setConcertDetailData(res.data);
        setConcertRetrieved(true);
      });
  }, [concertRetrieved]);

  console.log("daaaaaaa", cookies.get("token"));

  const handleIncrement = (cat) => {
    if (cat === "A1") {
      setTotalA1(totalA1 + 1);
    }
    if (cat === "A2") {
      setTotalA2(totalA2 + 1);
    }
    if (cat === "A3") {
      setTotalA3(totalA3 + 1);
    }
  };
  const handleDecrement = (cat) => {
    if (cat === "A1" && totalA1 > 0) {
      setTotalA1(totalA1 - 1);
    }
    if (cat === "A2" && totalA2 > 0) {
      setTotalA2(totalA2 - 1);
    }
    if (cat === "A3" && totalA3 > 0) {
      setTotalA3(totalA3 - 1);
    }
  };

  const handleBuyTicket = () => {
    // const url = "http://localhost:5000/api/tickets/";
    // console.log("semua", id, cookies.get("dataId"), concertDetailData.date, totalA1, totalA2, totalA3);
    axios
      .post(
        "http://localhost:5000/api/tickets/",
        {
          user_id: cookies.get("dataId"),
          concert_id: id,
          A1_am: totalA1,
          A2_am: totalA2,
          A3_am: totalA3,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("resssss", res);
        setConcertRetrieved(false)
        swal("Success!", "Thanks For Buying!", "success");
        window.open(res.data.redirect_url, '_blank', 'noopener,noreferrer');
        navigate('/myticket')
      })
      .catch((e) => {
        console.log(e, "errorr");
      });
  };

  return (
    <div className="">
      {concertRetrieved && (
        <>
          <Navbar />
          <div className="mt-5 container">
            <img src={concertDetailData.concertImage} className="image mt-5" alt="" width={"50%"} />
            <h5 className="mt-3">{concertDetailData.concertName}</h5>
            <div className="d-flex col">
              <img src={icdate} width={20} height={20} alt="" />
              <div className="ms-1">{moment(concertDetailData.date).format("DD MMMM YYYY")}</div>
            </div>
            <div className="d-flex col">
              <img src={icloc} width={20} height={20} alt="" />
              <div className="ms-1">Gor Tiketin</div>
            </div>
            <div className="concertdesc mt-3">
              <div className="descriptionheader">description</div>
              <div className="description">{concertDetailData.description}</div>
            </div>

            <div className="my-3">
              <div className="descriptionheader">select ticket</div>
              <div className="d-flex col justify-content-center align-items-center">
                <div className="me-5">
                  <div className="d-flex col align-items-center mb-3">
                    <div className="circlered me-1"></div>
                    <div className="fw-semibold">{concertDetailData.classCapacity.A1Cap} audience</div>
                  </div>
                  <div className="d-flex col  align-items-center">
                    <div className="circlegrey me-1"></div>
                    <div className="fw-semibold">{concertDetailData.classCapacity.A2Cap} audience</div>
                  </div>
                </div>
                <img src={imgstage} alt="" width={340} />
              </div>
            </div>
            <div className="mt-5 justify-content-center d-flex row">
              {console.log("eeeeee", concertDetailData.classCapacity.A1Cap)}

              <div className="col d-flex justify-content-center ticketbox shadow p-3 row me-sm-4">
                <div>
                  <div className="text-center fs-5 fw-bold">A1</div>
                  <div className="text-center my-3 fs-5 fw-semibold">{concertDetailData.classPrices.A1.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
                  <div className="counter d-flex justify-content-center justify-content-between">
                    <div className="btncounter fw-semibold" onClick={() => handleDecrement("A1")}>
                      -
                    </div>
                    <div className="totalticket fw-semibold">{totalA1}</div>
                    <div className="btncounter fw-semibold" onClick={() => handleIncrement("A1")}>
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-center ticketbox shadow p-3 row me-sm-4">
                <div>
                  <div className="text-center fs-5 fw-bold">A2</div>
                  <div className="text-center my-3 fs-5 fw-semibold">{concertDetailData.classPrices.A2.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
                  <div className="counter d-flex justify-content-center justify-content-between">
                    <div className="btncounter fw-semibold" onClick={() => handleDecrement("A2")}>
                      -
                    </div>
                    <div className="totalticket fw-semibold">{totalA2}</div>
                    <div className="btncounter fw-semibold" onClick={() => handleIncrement("A2")}>
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-center ticketbox shadow p-3 row me-sm-4">
                <div>
                  <div className="text-center fs-5 fw-bold">A3</div>
                  <div className="text-center my-3 fs-5 fw-semibold">{concertDetailData.classPrices.A3.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
                  <div className="counter d-flex justify-content-center justify-content-between">
                    <div className="btncounter fw-semibold" onClick={() => handleDecrement("A3")}>
                      -
                    </div>
                    <div className="totalticket fw-semibold">{totalA3}</div>
                    <div className="btncounter fw-semibold" onClick={() => handleIncrement("A3")}>
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <div className="buttonsave" onClick={() => handleBuyTicket()}>
                Buy Ticket
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ConcertDetail;
