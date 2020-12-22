import produce from "immer";
import {
  SET_INITIAL_USER_INFO,
  SET_MANAGER_EMAIL,
  SET_MANAGER_EMAIL_REQUIRED,
  SET_PUBLIC_KEY,
  SET_USER_AUTHENTICATED,
  SET_USER_AUTHENTICATION_FAIL_REASON,
} from "../constants";
const reducerInitialState = {
  isUserAuthenticated: false,
  lgId: 0,
  luuId: 0,
  leuId: 0,
  pub: "",
  managerEmail: "",
  isLoading: false,
  isManagerEmailRequired: false,
  userAuthenticationFailReason: "",
};

const common = (state = reducerInitialState, action: any) => {
  switch (action.type) {
    case SET_INITIAL_USER_INFO:
      return produce(state, (draftState: any) => {
        if (action && action.payload) {
          draftState.lgId = action.payload.lgId || 0;
          draftState.luuId = action.payload.luuId || 0;
          draftState.leuId = action.payload.leuId || 0;
          draftState.isLoading = false;
        }
      });
    case SET_PUBLIC_KEY:
      return produce(state, (draftState: any) => {
        if (action && action.payload) {
          draftState.pub = action.payload.pub || "";
          draftState.isLoading = false;
        }
      });
    case SET_MANAGER_EMAIL:
      return produce(state, (draftState: any) => {
        if (action && action.payload) {
          draftState.managerEmail = action.payload.managerEmail || "";
          draftState.isLoading = false;
        }
      });
    case SET_MANAGER_EMAIL_REQUIRED:
      return produce(state, (draftState: any) => {
        if (action && action.payload) {
          draftState.isManagerEmailRequired =
            action.payload.isManagerEmailRequired || false;
          draftState.isLoading = false;
        }
      });
    case SET_USER_AUTHENTICATED:
      return produce(state, (draftState: any) => {
        draftState.isUserAuthenticated =
          action.payload.isUserAuthenticated || false;
        draftState.userAuthenticationFailReason = "";
        draftState.isLoading = false;
      });
    case SET_USER_AUTHENTICATION_FAIL_REASON:
      return produce(state, (draftState: any) => {
        draftState.isUserAuthenticated = false;
        draftState.userAuthenticationFailReason =
          action.payload.userAuthenticationFailReason || "";
        draftState.isLoading = false;
      });
    default:
      return state;
  }
};

export default common;
