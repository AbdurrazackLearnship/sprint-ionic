import { API, graphqlOperation } from "aws-amplify";
import {
  GET_PEOPLE_INFO,
  GET_PEOPLE_INFO_FAILURE,
  GET_PEOPLE_INFO_SUCCESS,
  TRIGGER_TOAST,
} from "../constants";
import { GetPeopleCall } from "./../../queries";

const getStorePeopleInfo = (gId: string | number) => {
  return async (dispatch: any) => {
    dispatch({ type: GET_PEOPLE_INFO });
    const data = API.graphql(graphqlOperation(GetPeopleCall(gId))) as Promise<
      any
    >;
    await data
      .then((peopleData: any) => {
        if (peopleData && peopleData.data) {
          dispatch({
            type: GET_PEOPLE_INFO_SUCCESS,
            payload: { ...peopleData },
          });
        } else {
          // handleError(err);
          dispatch({ type: GET_PEOPLE_INFO_FAILURE });
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
        dispatch({ type: GET_PEOPLE_INFO_FAILURE });
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
  getStorePeopleInfo,
};
