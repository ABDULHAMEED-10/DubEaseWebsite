// LanguageSelection.js
import React, { useState } from 'react';
import { useAlert } from "react-alert";
import "../CSS/Settings.css"; 

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const alert = useAlert();

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const applyLanguageChange = () => {
    alert.info("Language changed successfully");
  };

  return (
    <div className="settingright d-flex flex-column justify-content-between">
      <div>
        <h1 className="settingshd ">Language Selection</h1>
        <div className="inputdiv">
        <div className="languageSelectContainer">
      <select
        className="languageSelect"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option value="english">English</option>
        <option value="urdu">Urdu</option>
      </select>
    </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button type='submit' className="btn btn-warning applyLan btn-lg" onClick={applyLanguageChange}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;
