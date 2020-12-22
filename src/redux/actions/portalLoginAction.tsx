import { API, graphqlOperation } from "aws-amplify";
//import handleError from "../../errorHandler";
import {
  GET_PORTAL_LOGIN,
  GET_PORTAL_LOGIN_SUCCESS,
  GET_PORTAL_LOGIN_FAILURE,
  TRIGGER_TOAST,
} from "../constants";
import { GetPortalLoginKey } from "./../../queries";

const getPortalLogin = (edgeUserID: string, geID: string) => {
  return async (dispatch: any) => {
    dispatch({ type: GET_PORTAL_LOGIN });
    const portalHandle = API.graphql(
      graphqlOperation(GetPortalLoginKey(edgeUserID, geID))
    ) as Promise<any>;
    portalHandle
      .then(async (portalLoginData: any) => {
        if (portalLoginData && portalLoginData.data) {
          dispatch({
            type: GET_PORTAL_LOGIN_SUCCESS,
            payload: { ...portalLoginData },
          });
        } else {
          // handleError(err);
          dispatch({ type: GET_PORTAL_LOGIN_FAILURE });
          dispatch({
            type: TRIGGER_TOAST,
            payload: {
              shouldShow: true,
              severity: "error",
              transMessage: "message_errorDefault",
            },
          });
        }
      })
      .catch((err: any) => {
        // handleError(err);
        dispatch({ type: GET_PORTAL_LOGIN_FAILURE });
        dispatch({
          type: TRIGGER_TOAST,
          payload: {
            shouldShow: true,
            severity: "error",
            transMessage: "message_errorDefault",
          },
        });
      });
  };
};

export default {
  getPortalLogin,
};
