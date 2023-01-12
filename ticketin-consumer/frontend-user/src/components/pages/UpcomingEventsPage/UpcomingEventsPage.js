import Reac, {useEffect,useState} from "react";
import UpcomingCard from "../../card/upcoming events/UpcomingCard";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import axios from "axios";
import Cookies from "universal-cookie";

const UpcomingEventsPage = () => {
  const cookies = new Cookies();
  const [concertData, setConcertData] = useState([]);
  useEffect(() => {
    const url = "http://localhost:5000/api/concerts/all";

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setConcertData(res.data);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div className=" mt-5 container">
        <div className="d-flex row">
          <h4 class="fw-bold mb-5 mt-5">Upcoming Events</h4>
          {concertData.map((e) => {
            return <UpcomingCard data={e} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpcomingEventsPage;
