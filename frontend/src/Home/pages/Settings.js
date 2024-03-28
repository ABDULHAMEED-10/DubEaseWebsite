// Settings.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SettingsIcon from "@mui/icons-material/Settings";
import "../CSS/Settings.css";
import FeedbackForm from "../components/SettingsFeedback";
import LanguageSelection from "../components/LanguageSelection";
import LanguageIcon from "@mui/icons-material/Language";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HistoryIcon from "@mui/icons-material/History";


const Settings = () => {
  const navigate = useNavigate();
  const [clickedItem, setClickedItem] = useState(null);

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    if (itemName === "account") {
      navigate("/me");
    } else {
      setClickedItem(itemName);
    }
  };

  return (
    <>
      <Navbar />

      <div className="settingmaincontainer">
        <div className="settingheader">
          <div className="settingheaderleft">
            <SettingsIcon
              style={{ width: 55, marginBottom: "8px" }}
            />
            <h2 className="settingh1 fs-2 fw-semibold">Settings</h2>
          </div>
          <div className="settingheaderright">
            <p>Settings</p>
            {clickedItem === "language" && (
              <>
                <p>&gt;</p>
                <p> Language Selection</p>
              </>
            )}
            {clickedItem === "feedback" && (
              <>
                <p>&gt;</p>
                <p> Provide Feedback</p>
              </>
            )}
            {clickedItem === "account" && (
              <>
                <p>&gt;</p>
                <p> Accounts Settings</p>
              </>
            )}
            {clickedItem === "history" && (
              <>
                <p>&gt;</p>
                <p> View History</p>
              </>
            )}
          </div>
        </div>
        <div className="settingcontainer">
          <div className="settingleft">
            <h1 className="settingshd">General Settings</h1>

            <ul className="setttingmenu">
              <li
                onClick={() => {
                  handleItemClick("language");
                }}
              >
                <div className={clickedItem === "language" ? "clicked" : ""}>
                  <LanguageIcon className="settingsimg text-primary" />
                  <h4 className="settingh4">Language Selection </h4>
                </div>
              </li>
              <li onClick={() => handleItemClick("feedback")}>
                <div className={clickedItem === "feedback" ? "clicked" : ""}>
                  <FeedbackIcon className="settingsimg text-danger" />
                  <h4 className="settingh4">Provide Feedback</h4>
                </div>
              </li>
              <li onClick={() => handleItemClick("account")}>
                <div className={clickedItem === "account" ? "clicked" : ""}>
                  <ManageAccountsIcon className="settingsimg" />
                  <h4 className="settingh4">Account Settings </h4>
                </div>
              </li>
              <li onClick={() => handleItemClick("history")}>
                <div className={clickedItem === "history" ? "clicked" : ""}>
                  <HistoryIcon className="settingsimg text-secondary" />
                  <h4 className="settingh4">View History </h4>
                </div>
              </li>
            </ul>
          </div>

          {clickedItem === "language" && <LanguageSelection />}

          {clickedItem === "feedback" && <FeedbackForm />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
