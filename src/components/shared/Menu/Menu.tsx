import React, { useEffect } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { menuController } from "@ionic/core";
import { menuOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";

const Menu: any = (props: any) => {
  const history = useHistory();
  const onClickHandler = (): void => {
    menuController.close();
  };
  const navigateToPage = (pageName: string) => {
    history.push(`/${pageName || ""}`);
  };
  const location = useLocation();
  const logoClickHandle = () => {
    history.push("/home");
  };
  useEffect(() => {
    console.log("lo", location);
  }, [window.location.href]);
  return (
    <React.Fragment>
      {location && location.pathname !== "/login" && (
        <React.Fragment>
          <IonHeader translucent>
            <IonToolbar color="primary">
              <IonTitle>
                <IonIcon slot="start" icon={menuOutline}></IonIcon>
                <img
                  onClick={logoClickHandle}
                  className="logo-icon"
                  src="assets/Sprint-BusinessSkills-WhiteLogo.png"
                />
              </IonTitle>
              <IonButtons slot="start">
                <IonMenuButton
                  autoHide={true}
                  onClick={() => onClickHandler()}
                ></IonMenuButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonMenu
            side="start"
            content-id="main-content"
            swipe-gesture={true}
            disabled={false}
            maxEdgeStart={100}
            hidden={false}
            type="overlay"
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItem routerLink="/home" onClick={() => onClickHandler()}>
                  <IonLabel>Home</IonLabel>
                </IonItem>
                <IonItem
                  routerLink="/activity"
                  onClick={() => onClickHandler()}
                >
                  <IonLabel>Activity player</IonLabel>
                </IonItem>
                <IonItem routerLink="/login" onClick={() => onClickHandler()}>
                  <IonLabel>Logout</IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonMenu>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Menu;
