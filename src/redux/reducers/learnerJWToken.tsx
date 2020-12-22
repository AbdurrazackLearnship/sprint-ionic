import produce from "immer";
import { GET_LEARNER_JWTOKEN, GET_LEARNER_JWTOKEN_SUCCESS, GET_LEARNER_JWTOKEN_FAILURE } from "../constants";
const reducerInitialState = {
  isLoading: false,
  data: null,
  isFailed: false
};

const learnerJWToken = function (state = reducerInitialState, action: any) {
  switch (action.type) {
    case GET_LEARNER_JWTOKEN:
      return produce(state, (draftState: any) => {
        draftState.isLoading = true;
        draftState.data = null;
        draftState.isFailed = false;
      });
    case GET_LEARNER_JWTOKEN_SUCCESS:
      return produce(state, (draftState: any) => {
        draftState.isLoading = false;
        draftState.data = action.payload.data;
        draftState.isFailed  = false;
      });
    case GET_LEARNER_JWTOKEN_FAILURE:
      return produce(state, (draftState: any) => {
        draftState.isLoading = false;
        draftState.data = null;
        draftState.isFailed = true;
      });
    default:
      return state;
  }
};

export default learnerJWToken;
