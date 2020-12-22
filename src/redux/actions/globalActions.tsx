import { DESTROY_SESSION } from "./../constants";


const logoutSession = () => {
  return (dispatch: any) => {
    dispatch({type: DESTROY_SESSION});
  };
}

export default {
  logoutSession
};
