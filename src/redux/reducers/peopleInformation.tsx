import produce from "immer";
import { store } from "../..";
import {
  GET_PEOPLE_INFO,
  GET_PEOPLE_INFO_FAILURE,
  GET_PEOPLE_INFO_SUCCESS,
} from "../constants";
const reducerInitialState = {
  isLoading: false,
  data: null,
  isFailed: false,
};

const peopleInformation = function (state = reducerInitialState, action: any) {
  switch (action.type) {
    case GET_PEOPLE_INFO:
      return produce(state, (draftState: any) => {
        draftState.isLoading = true;
        draftState.isFailed = false;
        draftState.data = null;
      });
    case GET_PEOPLE_INFO_SUCCESS:
      return produce(state, (draftState: any) => {
        draftState.isLoading = false;
        draftState.isFailed = false;
        draftState.data = action.payload.data;
      });
    case GET_PEOPLE_INFO_FAILURE:
      return produce(state, (draftState: any) => {
        draftState.isLoading = false;
        draftState.isFailed = true;
        draftState.data = null;
      });
    default:
      return state;
  }
};

export default peopleInformation;
