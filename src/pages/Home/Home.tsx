import React from 'react';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import './Home.css';
import { Button } from '@material-ui/core';

const Home: React.FC = () => {
  const history = useHistory();
  const gotoHome = () => {
    history.push("/home")
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle onClick={gotoHome}>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>        
        <IonButton routerLink="/activity">Go to Activity</IonButton>
      {/* <IonList>
          <IonItem routerLink="/activity">
            <IonLabel>go to Activity Player</IonLabel>
          </IonItem>
        </IonList> */}
      </IonContent>      
    </IonPage>
  );
};

export default Home;
