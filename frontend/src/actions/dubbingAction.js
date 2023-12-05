import {
    GENERATE_DUB_FAILURE,
    GENERATE_DUB_REQUEST,
    GENERATE_DUB_SUCCESS,

    CLEAR_ERRORS,
} from "../constants/dubbingConstants";

import axios from "axios";


// GenerateButton

export const generate_Dub = (source) => async (dispatch) => {
  try {

    dispatch({ type: GENERATE_DUB_REQUEST });
      const config = {
        // headers: { "Content-Type": "application/json" },
        headers: { "Content-Type": "multipart/form-data" }
    };
      await axios.post(
        `http://localhost:5000/flask/generateDub`,
        {source},
        config
    );
      
      dispatch({ type: GENERATE_DUB_SUCCESS});
    } catch (error) {
      
      dispatch({ type: GENERATE_DUB_FAILURE, payload: error.response.data.message });
    }
};
  
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};