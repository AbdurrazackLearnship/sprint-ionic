import React, { useEffect } from "react";
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
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItemDivider,
} from "@ionic/react";
import { useSelector } from "react-redux";

const Home = (props: any): any => {
  const allInfo = useSelector((state: any) => state);
  const history = useHistory();
  const gotoHome = () => {
    history.push("/home");
  };
  useEffect(() => {
    if (!!!allInfo.common.isLoading && !!!allInfo.peopleInformation.isLoading) {
      if (
        !!!allInfo.peopleInformation.isFailed &&
        !!allInfo.peopleInformation.data
      ) {
        afterGetLearnerInfo(allInfo.peopleInformation);
      }
    }
  }, [allInfo.common, allInfo.peopleInformation]);

  const afterGetLearnerInfo = (resp: any) => {
    const {
      firstName,
      lastName,
      email,
      createdDate,
    } = resp.data.getpeopleInformation;
    console.log(resp);
  };

  return (
    <IonPage>
      <IonItemDivider>
        <IonLabel></IonLabel>
      </IonItemDivider>
      <IonItemDivider>
        <IonLabel></IonLabel>
      </IonItemDivider>
      <IonCardHeader>
        {allInfo.peopleInformation && allInfo.peopleInformation.data ? (
          <IonCardTitle>
            Welcome{" "}
            {allInfo.peopleInformation.data.getpeopleInformation.firstName ||
              "FNDec1103"}
          </IonCardTitle>
        ) : (
          <IonCardTitle>Welcome FNDec1103</IonCardTitle>
        )}
        <IonCardSubtitle>
          Here is your study plan. Your current level is A2.1
        </IonCardSubtitle>
      </IonCardHeader>
      <IonContent>
        <IonCard>
          <IonItem routerLink="/activity" className="ion-activated">
            <IonCardHeader>
              <IonCardTitle>Pre-Work</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Complete the digital preparation work before your trainer session.
            </IonCardContent>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
