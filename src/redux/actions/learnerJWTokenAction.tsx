import { API, graphqlOperation } from "aws-amplify";
import {
  GET_LEARNER_JWTOKEN,
  GET_LEARNER_JWTOKEN_SUCCESS,
  GET_LEARNER_JWTOKEN_FAILURE,
  TRIGGER_TOAST,
} from "../constants";
import { GetLearnerJwtoken } from "../../queries";

const getLearnerJWToken = (
  geId: string,
  edgeUid: string,
  username: string,
  uuId: string,
  iss: string
) => {
  return async (dispatch: any) => {
    dispatch({ type: GET_LEARNER_JWTOKEN });
    const jwToken = API.graphql(
      graphqlOperation(GetLearnerJwtoken, {
        geId,
        edgeUid,
        username,
        uuId,
        iss,
      })
    ) as Promise<any>;
    jwToken
      .then((learnerTokenResp: any) => {
        if (learnerTokenResp && learnerTokenResp.data) {
          dispatch({
            type: GET_LEARNER_JWTOKEN_SUCCESS,
            payload: { ...learnerTokenResp },
          });
        } else {
          dispatch({ type: GET_LEARNER_JWTOKEN_FAILURE });
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
      .catch((err: Error) => {
        // handleError(err);
        dispatch({ type: GET_LEARNER_JWTOKEN_FAILURE });
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
  getLearnerJWToken,
};
