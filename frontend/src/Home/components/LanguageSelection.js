// LanguageSelection.js
import React, { useState } from 'react';
import { useAlert } from "react-alert";
import "../CSS/Settings.css"; 

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
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
        <div className="inputdiv ">
        <div className="languageSelectContainer">
      <select
        className="languageSelect"
        value={selectedLanguage}
        onChange={handleLanguageChange}
            >
        <option value=""></option>
        <option value="english">English To Urdu</option>
        <option value="urdu" >Urdu To English</option>
            </select>
            
          </div>
          <button type='submit' className="btn btn-dark apply_ln btn-lg" onClick={applyLanguageChange}>
          Apply
        </button>
        </div>
      </div>
      
    </div>
  );
};

export default LanguageSelection;
