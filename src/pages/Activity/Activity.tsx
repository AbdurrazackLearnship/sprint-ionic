import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Activity.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Activity = (props: any): any => {
  const history = useHistory();
  const gotoHome = () => {
    history.push("/home");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle onClick={gotoHome}>Activity Player</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={false}>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome Home</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <Button>Activity</Button>
      </IonContent>
    </IonPage>
  );
};

export default Activity;
