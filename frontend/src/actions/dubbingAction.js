import {
    GENERATE_DUB_FAILURE,
    GENERATE_DUB_REQUEST,
  GENERATE_DUB_SUCCESS,
  ClEAR_STATES,
    CLEAR_ERRORS,
} from "../constants/dubbingConstants";

import axios from "axios";


// GenerateButton

export const generate_Dub = (source) => async (dispatch) => {
  try {

    dispatch({ type: GENERATE_DUB_REQUEST });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: 'blob'
  };
    const response = await axios.post(
      'http://localhost:5000/flask/generateDub',
      source,
      config,
      
    );
    if (response.data.type === "video/mp4") {
      const videoBlob =  new Blob([response.data], { type: "video/mp4" });
      const url = URL.createObjectURL(videoBlob);
      
      dispatch({ type: GENERATE_DUB_SUCCESS, payload: url });
    } else if (response.data.type === "audio/mpeg") {
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(audioBlob);
      dispatch({ type: GENERATE_DUB_SUCCESS, payload: url });
    }
    } catch (error) {
      dispatch({ type: GENERATE_DUB_FAILURE, payload: error.response.data.message });
    }
};

// Clearing State
export const clearState = () => async (dispatch) => {
  dispatch({ type: ClEAR_STATES });
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};