import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react"
import {  Route } from "react-router"
import { HomeRoutes } from "../enums/routes"
import { HomePage } from "../pages/HomePage"
import { BaseHeader } from "../../shared/components/partials/BaseHeader"

import "./HomeLayout.css";

export const HomeLayout = () => {
    return (
              <IonPage>
                <BaseHeader title="ADDCRI" />
                <IonContent id="base-menu-content">
                  <IonRouterOutlet>
                    <Route path={HomeRoutes.HOME} component={HomePage} />
                  </IonRouterOutlet>
                
            </IonContent>
          
            </IonPage>
    )
}