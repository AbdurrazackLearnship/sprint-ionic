import { combineReducers } from "redux";
import common from "./common";
import peopleInformation from "./peopleInformation";
import portalLogin from "./portalLogin";
import learnerJWToken from "./learnerJWToken";
import jwkPublicKey from "./jwkPublicKey";
import { DESTROY_SESSION } from "./../constants";

const appReducer = combineReducers({
  common,
  peopleInformation,
  portalLogin,
  learnerJWToken,
  jwkPublicKey,
});

const rootReducer = (state: any, action: any) => {
  // Clear all data in redux store to initial.
  if (action.type === DESTROY_SESSION) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
