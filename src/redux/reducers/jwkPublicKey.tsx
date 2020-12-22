import produce from "immer";
import { GET_JWK_PUBLIC_KEY, GET_JWK_PUBLIC_KEY_SUCCESS, GET_JWK_PUBLIC_KEY_FAILURE } from "../constants";
const reducerInitialState = {
  isLoading: false,
  data: null,
  isFailed: false
};

const jwkPublicKey = function (state = reducerInitialState, action: any) {
  switch (action.type) {
    case GET_JWK_PUBLIC_KEY:
      return produce(state, (draftState: any) => {
        draftState.isLoading = true;
        draftState.data = null;
        draftState.isFailed = false;
      });
    case GET_JWK_PUBLIC_KEY_SUCCESS:
      return produce(state, (draftState: any) => {
        draftState.isLoading = false;
        draftState.data = action.payload.data;
        draftState.isFailed  = false;
      });
    case GET_JWK_PUBLIC_KEY_FAILURE:
      return produce(state, (draftState: any) => {
        draftState.isLoading = false;
        draftState.data = null;
        draftState.isFailed = true;
      });
    default:
      return state;
  }
};

export default jwkPublicKey;
