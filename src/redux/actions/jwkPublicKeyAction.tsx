import axios from "axios";
import {
  GET_JWK_PUBLIC_KEY,
  GET_JWK_PUBLIC_KEY_SUCCESS,
  GET_JWK_PUBLIC_KEY_FAILURE,
  TRIGGER_TOAST,
} from "../constants";

const getJwkPublicKey = () => {
  return async (dispatch: any) => {
    dispatch({ type: GET_JWK_PUBLIC_KEY });
    axios.get("" + process.env.REACT_APP_COGNITO_JWK_URL).then(
      (jwkResp: any) => {
        if (jwkResp && jwkResp.data) {
          dispatch({
            type: GET_JWK_PUBLIC_KEY_SUCCESS,
            payload: { ...jwkResp },
          });
        } else {
          // handleError(err);
          dispatch({ type: GET_JWK_PUBLIC_KEY_FAILURE });
          dispatch({
            type: TRIGGER_TOAST,
            payload: {
              shouldShow: true,
              severity: "error",
              transMessage: "message_errorDefault",
            },
          });
        }
      },
      (err: Error) => {
        // handleError(err);
        dispatch({ type: GET_JWK_PUBLIC_KEY_FAILURE });
        dispatch({
          type: TRIGGER_TOAST,
          payload: {
            shouldShow: true,
            severity: "error",
            transMessage: "message_errorDefault",
          },
        });
      }
    );
  };
};

export default {
  getJwkPublicKey,
};
