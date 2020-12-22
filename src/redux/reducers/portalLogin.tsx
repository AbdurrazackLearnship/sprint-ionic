import produce from "immer";
import { GET_PORTAL_LOGIN, GET_PORTAL_LOGIN_SUCCESS, GET_PORTAL_LOGIN_FAILURE } from "../constants";
const reducerInitialState = {
  isLoading: false,
  data: null,
  isFailed: false
};

const portalLogin = function (state = reducerInitialState, action: any) {
  switch (action.type) {
    case GET_PORTAL_LOGIN:
      return produce(state, (draftState: any) => {
        draftState.isLoading = true;
        draftState.data = null;
        draftState.isFailed = false;
      });
    case GET_PORTAL_LOGIN_SUCCESS:
      return produce(state, (draftState: any) => {
        draftState.isLoading = false;
        draftState.data = action.payload.data;
        draftState.isFailed  = false;
      });
    case GET_PORTAL_LOGIN_FAILURE:
      return produce(state, (draftState: any) => {
        draftState.isLoading = false;
        draftState.data = null;
        draftState.isFailed = true;
      });
    default:
      return state;
  }
};

export default portalLogin;
