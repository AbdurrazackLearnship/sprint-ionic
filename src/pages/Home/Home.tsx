import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./Home.css";
import { Button } from "@material-ui/core";
import { menuController } from "@ionic/core";
import { menuOutline } from "ionicons/icons";
import Menu from "../../components/shared/Menu/Menu";

const Home = (props: any): any => {
  const history = useHistory();
  const gotoHome = () => {
    history.push("/home");
  };

  return (
    <IonPage>
      {/* <div className="Ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>
      </div> */}
      <IonContent fullscreen={false}>
        <div className="main-content-container">
        <IonButton color="secondary" routerLink="/activity">Go to Activity</IonButton>
        {/* <IonList>
          <IonItem routerLink="/activity">
            <IonLabel>go to Activity Player</IonLabel>
          </IonItem>
        </IonList> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
