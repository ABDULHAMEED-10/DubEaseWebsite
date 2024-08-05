// Settings.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Settings.css";
import LanguageSelection from "../components/LanguageSelection";
import LanguageIcon from "@mui/icons-material/Language";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAccount from "../components/DeleteAccount";
import Navbar from "../components/Navbar/Navbar";


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
            {clickedItem === "delete" && (
              <>
                <p>&gt;</p>
                <p> Delete Account</p>
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
                  <LanguageIcon className="settingsimg text-dark" />
                  <h4 className="settingh4 text-dark">Language Selection </h4>
                </div>
              </li>
              <li onClick={() => handleItemClick("account")}>
                <div className={clickedItem === "account" ? "clicked" : ""}>
                  <ManageAccountsIcon className="settingsimg text-dark" />
                  <h4 className="settingh4 text-dark">Account Settings </h4>
                </div>
              </li>
              <li onClick={() => handleItemClick("history")}>
                <div className={clickedItem === "history" ? "clicked" : ""}>
                  <HistoryIcon className="settingsimg text-dark" />
                  <h4 className="settingh4 text-dark">View History </h4>
                </div>
              </li>
              <li onClick={() => handleItemClick("delete")}>
                <div className={clickedItem === "delete" ? "clicked" : ""}>
                  <DeleteIcon className="settingsimg text-dark" />
                  <h4 className="settingh4 text-dark">Delete Account </h4>
                </div>
              </li>
            </ul>
          </div>

          {clickedItem === "language" && <LanguageSelection />}

          {clickedItem === "delete" && <DeleteAccount />}
        </div>
      </div>
     
    </>
  );
};

export default Settings;
