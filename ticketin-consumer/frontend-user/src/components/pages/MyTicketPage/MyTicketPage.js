import React, { useEffect, useState } from "react";
import MyTicketCard from "../../card/MyTicketCard/MyTicketCard";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import "./MyTicketPage.css";
import axios from "axios";
import Cookies from "universal-cookie";

const MyTicketPage = () => {
  const [myTicketList, setMyTicketList] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    axios
      .put(
        `http://localhost:5000/api/tickets/updateTicket/${cookies.get("dataId")}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {});

    axios
      .get(
        `http://localhost:5000/api/tickets/byUser/success/${cookies.get("dataId")}`,

        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        setMyTicketList(res.data);
      });
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="myticketpagecontainer container">
        <h4 className="fw-bold mb-5">My Ticket List</h4>
        {myTicketList.length === 0 ? (
          <div className="empty">You Don't Have A Ticket</div>
        ) : (
          myTicketList.map((e) => {
            return <MyTicketCard data={e} />;
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyTicketPage;
