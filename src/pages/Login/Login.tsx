import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
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
  const [uNAME, setUNAME] = useState("");
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

  const loginCallback = (resultBoolean: boolean) => {
    setShowLoginLoader(false);
    resultBoolean ? history.push('/home') : history.push('/login')
  }

  const handleLoginClick = () => {
    setShowLoginLoader(true);    
    let abc = props.authProps.authenticateInput({
      username: loginUsernameInput || "",
      password: loginPasswordInput || "",
    },loginCallback);
    console.log(abc);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><img className="logo-icon" src='assets/Logo-Animation-Alpha.gif' /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true} className="ion-content-style">
        <IonCard className="card-body">          
          <div className="LoginBody">
            <form className="login-form" noValidate autoComplete="off">
            <IonItem>
              <IonLabel position="floating">Username/Email</IonLabel>
              <IonInput 
              color="secondary"
              onIonChange={(e: any) => setLoginUsernameInput(e.detail.value)}
              id="lEmail"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput 
              type="password"
              color="secondary"
              onIonChange={(e: any) => setLoginPasswordInput(e.detail.value)}
              id="lEmail"
              ></IonInput>
            </IonItem>
              {/* <TextField
                error={credFailed}
                id="lEmail1"
                label={"Username"}
                className="textFieldMargin"
                onChange={(e) => setLoginUsernameInput(e.target.value)}
                variant="outlined"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                size="medium"
                color="secondary"
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
                color="secondary"
                inputProps={{
                  maxLength: 32,
                }}
              /> */}
            </form>

            <div className="buttonsBlock loginB text-right">
              <IonButton
                className="loaderButton"
                expand="block"
                color="secondary"
                onClick={handleLoginClick}
                disabled={disableSubmit || showLoginLoader}
              >
                {showLoginLoader ? (
                  <CircularProgress
                    className="CircularProgress"
                    color="secondary"
                  ></CircularProgress>
                ) : (
                  <React.Fragment>Login</React.Fragment>
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
