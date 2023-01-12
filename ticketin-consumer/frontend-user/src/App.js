import "./App.css";
import React from "react";
import HomePage from "./components/pages/HomePage/HomePage";
import UpcomingEventsPage from "./components/pages/UpcomingEventsPage/UpcomingEventsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConcertDetail from "./components/pages/ConcertDetail/ConcertDetail";
import MyTicketPage from "./components/pages/MyTicketPage/MyTicketPage";
import MyTicketDetailPage from "./components/pages/MyTicketDetailPage/MyTicketDetailPage";
import ProfilePage from "./components/pages/Profile/ProfilePage";
import LoginPage from "./components/pages/Login/LoginPage";
import RegisterPage from "./components/pages/Register/RegisterPage";

function App() {
  return (
    <div className="appcontainer">
      <Router>
        <Routes>
          <Route path="/concerts" element={<UpcomingEventsPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/concerts/:id" element={<ConcertDetail />} />
          <Route path="/myticket" element={<MyTicketPage />} />
          <Route path="/myticket/:id" element={<MyTicketDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
