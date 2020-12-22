import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import {
  IonApp,
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
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import './App.css';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Activity from "./pages/Activity/Activity";
import Menu from "./components/shared/Menu/Menu";

const App = (props: any, ref: any): any => {
  const location = useLocation();
  useEffect(()=>{
    console.log('l', location);
  },[window.location.href])
  return (
  <IonApp>
    <IonPage>    
    <IonReactRouter>
    <div className="Ion-page" id="main-content"></div>
    <Menu pageTitle="Sprint"></Menu>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true}>
        </Route>
        <Route path="/activity" component={Activity} exact={true}>
        </Route>
        <Route path="/login" component={Home}>
          <Login authProps={{ ...props }} />
        </Route>
        <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
      </IonRouterOutlet>
      {/* <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs> */}
    </IonReactRouter>
    </IonPage>
  </IonApp>
  )
    };

export default App;
