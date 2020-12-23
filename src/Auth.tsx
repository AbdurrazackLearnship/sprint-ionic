import API from "@aws-amplify/api";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import React, { useEffect, useState, useReducer } from "react";
import awsconfig from "./awsconfig";
import { getCookieValue, removeCookie, setCookies } from "./cookieHelper";
import { useSelector, useDispatch } from "react-redux";
import commonActions from "./redux/actions/commonActions";
import jwkPublicKeyAction from "./redux/actions/jwkPublicKeyAction";
import peopleInformationActions from "./redux/actions/peopleInformationActions";
import portalLoginAction from "./redux/actions/portalLoginAction";
import App from "./App";
import { useHistory } from "react-router-dom";

const Auth = (props: any) => {
  const history = useHistory();
  const allInfo = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [authComingFromLoginPopup, setAuthComingFromLoginPopup] = useState(
    false
  );
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  let isAuthenticatingLocal = true;
  const [initAPIsLoaded, setInitAPIsLoaded] = useState(false);
  // const [stateCallBack, setStateCallBack] = useState();
  let stateCallBack: any;
  const [stateResult, setStateResult] = useState({});
  const [idtoken, setIdtoken] = useState("");

  const setAWSConfig = () => {
    API.configure(awsconfig);
    API.configure({
      API: {
        graphql_endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        graphql_headers: () => ({
          Authorization: "" + idtoken + "",
        }),
      },
    });
  };
  setAWSConfig();
  /* Cognito login Implementation */

  const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
  const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
  const jwt = require("jsonwebtoken");
  const jwkToPem = require("jwk-to-pem");

  const poolData = {
    UserPoolId: process.env.REACT_APP_AWS_USERPOOLID,
    ClientId: process.env.REACT_APP_AWS_CLIENT_ID,
  };

  const userPool = new CognitoUserPool(poolData);

  /*EO Cognito */

  interface userCred {
    username: string;
    password: string;
  }

  const jwtValidation = async (resultToken: any, jwk: any) => {
    setIsAuthenticating(true);
    isAuthenticatingLocal = true;
    let tokenFromCookie: string = idtoken || "";
    if (tokenFromCookie) {
      const resultToken: string = tokenFromCookie;
      var pem = jwkToPem(jwk);
      const response = {
        message: "User Signed In Successfully",
        lgId: "0",
        luuId: "0",
        leuId: "0",
        isAuthenticated: true,
      };
      jwt.verify(
        resultToken,
        pem,
        { algorithms: ["RS256"] },
        async (err: any, decodedToken: any) => {
          if (decodedToken) {
            //setCookies(`${process.env.REACT_APP_COOKIE_POLICY}`, 1);
            sessionStorage.setItem(
              "lgId",
              (decodedToken["custom:geId"] || "111111").replace(/\s/g, "")
            );
            sessionStorage.setItem(
              "luuId",
              decodedToken["ccgfghfcdvcognito:username"] || "1-1-1-1-1"
            );
            sessionStorage.setItem(
              "leuId",
              decodedToken["custom:edgeUid"] || "222222"
            );
            response.lgId = decodedToken["custom:geId"] || "0";
            response.luuId = decodedToken["cognito:username"] || "0";
            response.leuId = decodedToken["custom:edgeUid"] || "0";
            checkIfHalo(
              (decodedToken["custom:geId"] || "111111").replace(/\s/g, "")
            );
            setIdtoken(resultToken);
            setCookies(`uId`, response.leuId);
            if (!!!authComingFromLoginPopup) {
              triggerInitAPICache(
                response.lgId,
                response.leuId,
                response.luuId
              );
            }
            // triggerInitAPICache(response.lgId, response.leuId, response.luuId);
            // setAWSConfig();
            await dispatch(commonActions.setUserAuthenticated(true));
            setIsAuthenticating(false);
            isAuthenticatingLocal = false;
            console.log("343433434");
            // history.push('/home')
            // pushRecordedURL();
            // callback(response);
          } else {
            setIsAuthenticating(false);
            isAuthenticatingLocal = false;
            clearAuthentication();
            // callback(false, err);
            await dispatch(
              commonActions.setUserAuthenticationFailReason(
                "JWT_VALIDATION_FAILED"
              )
            );
          }
        }
      );
    } else {
      setIsAuthenticating(false);
      isAuthenticatingLocal = false;
      clearAuthentication();
      // callback(false, err);
      await dispatch(
        commonActions.setUserAuthenticationFailReason("JWT_VALIDATION_FAILED")
      );
    }
  };

  const getPosition = (
    mainString: string,
    subString: string,
    index: number
  ) => {
    return mainString.split(subString, index).join(subString).length;
  };

  const redirectWithURL = () => {
    let decodedURL = decodeURIComponent(window.location.href);
    let redURL = decodedURL.slice(
      decodedURL.indexOf("redirectUrl") + "redirectUrl".length + 1
    );
    if (redURL.match(/learnship/g)) {
      if (redURL.match(/halo/g)) {
        // window.location.href = `${window.location.protocol}//${window.location.host}${redURL.slice(getPosition(redURL, "/", 3))}`;
        const extractedEndURL: string =
          `${redURL.slice(getPosition(redURL, "/", 3))}` || "";
        history.push(extractedEndURL);
        sessionStorage.removeItem("rURL");
        sessionStorage.removeItem("rURLf");
      } else {
        window.location.href = redURL;
      }
    } else {
      window.location.href = `${window.location.protocol}//${
        window.location.host
      }${redURL.slice(getPosition(redURL, "/", 3))}`;
      sessionStorage.removeItem("rURL");
      sessionStorage.removeItem("rURLf");
    }
    window.location.href = `${window.location.protocol}//${window.location.host}/home`;
  };

  const pushRecordedURL = () => {
    window.location.href = `${window.location.protocol}//${window.location.host}/home`;
    const redirectToURL: string = sessionStorage.getItem("rURL") || "/";
    if (window.location.href !== `${window.location.origin}/`) {
      if (redirectToURL) {
        if (window.location.href.search(/redirectUrl/gi) !== -1) {
          redirectWithURL();
        } else {
          if (!!sessionStorage.getItem("rURL")) {
            const rUrl: string = sessionStorage.getItem("rURL") || "";
            // history.push(rUrl);
            sessionStorage.removeItem("rURL");
            sessionStorage.removeItem("rURLf");
          }
        }
      }
    } else {
      if (window.location.href.search(/redirectUrl/gi) === -1) {
        if (!!sessionStorage.getItem("rURL")) {
          const rUrl: string = sessionStorage.getItem("rURL") || "";
          history.push("/");
          sessionStorage.removeItem("rURL");
          sessionStorage.removeItem("rURLf");
        }
      }
    }
  };

  const validateJWT = async (resultToken: any) => {
    if (allInfo.jwkPublicKey) {
      if (allInfo.jwkPublicKey.data) {
        let jwk: any = allInfo.jwkPublicKey.data.keys[0] || "";
        jwtValidation(resultToken, jwk);
      } else {
        // clearAuthentication();
        // callback('', { "message": "FAILED" });
        // await dispatch(allActions.commonActions.setUserAuthenticationFailReason("JWK_KEY_FETCH_FAILED"));
      }
    }
  };

  const checkIfFeatureIsEnabled = (arr: string, featureBitNumber: number) => {
    return !!parseInt(arr[featureBitNumber]);
  };

  const afterGetLearnerInfo = (resp: any) => {
    if (resp) {
      sessionStorage.setItem(
        "managerEmail",
        resp.data.getpeopleInformation.managerEmail
      );
      sessionStorage.setItem(
        "isManagerEmailRequired",
        String(isManagerEmailON(resp.data.getpeopleInformation))
      );
      if (
        !checkIfFeatureIsEnabled(
          resp.data.getpeopleInformation.serviceConfiguration.features,
          15
        )
      ) {
        clearAuthentication();
        window.location.href = `${process.env["REACT_APP_LOGINURL"]}/`;
      }
    }
  };
  const isManagerEmailON = (json: any) => {
    if (json.license && json.license.length > 0) {
      for (let i = 0; i < json.license.length; i++) {
        if (
          json.license[i].organizationDetail &&
          json.license[i].organizationDetail.emailFeatureSettings &&
          json.license[i].organizationDetail.emailFeatureSettings.length > 0
        ) {
          for (
            let j = 0;
            j < json.license[i].organizationDetail.emailFeatureSettings.length;
            j++
          ) {
            if (
              json.license[i].organizationDetail.emailFeatureSettings[j]
                .emailFeatureName === "Manager"
            ) {
              if (
                !!parseInt(
                  json.license[i].organizationDetail.emailFeatureSettings[j]
                    .status
                )
              ) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  };

  const checkIfHalo = (geID: any) => {
    if (allInfo.peopleInformation && allInfo.peopleInformation.data) {
      afterGetLearnerInfo(allInfo.peopleInformation);
    }
  };

  const checkIfSSOAfter = async (result: any) => {
    if (allInfo.peopleInformation && allInfo.peopleInformation.data) {
      let resp: any = allInfo.peopleInformation;
      if (resp) {
        sessionStorage.setItem(
          "managerEmail",
          resp.data.getpeopleInformation.managerEmail
        );
        sessionStorage.setItem(
          "isManagerEmailRequired",
          String(isManagerEmailON(resp.data.getpeopleInformation))
        );
        if (resp.data.getpeopleInformation.status === "1") {
          if (
            checkIfFeatureIsEnabled(
              resp.data.getpeopleInformation.serviceConfiguration.features,
              48
            )
          ) {
            validateJWT(result.idToken.jwtToken);
          } else {
            if (
              checkIfFeatureIsEnabled(
                resp.data.getpeopleInformation.serviceConfiguration.features,
                39
              )
            ) {
              validateJWT(result.idToken.jwtToken);
            } else {
              // SSO user
              setIsAuthenticating(false);
              isAuthenticatingLocal = false;
              clearAuthentication();
              // callback('', { "message": "SSO" });
              await dispatch(
                commonActions.setUserAuthenticationFailReason("SSO")
              );
            }
          }
        } else {
          // De-activated user(Inactive user)
          setIsAuthenticating(false);
          isAuthenticatingLocal = false;
          clearAuthentication();
          // callback('', { "message": "DEACT" });
          await dispatch(
            commonActions.setUserAuthenticationFailReason("DEACTIVATED")
          );
        }
      }
    }
  };

  const checkIfSSO = async (result: any) => {
    setAWSConfig();
    if (allInfo.peopleInformation) {
      if (allInfo.peopleInformation.data) {
        let resp = allInfo.peopleInformation;
        sessionStorage.setItem("pInfo", JSON.stringify(resp));
        sessionStorage.setItem(
          "managerEmail",
          resp.data.getpeopleInformation.managerEmail
        );
        sessionStorage.setItem(
          "isManagerEmailRequired",
          String(isManagerEmailON(resp.data.getpeopleInformation))
        );
        checkIfSSOAfter(result);
      } else {
        if (!!allInfo.peopleInformation.isFailed) {
          clearAuthentication();
          setIsAuthenticating(false);
          isAuthenticatingLocal = false;
          // callback('', { "message": "FAILED" });
          await dispatch(
            commonActions.setUserAuthenticationFailReason("PEOPLEINFO_FAILED")
          );
        }
      }
    }
    // if(!!!sessionStorage.getItem('pInfo')){
    // let geID = result.idToken.payload["custom:geId"].replace(/ /g, "");
    // const data = API.graphql(graphqlOperation(GetPeopleCall(geID))) as Promise<any>;
    // data
    //   .then(async resp => {
    //     sessionStorage.setItem('pInfo',JSON.stringify(resp));
    //     sessionStorage.setItem("managerEmail",resp.data.getpeopleInformation.managerEmail);
    //     sessionStorage.setItem("isManagerEmailRequired", (String(isManagerEmailON(resp.data.getpeopleInformation))));
    //     checkIfSSOAfter(result, resp, callback);
    //   })
    //   .catch((err: any) => {
    //     RollbarErrorTracking.logErrorInRollbar(err.message, "error");
    //     clearAuthentication();
    //     callback('', { "message": "FAILED" });
    //   });
    // } else {
    //   checkIfSSOAfter(result, JSON.parse(sessionStorage.getItem("pInfo") || ""), callback);
    // }
  };

  const authenticateInput = (
    credentials: userCred,
    loginCallback: Function
  ) => {
    setIsAuthenticating(true);
    isAuthenticatingLocal = true;
    setAuthComingFromLoginPopup(true);
    let authDetails = {
      Username: credentials.username,
      Password: credentials.password,
    };
    const authenticationDetails = new AuthenticationDetails(authDetails);
    const userData = {
      Username: credentials.username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.setAuthenticationFlowType("USER_PASSWORD_AUTH");
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async function (result: any) {
        setIdtoken(result.idToken.jwtToken);
        API.configure(awsconfig);
        API.configure({
          API: {
            graphql_endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
            graphql_headers: async () => ({
              Authorization: "" + result.idToken.jwtToken + "",
            }),
          },
        });
        const lgId: string = result.idToken.payload["custom:geId"] || "0";
        const leuId: string = result.idToken.payload["custom:edgeUid"] || "0";
        const luuId: string = result.idToken.payload["cognito:username"] || "0";
        setIsAuthenticating(false);
        isAuthenticatingLocal = false;
        triggerInitAPICache(lgId, leuId, luuId);
        setStateResult(result);
        loginCallback(true);
        //window.location.href = `${window.location.protocol}//${window.location.host}/home`;
      },
      onFailure: async function (err: Error) {
        setIsAuthenticating(false);
        isAuthenticatingLocal = false;
        clearAuthentication();
        // callback('', err);
        await dispatch(
          commonActions.setUserAuthenticationFailReason("COGNITO_LOGIN_FAILED")
        );
        loginCallback(false);
      },

      // /**
      //  * @function newPasswordRequired {<Promise>}
      //  * @param {*} userAttributes
      //  */
      // newPasswordRequired: function(userAttributes: any) {
      //   delete userAttributes.email_verified;
      //   var newPassword = window.prompt('Please choose a new password..');
      //   cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
      // },
    });
  };

  const clearAuthentication = async (clearRedirectURL?: boolean) => {
    // if (!clearRedirectURL) {
    //   if (isAuthenticatingLocal) {
    //     setTimeout(() => {
    //       clearAuthentication(clearRedirectURL);
    //     }, 1500);
    //   } else {
    //     if (
    //       !!!allInfo.common.isLoading &&
    //       !!!allInfo.common.isUserAuthenticated &&
    //       !!!isAuthenticatingLocal
    //     ) {
    //       setTimeout(() => {
    //         let decodedURL = decodeURIComponent(window.location.href);
    //         let redURL = decodedURL.slice(
    //           decodedURL.indexOf("redirectUrl") + "redirectUrl".length + 1
    //         );
    //         sessionStorage.removeItem("rURL");
    //         sessionStorage.removeItem("rURLf");
    //       }, 1000);
    //     }
    //   }
    // }
    // setStateResult({});
    // if (clearRedirectURL) {
    //   sessionStorage.clear();
    // } else {
    //   let rURLf = sessionStorage.getItem("rURLf") || "";
    //   let rURL = sessionStorage.getItem("rURL") || "";
    //   sessionStorage.clear();
    //   sessionStorage.setItem("rURL", rURL);
    //   sessionStorage.setItem("rURLf", rURLf);
    // }
    // removeCookie();
  };

  const handleInitCallFailed = async () => {
    await dispatch(
      commonActions.setUserAuthenticationFailReason("INIT_PEOPLEINFO_FAILED")
    );
  };

  const triggerInitAPICache = async (
    lgId: string,
    leuId: string,
    luuId: string
  ) => {
    await dispatch(commonActions.setUserInitialInformation(lgId, luuId, leuId));
    if (!!!allInfo.peopleInformation.data) {
      await dispatch(peopleInformationActions.getStorePeopleInfo(lgId));
    }
    // if (!!!allInfo.learnerTasks.data) {
    //   await dispatch(allActions.learnerTasksAction.getLearnerTasks(leuId));
    // }
    //console.log(allInfo);
    // if (!!!allInfo.portalLogin.data) {
    //   await dispatch(portalLoginAction.getPortalLogin(leuId, lgId));
    // }
    // if (!!!allInfo.jwkPublicKey.data) {
    //   await dispatch(jwkPublicKeyAction.getJwkPublicKey());
    // }
    //await dispatch(jwkPublicKeyAction.getJwkPublicKey());
    //await dispatch(commonActions.setUserInitialInformation(lgId, luuId, leuId));
    //await dispatch(peopleInformationActions.getStorePeopleInfo(lgId));
    // await dispatch(allActions.learnerTasksAction.getLearnerTasks(leuId));
    //await dispatch(portalLoginAction.getPortalLogin(leuId, lgId));
  };

  const checkAuthOnRefresh = async () => {
    await dispatch(jwkPublicKeyAction.getJwkPublicKey());
  };

  useEffect(() => {
    if (!!!allInfo.jwkPublicKey.isLoading) {
      if (!!!allInfo.jwkPublicKey.isFailed && !!allInfo.jwkPublicKey.data) {
        validateJWT(idtoken);
      }
    }
  }, [allInfo.jwkPublicKey]);

  useEffect(() => {
    checkAuthOnRefresh();
  }, []);

  useEffect(() => {
    if (
      !!!allInfo.common.isLoading &&
      !!!allInfo.peopleInformation.isLoading &&
      !!!allInfo.portalLogin.isLoading &&
      !!!allInfo.jwkPublicKey.isLoading
    ) {
      if (
        !!!allInfo.common.isFailed &&
        !!!allInfo.peopleInformation.isFailed &&
        !!!allInfo.portalLogin.isFailed &&
        !!!allInfo.jwkPublicKey.isFailed
      ) {
        setInitAPIsLoaded(true);
        // let idTokenCookieValue: string =
        if (stateResult && Object.keys(stateResult).length > 0) {
          checkIfSSO(stateResult);
        }
      } else {
        setIsAuthenticating(false);
        isAuthenticatingLocal = false;
        clearAuthentication();
        handleInitCallFailed();
      }
    } else {
      setInitAPIsLoaded(false);
    }
  }, [
    allInfo.common,
    allInfo.peopleInformation,
    allInfo.portalLogin,
    allInfo.jwkPublicKey,
  ]);

  return (
    <App
      authenticateInput={authenticateInput}
      jwtValidation={jwtValidation}
      clearAuthentication={clearAuthentication}
      isAuthenticating={isAuthenticating}
    />
  );
};

export default Auth;
