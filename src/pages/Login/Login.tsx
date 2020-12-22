import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Login.css";
import TextField from "@material-ui/core/TextField/TextField";
import { Button, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Login = (props: any): any => {
  const [credFailed, setCredFailed] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [showLoginLoader, setShowLoginLoader] = useState(false);
  const [loginUsernameInput, setLoginUsernameInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const history = useHistory();
  const disableSubmitButton = (shouldDisable: boolean) => {
    setDisableSubmit(shouldDisable);
  };
  useEffect(() => {
    if (
      loginUsernameInput &&
      loginUsernameInput.length > 0 &&
      loginPasswordInput &&
      loginPasswordInput.length > 0
    ) {
      disableSubmitButton(false);
    } else {
      disableSubmitButton(true);
    }
  }, [loginUsernameInput, loginPasswordInput]);

  const handleLoginClick = () => {
    setShowLoginLoader(true);
    props.authProps.authenticateInput({
      username: loginUsernameInput || "",
      password: loginPasswordInput || "",
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true} className="ion-content-style">
        <IonCard className="card-body">
          <div className="LoginBody">
            <form className="login-form" noValidate autoComplete="off">
              <TextField
                error={credFailed}
                id="lEmail"
                label={"Username"}
                className="textFieldMargin"
                onChange={(e) => setLoginUsernameInput(e.target.value)}
                variant="outlined"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                size="medium"
                color="primary"
                inputProps={{
                  maxLength: 254,
                }}
              />
              <TextField
                error={credFailed}
                id="lPass"
                onChange={(e) => setLoginPasswordInput(e.target.value)}
                label={"Password"}
                className="textFieldMargin"
                variant="outlined"
                type="password"
                style={{ margin: 8 }}
                helperText={
                  credFailed ? (
                    <React.Fragment>{"Login Failed"}</React.Fragment>
                  ) : (
                    ""
                  )
                }
                fullWidth
                margin="normal"
                size="medium"
                color="primary"
                inputProps={{
                  maxLength: 32,
                }}
              />
            </form>

            <div className="buttonsBlock loginB text-right">
              <IonButton
                className="loaderButton"
                expand="full"
                color="primary"
                onClick={handleLoginClick}
                disabled={disableSubmit || showLoginLoader}
              >
                {showLoginLoader ? (
                  <CircularProgress
                    className="CircularProgress"
                    color="secondary"
                  ></CircularProgress>
                ) : (
                  <React.Fragment>Continue</React.Fragment>
                )}
              </IonButton>
            </div>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
