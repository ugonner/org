import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react"
import { BaseHeader } from "../../shared/components/partials/BaseHeader"
import { Route } from "react-router"
import { FocalAreaRoutes } from "../enums/routes"
import { AllFocalAreasPage } from "../pages/AllFocalAreas"

export const FocalAreaLayout = () => {
    return (
        <IonPage>
            <BaseHeader title="Thematic Area" />
            <IonContent>
                <IonRouterOutlet>
                    <Route path={FocalAreaRoutes.ALL} component={AllFocalAreasPage} />
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
    )
}