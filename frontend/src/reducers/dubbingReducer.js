import {
    GENERATE_DUB_FAILURE,
    GENERATE_DUB_REQUEST,
    GENERATE_DUB_SUCCESS,

    CLEAR_ERRORS,
} from '../constants/dubbingConstants';

export const dubbingReducer = (state = {}, action) => { 

    switch (action.type) {
        case GENERATE_DUB_REQUEST:
            return {
                loading: true,
                };
        case GENERATE_DUB_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        
        case GENERATE_DUB_FAILURE:
            return {
                ...state,
                loading: false,
                err: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                err: null,
            };
        
            default:
            return state;
    }
}