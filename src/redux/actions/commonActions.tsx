import { InitialUserInfo } from "../../interfaces";
import { SET_MANAGER_EMAIL, SET_MANAGER_EMAIL_REQUIRED, SET_PUBLIC_KEY, SET_USER_AUTHENTICATED,SET_USER_AUTHENTICATION_FAIL_REASON } from "./../constants";

const setUserInitialInformation = (lgId: string | number, luuId: string | number, leuId: string | number) => {
  return (dispatch: any) => {
    dispatch({
      type: "SET_INITIAL_USER_INFO",
      payload: {
        lgId,
        luuId,
        leuId,
      },
    });
  };
};

const setUserInitialInformationPeople = (userInfo: InitialUserInfo) => {
  const { firstName, lastName, userId } = userInfo;
  return (dispatch: any) => {
    dispatch({
      type: "SET_INITIAL_USER_INFO",
      payload: {
        firstName,
        lastName,
        userId,
      },
    });
  };
};

const setPublicKey = (userInfo: InitialUserInfo) => {
  const { pub } = userInfo;
  return (dispatch: any) => {
    dispatch({
      type: SET_PUBLIC_KEY,
      payload: {
        pub,
      },
    });
  };
};
const setManagerEmail = (userInfo: InitialUserInfo) => {
  const { managerEmail } = userInfo;
  return (dispatch: any) => {
    dispatch({
      type: SET_MANAGER_EMAIL,
      payload: {
        managerEmail,
      },
    });
  };
};
const setManagerEmailRequired = (userInfo: InitialUserInfo) => {
  const { isManagerEmailRequired } = userInfo;
  return (dispatch: any) => {
    dispatch({
      type: SET_MANAGER_EMAIL_REQUIRED,
      payload: {
        isManagerEmailRequired,
      },
    });
  };
};
const setUserAuthenticated = (isUserAuthenticated: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_USER_AUTHENTICATED,
      payload: {
        isUserAuthenticated,
      },
    });
  };
}
const setUserAuthenticationFailReason = (userAuthenticationFailReason: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_USER_AUTHENTICATION_FAIL_REASON,
      payload: {
        userAuthenticationFailReason,
      },
    });
  };
}

export default {
  setUserInitialInformation,
  setUserInitialInformationPeople,
  setPublicKey,
  setManagerEmail,
  setManagerEmailRequired,
  setUserAuthenticated,
  setUserAuthenticationFailReason
};
